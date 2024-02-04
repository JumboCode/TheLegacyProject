/**
 * @todo Migrate the other routes
 */
import { withSession, withSessionAndRole } from "@server/decorator";
import { NextResponse } from "next/server";
import {
  seniorDeleteResponse,
  seniorPatchResponse,
  patchSeniorSchema,
  seniorPostResponse,
  seniorSchema,
  postSeniorSchema,
} from "./route.schema";
import { prisma } from "@server/db/client";
import { request } from "http";
import { randomUUID } from "crypto";
import { drive } from "googleapis/build/src/apis/drive";
import { google } from "googleapis";
import { env } from "process";

/**
 * @todo Enforces that this API request be made with a Chapter leader from the university
 * @todo Should senior/[id] be nested under /university/[uid]? This design decision is unclear... which is why we want
 * to wrap call into a client facing function.
 */
export const DELETE = withSessionAndRole(
  ["CHAPTER_LEADER"],
  async (request) => {
    const nextParams: { id: string } = request.params;
    const { id: seniorId } = nextParams;

    try {
      const maybeSenior = prisma.senior.findUnique({ where: { id: seniorId } });
      if (maybeSenior == null) {
        return NextResponse.json(
          seniorDeleteResponse.parse({
            code: "NOT_FOUND",
            message: "Senior not found",
          }),
          { status: 404 }
        );
      }

      const disconnectSenior = await prisma.senior.update({
        where: {
          id: seniorId,
        },
        data: {
          Students: {
            set: [],
          },
        },
      });
      const deleteSenior = await prisma.senior.delete({
        where: {
          id: seniorId,
        },
      });

      return NextResponse.json({ code: "SUCCESS" });
    } catch {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "UNKNOWN",
          message: "Network error",
        }),
        { status: 500 }
      );
    }
  }
);

export const PATCH = withSessionAndRole(["CHAPTER_LEADER"], async (request) => {
  const body = await request.req.json();
  const nextParams: { id: string } = request.params;
  const { id: seniorId } = nextParams;

  const maybeBody = patchSeniorSchema.safeParse(body);
  if (!maybeBody.success) {
    return NextResponse.json(
      seniorPatchResponse.parse({ code: "INVALID_EDIT" }),
      { status: 400 }
    );
  }

  const seniorBody = maybeBody.data;
  try {
    const maybeSenior = await prisma.senior.findUnique({
      where: { id: seniorId },
      select: { StudentIDs: true },
    });
    if (maybeSenior == null) {
      return NextResponse.json(
        seniorPatchResponse.parse({
          code: "NOT_FOUND",
          message: "Senior not found",
        }),
        { status: 404 }
      );
    }

    const senior = await prisma.senior.update({
      where: {
        id: seniorId,
      },
      data: {
        ...seniorBody,
      },
    });

    // Remove if senior.studentIds is not contained in body.studentIds
    const studentsToRemove = maybeSenior.StudentIDs.filter(
      (id) => !seniorBody.StudentIDs.includes(id)
    );
    const studentsToAdd = seniorBody.StudentIDs;

    const prismaStudentsToRemove = await prisma.user.findMany({
      where: { id: { in: studentsToRemove } },
    });
    const prismaStudentsToAdd = await prisma.user.findMany({
      where: { id: { in: studentsToAdd } },
    });

    for (const student of prismaStudentsToRemove) {
      await prisma.user.update({
        where: {
          id: student.id,
        },
        data: {
          SeniorIDs: student.SeniorIDs.filter((id) => id !== seniorId),
        },
      });
    }

    for (const student of prismaStudentsToAdd) {
      //Checks if student has already been added
      if (!student.SeniorIDs.includes(seniorId)) {
        await prisma.user.update({
          where: {
            id: student.id,
          },
          data: {
            SeniorIDs: [...student.SeniorIDs, seniorId],
          },
        });
      }
    }

    return NextResponse.json(
      seniorPatchResponse.parse({
        code: "SUCCESS",
        data: senior,
      })
    );
  } catch (e: any) {
    console.log("Error", e);
    return NextResponse.json(
      seniorPatchResponse.parse({ code: "UNKNOWN", message: "Network error" }),
      { status: 500 }
    );
  }
});

export const POST = withSessionAndRole(["CHAPTER_LEADER"], async (request) => {
  try {
    const body = await request.req.json();
    const nextParams: { id: string } = request.params;
    const { id: userId } = nextParams;
    const newSenior = postSeniorSchema.safeParse(body);

    if (!newSenior.success) {
      return NextResponse.json(
        seniorPostResponse.parse({
          code: "UNKNOWN",
          message: "Invalid senior template",
        }),
        { status: 500 }
      );
    } else {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return NextResponse.json(
          seniorPatchResponse.parse({
            code: "UNKNOWN",
            message: "User was not found",
          })
        );
      }
      const newSeniorData = newSenior.data;

      if (user?.ChapterID != newSeniorData.ChapterID) {
        return NextResponse.json(
          seniorPatchResponse.parse({
            code: "ERROR",
            message: "User has no authority to add",
          })
        );
      }

      const baseFolder = "1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a"; // TODO: make env variable
      const fileMetadata = {
        name: [`${body.name}-${randomUUID()}`],
        mimeType: "application/vnd.google-apps.folder",
        parents: [baseFolder],
      };
      const fileCreateData = {
        resource: fileMetadata,
        fields: "id",
      };

      const { access_token, refresh_token } = (await prisma.account.findFirst({
        where: {
          userId: request.session.user.id,
        },
      })) ?? { access_token: null };
      const auth = new google.auth.OAuth2({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      });
      auth.setCredentials({
        access_token,
        refresh_token,
      });
      const service = google.drive({
        version: "v3",
        auth,
      });

      const file = await (service as NonNullable<typeof service>).files.create(
        fileCreateData
      );
      const googleFolderId = (file as any).data.id;

      const senior = await prisma.senior.create({
        data: {
          name: body.name,
          location: body.location,
          description: body.description,
          StudentIDs: body.StudentIDs,
          ChapterID: body.ChapterID,
          folder: googleFolderId,
        },
      });

      if (!senior) {
        return NextResponse.json(
          seniorPatchResponse.parse({
            code: "UNKNOWN",
            message: "Adding senior failed",
          })
        );
      }

      return NextResponse.json(
        seniorPatchResponse.parse({
          code: "SUCCESS",
          data: senior,
        })
      );
    }
  } catch {
    return NextResponse.json(
      seniorPostResponse.parse({ code: "UNKNOWN", message: "Network error" }),
      { status: 500 }
    );
  }
});
