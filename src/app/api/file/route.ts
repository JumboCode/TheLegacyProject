import { NextResponse } from "next/server";
import { File, FileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";
import { google } from "googleapis";

export const POST = withSession(async (request) => {
  console.log("IN POST");

  try {
    console.log("STARTING TRY");
    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    console.log("SERVICE");
    const service = google.drive({
      version: "v3",
      auth,
    });

    console.log("FILEDATA");
    // console.log(request);
    // console.log(request.req);
    // console.log(request.req.body);
    // const fileData = File.parse(request.req);

    const fileRequest = File.safeParse(await request.req.json());
    console.log("RIGHT AFTER PROCESSING FILE DATA");

    console.log("!fileRequest.success --> ", !fileRequest.success);
    if (!fileRequest.success) {
      console.log("Not successful file data");
      console.log(fileRequest.error);
      return NextResponse.json(
        FileResponse.parse({
          code: "NOT_FOUND",
          message: "Unsuccessful request creation",
        }),
        { status: 400 }
      );
    } else {
      console.log("success");
      const fileData = fileRequest.data;
      console.log(fileRequest);
      console.log(fileRequest.data);
      // const fileData = File.parse(JSON.parse());

      console.log("SENIOR");
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

      console.log("PARENTID");
      const parentID = foundSenior.folder.split("/").pop();

      console.log("FILEMETADATA");
      // TODO: date conversion to readable format for title
      // const fileMetadata = {
      //   name: [fileData.date.toString()],
      //   mimeType: "application/vnd.google-apps.document",
      //   parents: [parentID],
      // };

      const fileMetadata = {
        name: [fileData.date],
        mimeType: "application/vnd.google-apps.document",
        parents: [parentID],
      };

      console.log("FILE CREATE DATA");
      const fileCreateData = {
        resource: fileMetadata,
        fields: "id",
      };

      console.log("FILE");
      // console.log(service);
      // console.log(service == null);
      console.log(fileCreateData);

      const file = await (service as NonNullable<typeof service>).files.create(
        fileCreateData
      );
      console.log(file);

      console.log("GOOGLE FIELD ID");
      const googleFileId = file.data.id; // used to have (file as any) - do we need this?

      console.log("FILE ENTRY");
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
      console.log("SENDING SUCCESS");
      return NextResponse.json(
        FileResponse.parse({
          code: "SUCCESS",
          message: "File successfully created",
        }),
        { status: 200 }
      );
    }
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
