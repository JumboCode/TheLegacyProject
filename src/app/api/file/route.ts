import { NextResponse } from "next/server";
import { File, FileResponse } from "./route.schema";
import { google } from "googleapis";
import { prisma } from "@server/db/client";
import { withSession } from "../../../server/decorator";
import { env } from "../../../env/server.mjs";

// todo: add functions to reduce repeated code
export const POST = withSession(async (request) => {
  try {
    const { access_token, refresh_token } = (await prisma.account.findFirst({
      where: {
        userId: request.session.user.id,
      },
    })) ?? { access_token: null };

    const auth = new google.auth.OAuth2({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
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
    body.date.setHours(0, 0, 0, 0);

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

      /* Check that user has this senior assigned to them */
      const { SeniorIDs } = await prisma.user.findFirst({
        where: {
          id: request.session.user.id,
        },
      });

      if (
        !SeniorIDs.some((seniorId: string) => seniorId === fileData.seniorId)
      ) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NOT_AUTHORIZED",
            message: "Senior not assigned to user",
          }),
          { status: 404 }
        );
      }

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

      /* NOTE: File will still be created on Drive even if it fails on MongoDB */
      const file = await (service as NonNullable<typeof service>).files.create(
        fileCreateData
      );

      const googleFileId = file.data.id; // used to have (file as any) - do we need this?

      // If the data is valid, save it to the database via prisma client
      await prisma?.file.create({
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

export const PATCH = withSession(async (request) => {
  try {
    const { access_token, refresh_token } = (await prisma.account.findFirst({
      where: {
        userId: request.session.user.id,
      },
    })) ?? { access_token: null };

    console.log("AUTH");

    const auth = new google.auth.OAuth2({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    });

    console.log("SET CREDENTIALS");

    auth.setCredentials({
      access_token,
      refresh_token,
    });

    console.log("SERVICE");

    const service = google.drive({
      version: "v3",
      auth,
    });

    console.log("BODY");

    const body = await request.req.json();
    body.date = new Date(body.date);
    body.date.setHours(0, 0, 0, 0);

    console.log("FILE REQUEST");

    const fileRequest = File.safeParse(body);

    console.log("SUCCESS");

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
      console.log("FILE DATA");

      const fileData = fileRequest.data;

      console.log("SENIOR IDS");

      /* Check that user has this senior assigned to them */
      const { SeniorIDs } = await prisma.user.findFirst({
        where: {
          id: request.session.user.id,
        },
      });

      if (
        !SeniorIDs.some((seniorId: string) => seniorId === fileData.seniorId)
      ) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NOT_AUTHORIZED",
            message: "Senior not assigned to user",
          }),
          { status: 404 }
        );
      }

      console.log("FOUND SENIOR");

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

      console.log("FORMATTED DATE");

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

      const pattern =
        /https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/;
      const matches = pattern.exec(fileData.url);

      if (matches && matches[1]) {
        console.log("GOOGLE FILE ID");

        const googleFileId = matches[1];

        console.log("BODY");

        const body = { name: formatted_date };

        console.log("FILE UPDATE DATA");

        const fileUpdateData = {
          fileId: googleFileId,
          resource: body,
        };

        console.log("UPDATE IN DRIVE");

        await (service as NonNullable<typeof service>).files.update(
          fileUpdateData
        );

        console.log("RIGHT BEFORE GETTING ID");

        // TODO: FIX ID ISSUE - url is different in mongo vs google drive ?

        const { id } = await prisma.file.findFirst({
          where: {
            url: fileData.url,
          },
        });

        console.log("UPDATE IN PRISMA");

        await prisma.file.update({
          where: { id: id },
          data: { date: fileData.date, Tags: fileData.Tags },
        });

        return NextResponse.json(
          FileResponse.parse({
            code: "SUCCESS_UPDATE",
            message: "File successfully updated",
          }),
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          FileResponse.parse({
            code: "UNKNOWN",
            message: "Unknown error received",
          }),
          { status: 500 }
        );
      }
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

export const DELETE = withSession(async (request) => {
  try {
    const { access_token, refresh_token } = (await prisma.account.findFirst({
      where: {
        userId: request.session.user.id,
      },
    })) ?? { access_token: null };

    const auth = new google.auth.OAuth2({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
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

      /* Check that user has this senior assigned to them */
      const { SeniorIDs } = await prisma.user.findFirst({
        where: {
          id: request.session.user.id,
        },
      });

      if (
        !SeniorIDs.some((seniorId: string) => seniorId === fileData.seniorId)
      ) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NOT_AUTHORIZED",
            message: "Senior not assigned to user",
          }),
          { status: 404 }
        );
      }

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

      const pattern =
        /https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/;
      const matches = pattern.exec(fileData.url);

      if (matches && matches[1]) {
        const googleFileId = matches[1];

        await (service as NonNullable<typeof service>).files.delete({
          fileId: googleFileId,
        });

        const { id } = await prisma.file.findFirst({
          where: {
            url: fileData.url,
          },
        });

        await prisma.file.delete({
          where: { id: id },
        });

        return NextResponse.json(
          FileResponse.parse({
            code: "SUCCESS_DELETE",
            message: "File successfully deleted",
          }),
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          FileResponse.parse({
            code: "INVALID_URL",
            message: "Invalid file ID parsed from url",
          }),
          { status: 500 }
        );
      }
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
