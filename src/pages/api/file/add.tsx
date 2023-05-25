import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { z } from "zod";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { File } from "@prisma/client";

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  switch (req.method) {
    case "POST":
      try {
        const bodySchema = z.object({
          name: z.string(),
          description: z.string(),
          fileType: z.string(),
          lastModified: z.string().transform(() => new Date()),
          url: z.string(),
          seniorId: z.string(),
          tags: z.array(z.string()),
        });

        const body = bodySchema.parse(JSON.parse(req.body));

        const file: File = await prisma.file.create({
          data: {
            name: body.name,
            description: body.description,
            filetype: body.fileType,
            lastModified: body.lastModified,
            url: body.url,
            seniorId: body.seniorId,
            Tags: body.tags,
          },
        });

        res.status(200).json(file);
      } catch (error) {
        res.status(500).json({
          error: `failed to create a file: ${error}`,
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
