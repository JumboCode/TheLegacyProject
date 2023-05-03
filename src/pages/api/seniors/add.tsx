import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { z } from "zod";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import drive from "../drive/drive";
import { randomUUID } from "crypto";

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const userId = session.user.id;

  switch (req.method) {
    case "POST":
      try {
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            admin: true,
          },
        })) ?? { admin: false };

        if (admin) {
          const bodySchema = z.object({
            name: z.string(),
            location: z.string(),
            description: z.string(),
            students: z.array(z.string()),
          });
          const body = bodySchema.parse(JSON.parse(req.body));

          const baseFolder = "1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a"; // TODO: make env variable

          const fileMetadata = {
            name: [`${body.name}-${randomUUID()}`],
            mimeType: "application/vnd.google-apps.folder",
            parents: [baseFolder],
          };

          const service = await drive(req, res);
          const file = await (
            service as NonNullable<typeof service>
          ).files.create({
            resource: fileMetadata,
            fields: "id",
          });
          const googleFolderId = (file as any).data.id;

          const senior = await prisma.senior.create({
            data: {
              name: body.name,
              location: body.location,
              description: body.description,
              StudentIDs: body.students,
              folder: googleFolderId,
            },
          });

          res.status(200).json(senior);
        } else {
          res.status(500).json({
            error:
              "This route is protected. In order to access it, please sign in as admin.",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to create senior: ${error}`,
        });
      }
      break;

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
};

export default add;
