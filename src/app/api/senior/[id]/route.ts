/**
 * @todo Migrate the other routes
 */
import { withSession, withSessionAndRole } from "@server/decorator";
import { NextResponse } from "next/server";
import {
  seniorDeleteResponse,
  seniorPatchResponse,
  patchSeniorSchema,
  seniorSchema,
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
  async ({ session, params }) => {
    const nextParams: { id: string } = params.params;
    const { id: seniorId } = nextParams;

    const maybeSenior = prisma.senior.findFirst({ where: { id: seniorId } });
    if (maybeSenior == null) {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "NOT_FOUND",
          message: "Senior not found",
        }),
        { status: 404 }
      );
    }

    const maybeUser = prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (maybeUser == null) {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "NOT_FOUND",
          message: "User not found",
        }),
        { status: 404 }
      );
    }
    if (maybeUser.Chapter != maybeSenior.chapter) {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "UNAUTHORIZED",
          message: "User is not of same chapter of senior",
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
  }
);

export const PATCH = withSessionAndRole(
  ["CHAPTER_LEADER"],
  async ({ req, session, params }) => {
    try {
      const body = await req.json();
      const nextParams: { seniorid: string } = params;
      const { seniorid: seniorId } = nextParams;

      const maybeBody = patchSeniorSchema.safeParse(body);
      if (!maybeBody.success) {
        return NextResponse.json(
          seniorPatchResponse.parse({ code: "INVALID_EDIT" }),
          { status: 400 }
        );
      } else {
        const seniorBody = maybeBody.data;

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
        const maybeUser = await prisma.user.findFirst({
          where: {
            id: session.user.id,
          },
        });

        if (!maybeUser) {
          return NextResponse.json(
            seniorDeleteResponse.parse({
              code: "NOT_FOUND",
              message: "User not found",
            }),
            { status: 404 }
          );
        }

        if (maybeUser?.ChapterID != seniorBody.ChapterID) {
          return NextResponse.json(
            seniorDeleteResponse.parse({
              code: "ERROR",
              message: "User is not of same chapter of senior",
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
      }
    } catch (e: any) {
      console.log("Error", e);
      return NextResponse.json(
        seniorPatchResponse.parse({
          code: "UNKNOWN",
          message: "Network error",
        }),
        { status: 500 }
      );
    }
  }
);
