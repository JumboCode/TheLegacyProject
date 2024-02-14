import { withSessionAndRole } from "@server/decorator";
import { NextResponse } from "next/server";
import { seniorPostResponse, postSeniorSchema } from "./route.schema";
import { prisma } from "@server/db/client";
import { randomUUID } from "crypto";
import { google } from "googleapis";
import { env } from "process";

// @TODO - Use google drive service to create folder
export const POST = withSessionAndRole(
  ["CHAPTER_LEADER"],
  async ({ req, session }) => {
    const body = await req.json();
    const newSenior = postSeniorSchema.safeParse(body);

    if (!newSenior.success) {
      return NextResponse.json(
        seniorPostResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid senior template",
        }),
        { status: 400 }
      );
    } else {
      const user = await prisma.user.findFirst({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        return NextResponse.json(
          seniorPostResponse.parse({
            code: "INVALID_REQUEST",
            message: "User not found",
          }),
          { status: 400 }
        );
      }
      const newSeniorData = newSenior.data;

      if (session.user.ChapterID != newSeniorData.ChapterID) {
        return NextResponse.json(
          seniorPostResponse.parse({
            code: "UNAUTHORIZED",
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
          userId: session.user.id,
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
          ChapterID: body.ChapterID,
          StudentIDs: body.StudentIDs,
          folder: googleFolderId,
        },
      });

      body.StudentIDs.map(async (studentID: string) => {
        await prisma.user.update({
          where: { id: studentID },
          data: {
            SeniorIDs: {
              push: senior.id,
            },
          },
        });
      });
      

      return NextResponse.json(
        seniorPostResponse.parse({
          code: "SUCCESS",
          data: senior,
        })
      );
    }
  }
);
