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
            StudentIDs: z.array(z.string()),
          });

          const body = bodySchema.parse(JSON.parse(req.body));
          const baseFolder = "1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a"; // TODO: make env variable
          const fileMetadata = {
            name: [`${body.name}-${randomUUID()}`],
            mimeType: "application/vnd.google-apps.folder",
            parents: [baseFolder],
          };
          const fileCreateData = {
            resource: fileMetadata,
            fields: "id",
          };

          const service = await drive(req, res);
          const file = await (
            service as NonNullable<typeof service>
          ).files.create(fileCreateData);
          const googleFolderId = (file as any).data.id;

          console.log("Before creating senior...");
          const senior = await prisma.senior.create({
            data: {
              name: body.name,
              location: body.location,
              description: body.description,
              StudentIDs: body.StudentIDs,
              folder: googleFolderId,
            },
          });

          const prismaStudentsToAdd = await prisma.user.findMany({
            where: { id: { in: body.StudentIDs } },
          });

          for (const student of prismaStudentsToAdd) {
            await prisma.user.update({
              where: {
                id: student.id,
              },
              data: {
                SeniorIDs: [...student.SeniorIDs, senior.id],
              },
            });
          }

          res.status(200).json(senior);
        } else {
          res.status(500).json({
            error:
              "This route is protected. In order to access it, please sign in as admin.",
          });
          return;
        }
      } catch (error) {
        console.log("Error", error);
        res.status(500).json({
          error: `Failed to create senior: ${error}`,
        });
      }
      break;

    default:
      res.status(500).json({
        error: `Method ${req.method} not implemented`,
      });
      break;
  }
};

export default add;
