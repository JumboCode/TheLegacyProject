import { NextResponse } from "next/server";
import { JoinChapterRequest, JoinChapterRequestResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator/index";

export const POST = withSession(async ({ req, session }) => {
  try {
    const joinChapterReq = JoinChapterRequest.safeParse(await req.json());
    if (!joinChapterReq.success) {
      return NextResponse.json(
        JoinChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid request body",
        }),
        { status: 400 }
      );
    } else {
      const body = joinChapterReq.data;
      const userRequest = await prisma.userRequest.findFirst({
        where: { uid: session.user.id },
      });

      if (userRequest != null) {
        return NextResponse.json(
          JoinChapterRequestResponse.parse({
            code: "INVALID_REQUEST",
            message: "Request to join chapter is in review",
          }),
          { status: 400 }
        );
      }

      const chapter = await prisma.chapter.findFirst({
        where: { id: body.chapterId },
      });

      if (chapter == null) {
        return NextResponse.json(
          JoinChapterRequestResponse.parse({
            code: "INVALID_REQUEST",
            message: "Chapter doesn't exist",
          }),
          { status: 400 }
        );
      } else if (session.user.ChapterID != null) {
        return NextResponse.json(
          JoinChapterRequestResponse.parse({
            code: "INVALID_REQUEST",
            message: "User is already a member of a chapter",
          }),
          { status: 400 }
        );
      }

      await prisma.userRequest.create({
        data: {
          uid: session.user.id,
          chapterId: body.chapterId,
        },
      });
      return NextResponse.json(
        JoinChapterRequestResponse.parse({ code: "SUCCESS" })
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      JoinChapterRequestResponse.parse({ code: "UNKNOWN" }),
      { status: 500 }
    );
  }
});
