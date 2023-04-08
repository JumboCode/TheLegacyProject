import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

const students = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const { id: seniorId } = req.query;
  if (typeof seniorId !== "string") {
    res.status(500).json({
      error: `seniorId must be a string`,
    });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: session.user?.id,
          },
          select: {
            admin: true, //return admin boolean field for given user id
          },
        })) ?? { admin: false };

        if (admin) {
          const result = await prisma.senior.findUnique({
            where: {
              id: seniorId,
            },
            include: {
              Students: true,
            },
          });

          if (!result) {
            res.status(404).json({
              error: `senior with id ${seniorId} not found`,
            });
            return;
          }

          res.status(200).json({ result });
        } else {
          res.status(500).json({
            error:
              "This route is protected. In order to access it, please sign in as admin.",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch students: ${error}`,
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

export default students;
