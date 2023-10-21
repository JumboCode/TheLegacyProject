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
    if (error.firstName) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_FIRST_NAME",
          message: "Invalid first name provided",
        }),
        { status: 400 }
      );
    }
    if (error.lastName) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_LAST_NAME",
          message: "Invalid last name provided",
        }),
        { status: 400 }
      );
    }
    if (error.universityEmail) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_EMAIL",
          message: "Invalid email provided",
        }),
        { status: 400 }
      );
    }
    if (error.phoneNumber) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_PHONE_NUMBER",
          message: "Invalid phone number provided",
        }),
        { status: 400 }
      );
    }
    if (error.university) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_UNIVERSITY",
          message: "Invalid university name provided",
        }),
        { status: 400 }
      );
    }
    if (error.universityAddress) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_UNIVERSITY_ADDRESS",
          message: "Invalid university address provided",
        }),
        { status: 400 }
      );
    }
    if (error.leadershipExperience) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_LEADERSHIP_EXPERIENCE",
          message: "Invalid leadership experience provided",
        }),
        { status: 400 }
      );
    }
    if (error.motivation) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_MOTIVATION",
          message: "Invalid motivation provided",
        }),
        { status: 400 }
      );
    }
    if (error.availabilities) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_AVAILABILITY",
          message: "Invalid availability provided",
        }),
        { status: 400 }
      );
    }
    if (error.questions) {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "INVALID_QUESTION",
          message: "Invalid question provided",
        }),
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        ChapterRequestResponse.parse({
          code: "UNKNOWN",
          message: "Invalid request, unknown error",
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
