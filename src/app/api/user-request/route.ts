import { NextResponse } from "next/server";
import {
  JoinChapterRequest,
  ApproveChapterRequest,
  JoinChapterRequestResponse,
  UndoChapterRequestResponse,
  ApproveChapterRequestResponse,
} from "./route.schema";
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

export const DELETE = withSession(async ({ session }) => {
  try {
    const joinChapterRequest = await prisma.userRequest.findFirst({
      where: {
        uid: session.user.id,
      },
    });

    if (joinChapterRequest == null) {
      return NextResponse.json(
        UndoChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "User doesn't have any active request",
        }),
        { status: 400 }
      );
    }

    await prisma.userRequest.delete({
      where: {
        uid: session.user.id,
      },
    });

    return NextResponse.json(
      UndoChapterRequestResponse.parse({ code: "SUCCESS" })
    );
  } catch (e: any) {
    return NextResponse.json(
      UndoChapterRequestResponse.parse({ code: "UNKNOWN" }),
      { status: 500 }
    );
  }
});

export const PATCH = withSession(async ({ req, session }) => {
  try {
    const approveChapterReq = ApproveChapterRequest.safeParse(await req.json());
    if (!approveChapterReq.success) {
      return NextResponse.json(
        ApproveChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid request body",
        }),
        { status: 400 }
      );
    }

    const targetUID = approveChapterReq.data.userId;
    const target = await prisma.user.findFirst({
      where: {
        id: targetUID,
      },
    });
    if (target == null) {
      return NextResponse.json(
        ApproveChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "User doesn't exist",
        }),
        { status: 400 }
      );
    }

    const approveChapterRequest = await prisma.userRequest.findFirst({
      where: {
        uid: targetUID,
      },
    });
    if (approveChapterRequest == null) {
      return NextResponse.json(
        ApproveChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "User doesn't have any active request",
        }),
        { status: 400 }
      );
    }

    const canApprove =
      (session.user.role === "ADMIN" && target.role !== "ADMIN") ||
      (session.user.role === "CHAPTER_LEADER" &&
        session.user.ChapterID === approveChapterRequest.chapterId);

    if (!canApprove) {
      return NextResponse.json(
        ApproveChapterRequestResponse.parse({
          code: "UNAUTHORIZED_REQUEST",
          message: "User doesn't have permission to approve request",
        }),
        { status: 400 }
      );
    }

    await prisma.userRequest.update({
      where: {
        uid: targetUID,
      },
      data: {
        approved: "APPROVED",
      },
    });

    await prisma.user.update({
      where: {
        id: targetUID,
      },
      data: {
        ChapterID: approveChapterRequest.chapterId,
      },
    });

    return NextResponse.json(
      ApproveChapterRequestResponse.parse({ code: "SUCCESS" })
    );
  } catch (e: any) {
    return NextResponse.json(
      ApproveChapterRequestResponse.parse({ code: "UNKNOWN" }),
      { status: 500 }
    );
  }
});
