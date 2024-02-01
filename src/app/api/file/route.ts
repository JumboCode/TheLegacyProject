import { NextResponse } from "next/server";
import { File, FileResponse } from "./route.schema";
import { google } from "googleapis";
import { prisma } from "@server/db/client";
import { withSession } from "../../../server/decorator";

export const POST = withSession(async (request) => {
  try {
    const { access_token, refresh_token } = (await prisma.account.findFirst({
      where: {
        userId: request.session.user.id,
      },
    })) ?? { access_token: null };

    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    auth.setCredentials({
      access_token,
      refresh_token,
    });

    const service = google.drive({
      version: "v3",
      auth,
    });

    const body = await request.req.json();
    body.date = new Date(body.date);

    const fileRequest = File.safeParse(body);

    if (!fileRequest.success) {
      console.log(fileRequest.error);
      return NextResponse.json(
        FileResponse.parse({
          code: "NOT_FOUND",
          message: "Unsuccessful request creation",
        }),
        { status: 400 }
      );
    } else {
      const fileData = fileRequest.data;

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
      const formatted_date =
        (fileData.date.getMonth() > 8
          ? fileData.date.getMonth() + 1
          : "0" + (fileData.date.getMonth() + 1)) +
        "/" +
        (fileData.date.getDate() > 9
          ? fileData.date.getDate()
          : "0" + fileData.date.getDate()) +
        "/" +
        fileData.date.getFullYear();

      const fileMetadata = {
        name: [formatted_date],
        mimeType: "application/vnd.google-apps.document",
        parents: [parentID],
      };

      const fileCreateData = {
        resource: fileMetadata,
        fields: "id",
      };

      const file = await (service as NonNullable<typeof service>).files.create(
        fileCreateData
      );

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

      return NextResponse.json(
        FileResponse.parse({
          code: "SUCCESS",
          message: "File successfully added",
        }),
        { status: 200 }
      );
    }
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json(
      FileResponse.parse({
        code: "UNKNOWN",
        message: "Unknown error received",
      }),
      { status: 500 }
    );
  }
});
