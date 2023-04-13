import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { z } from "zod";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

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

          const senior = await prisma.senior.create({
            data: {
              name: body.name,
              location: body.location,
              description: body.description,
              StudentIDs: body.students,
              folder: `THIS NEEDS TO BE FIXED ONCE A FOLDER IS CRREATED YUP`,
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
