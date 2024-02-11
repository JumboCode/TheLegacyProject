import { NextResponse } from "next/server";
import { File, FileResponse } from "./route.schema";
import { prisma } from "@server/db/client";
import { withSession } from "@server/decorator";
import { createDriveService } from "@server/service";

export const POST = withSession(async (request) => {
  try {
    const service = await createDriveService(request.session.user.id);

    const body = await request.req.json();
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

      // Check that user has this senior assigned to them
      const user = await prisma.user.findFirst({
        where: {
          id: request.session.user.id,
        },
      });

      if (user === null || user.SeniorIDs === null) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NO_USER",
            message: "User does not exist",
          })
        );
      }

      if (
        !user.SeniorIDs.some(
          (seniorId: string) => seniorId === fileData.seniorId
        )
      ) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NOT_AUTHORIZED",
            message: "Senior not assigned to user",
          }),
          { status: 404 }
        );
      }

      // Get senior from database
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

      const parentID = foundSenior.folder;

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

      // NOTE: File will still be created on Drive even if it fails on MongoDB
      const file = await (service as NonNullable<typeof service>).files.create(
        fileCreateData
      );

      const googleFileId = file.data.id;

      // If the data is valid, save it to the database via prisma client
      await prisma.file.create({
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
    const service = await createDriveService(request.session.user.id);

    const body = await request.req.json();
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

      // Check that user has this senior assigned to them
      const user = await prisma.user.findFirst({
        where: {
          id: request.session.user.id,
        },
      });

      if (user === null || user.SeniorIDs === null) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NO_USER",
            message: "User does not exist",
          })
        );
      }

      if (
        !user.SeniorIDs.some(
          (seniorId: string) => seniorId === fileData.seniorId
        )
      ) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NO_SENIOR",
            message: "Senior does not exist",
          }),
          { status: 404 }
        );
      }

      // Get senior from database
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

      // Used for extracting out the fileId from the url
      const pattern =
        /https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/;
      const matches = pattern.exec(fileData.url);

      if (matches && matches[1]) {
        const googleFileId = matches[1];

        const body = { name: formatted_date };

        const fileUpdateData = {
          fileId: googleFileId,
          resource: body,
        };

        await (service as NonNullable<typeof service>).files.update(
          fileUpdateData
        );

        const file = await prisma.file.findFirst({
          where: {
            url: fileData.url,
          },
        });

        if (file == null) {
          return NextResponse.json(
            FileResponse.parse({
              code: "NO_FILE",
              message: "File does not exist",
            }),
            { status: 404 }
          );
        }

        await prisma.file.update({
          where: { id: file.id },
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
    const service = await createDriveService(request.session.user.id);

    const body = await request.req.json();
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

      // Check that user has this senior assigned to them
      const user = await prisma.user.findFirst({
        where: {
          id: request.session.user.id,
        },
      });

      if (user === null || user.SeniorIDs === null) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NO_USER",
            message: "User does not exist",
          })
        );
      }

      if (
        !user.SeniorIDs.some(
          (seniorId: string) => seniorId === fileData.seniorId
        )
      ) {
        return NextResponse.json(
          FileResponse.parse({
            code: "NOT_AUTHORIZED",
            message: "Senior not assigned to user",
          }),
          { status: 404 }
        );
      }

      // Get senior from database
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

        const file = await prisma.file.findFirst({
          where: {
            url: fileData.url,
          },
        });

        if (file == null) {
          return NextResponse.json(
            FileResponse.parse({
              code: "NO_FILE",
              message: "File does not exist",
            }),
            { status: 404 }
          );
        }

        await prisma.file.delete({
          where: { id: file.id },
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
