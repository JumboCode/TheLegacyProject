import { NextResponse } from "next/server";
import { File, FileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";
import { google } from "googleapis";

export const POST = withSession(async (request) => {
  try {
    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    const service = google.drive({
      version: "v3",
      auth,
    });

    const fileData = File.parse(request.req);

    // get senior from database
    const foundSenior = await prisma.senior.findUnique({
      where: { id: fileData.seniorId },
    });
    if (foundSenior == null) {
      return NextResponse.json(
        FileResponse.parse({
          code: "NOT_FOUND",
          message: "Senior not found",
        }),
        { status: 404 }
      );
    }

    const parentID = foundSenior.folder.split("/").pop();

    // TODO: date conversion to readable format for title
    const fileMetadata = {
      name: [fileData.date.toString()],
      mimeType: "application/vnd.google-apps.document",
      parents: [parentID],
    };

    const fileCreateData = {
      resource: fileMetadata,
      fields: "id",
    };

    const file = await service?.files.create(fileCreateData);

    const googleFileId = file.data.id; // used to have (file as any) - do we need this?

    // If the data is valid, save it to the database via prisma client
    const fileEntry = await prisma?.file.create({
      data: {
        date: fileData.date,
        filetype: fileData.filetype,
        url: `https://docs.google.com/document/d/${googleFileId}`,
        seniorId: fileData.seniorId,
        Tags: fileData.Tags,
      },
    });

    console.log(fileEntry);

    return NextResponse.json(
      FileResponse.parse({
        code: "SUCCESS",
        message: "File successfully created",
      }),
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      FileResponse.parse({
        code: "UNKNOWN",
        message: "Unknown error received",
      }),
      { status: 500 }
    );
  }
});
