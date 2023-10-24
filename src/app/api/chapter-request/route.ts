import { NextRequest, NextResponse } from "next/server";
import { ChapterRequest, ChapterRequestResponse } from "./route.schema";
import { prisma } from "@server/db/client";

export const POST = async (request: NextRequest) => {
  // Validate the data in the request
  // If the data is invalid, return a 400 response
  // with a JSON body containing the validation errors
  const chapterRequest = ChapterRequest.safeParse(await request.json());
  if (!chapterRequest.success) {
    const error = chapterRequest.error.format();
    if (
      error.firstName ||
      error.lastName ||
      error.universityEmail ||
      error.phoneNumber ||
      error.university ||
      error.universityAddress ||
      error.leadershipExperience ||
      error.motivation ||
      error.availabilities ||
      error.questions
    ) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_FORM",
          message: "Invalid form submission",
        }),
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "UNKNOWN",
          data: "Forgot to handle an error",
        }),
        { status: 500 }
      );
    }
  } else {
    const body = chapterRequest.data;
    // Check if the email already exists
    // console.log(prisma.chapterRequest);
    const hasSameEmail = await prisma.chapterRequest.findFirst({
      where: {
        universityEmail: body.universityEmail,
      },
    });

    if (hasSameEmail) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "DUPLICATE_EMAIL",
          message:
            "A chapter request associated with this email already exists",
        }),
        { status: 400 }
      );
    }

    // If the data is valid, save it to the database via prisma client
    const prismaResponse = await prisma.chapterRequest.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        universityEmail: body.universityEmail,
        phoneNumber: body.phoneNumber,
        university: body.university,
        universityAddress: body.universityAddress,
        leadershipExperience: body.leadershipExperience,
        motivation: body.motivation,
        availabilities: body.availabilities,
        questions: body.questions,
      },
    });
    return NextResponse.json(
      ChapterRequestResponse.parse({
        code: "SUCCESS",
        message: "Chapter request successfully submitted",
        data: prismaResponse,
      }),
      { status: 200 }
    );
  }
};
