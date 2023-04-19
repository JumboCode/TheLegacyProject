import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

const seniors = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const userId = session.user.id;

  switch (req.method) {
    case "GET":
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
          const seniors = await prisma.senior.findMany();

          res.status(200).json(seniors);
        } else {
          const seniors = await prisma.senior.findMany({
            where: {
              StudentIDs: {
                has: userId,
              },
            },
          });

          res.status(200).json(seniors);
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to find seniors: ${error}`,
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

export default seniors;
