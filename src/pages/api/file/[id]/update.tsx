import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

const files = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const { id: fileId } = req.query;
  if (typeof fileId !== "string") {
    res.status(500).json({
      error: `fileId must be a string`,
    });
    return;
  }

  switch (req.method) {
    case "POST":
      try {
        const file = await prisma.file.update({
          where: {
            id: fileId,
          },
          data: {
            lastModified: new Date(),
          },
        });

        if (!file) {
          res.status(404).json({
            error: `cannot find file ${fileId}`,
          });
          return;
        }

        res.status(200).json(file);
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch student: ${error}`,
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

export default files;
