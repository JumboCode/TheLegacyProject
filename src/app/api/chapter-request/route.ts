import { NextRequest, NextResponse } from "next/server";
import { ChapterRequest, ChapterRequestResponse } from "./route.schema";

export const POST = async (request: NextRequest) => {
  return NextResponse.json(
    ChapterRequestResponse.parse({
      code: "SUCCESS",
      message: "Chapter request successfully submitted",
    }),
    { status: 205 }
  );
};
