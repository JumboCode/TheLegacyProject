import { NextRequest, NextResponse } from "next/server";
import {
  HandleChapterRequest,
  HandleChapterRequestResponse,
} from "./route.schema";
import { prisma } from "@server/db/client";

export const POST = async (request: NextRequest) => {
  // Validate the data in the request
  // If the data is invalid, return a 400 response
  // with a JSON body containing the validation errors

  // Validate a proper JSON was passed in as well
  try {
    const handleChapterRequest = HandleChapterRequest.safeParse(
      await request.json()
    );
    if (!handleChapterRequest.success) {
      return NextResponse.json(
        HandleChapterRequestResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid API request",
        }),
        { status: 400 }
      );
    } else {
      const body = handleChapterRequest.data;
      // Check if the chapter request even exists
      const chapterRequest = await prisma.chapterRequest.findFirst({
        where: {
          id: String(body.chapterRequestId),
        },
      });

      if (!chapterRequest) {
        return NextResponse.json(
          HandleChapterRequestResponse.parse({
            code: "CHAPTER_REQUEST_NOT_FOUND",
            message:
              "A chapter request associated with the given ID does not exist",
          }),
          { status: 400 }
        );
      }

      // Regardless of approved/denied, delete the chapter request
      await prisma.chapterRequest.delete({
        where: {
          id: body.chapterRequestId,
        },
      });
      // If approved, create a new chapter
      if (body.approved == true) {
        await prisma.chapter.create({
          data: {
            chapterName: chapterRequest.university,
            location: chapterRequest.universityAddress,
          },
        });
        return NextResponse.json(
          HandleChapterRequestResponse.parse({
            code: "SUCCESS_ACCEPTED",
            message: "Chapter request successfully accepted",
          }),
          { status: 200 }
        );
      }
      // If denied do nothing
      return NextResponse.json(
        HandleChapterRequestResponse.parse({
          code: "SUCCESS_DECLINED",
          message: "Chapter request successfully declined",
        }),
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      HandleChapterRequestResponse.parse({
        code: "UNKNOWN",
        message: "Unknown error received",
      }),
      { status: 500 }
    );
  }
};
