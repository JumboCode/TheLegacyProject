import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const students = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const userId = session.user.id;

  const { admin } = (await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      admin: true,
    },
  })) ?? { admin: false };

  if (!admin) {
    res.status(500).json({
      error:
        "This route is protected. In order to access it, please sign in as admin.",
    });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        const students = await prisma.user.findMany();

        res.status(200).json(students);
      } catch (error) {
        res.status(500).json({
          error: `failed to find students: ${error}`,
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
