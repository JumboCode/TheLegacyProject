import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const { id: seniorId } = req.query; //TODO: verify that these fields are well-formed using zod
  if (typeof seniorId !== "string") {
    res.status(500).json({
      error: `seniorId must be a string`,
    });
    return;
  }

  switch (req.method) {
    case "GET":
      try {
        /*
         * Retrieve information about a Senior
         */
        const senior = await prisma.senior.findUnique({
          where: {
            id: seniorId, //get all information for given senior
          },
        });

        if (!senior) {
          res.status(404).json({
            error: `senior with id ${seniorId} not found`,
          });
          return;
        }

        res.status(200).json(senior);
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch senior: ${error}`,
        });
      }
      break;

    case "PATCH":
      try {
        /*
         * Allow change of location of Senior if admin
         */
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: session.user?.id,
          },
          select: {
            admin: true, //return admin boolean field for given user id
          },
        })) ?? { admin: false };

        const { seniorLocation } = JSON.parse(req.body); //TODO: verify that these fields are well-formed using zod

        if (admin) {
          const senior = await prisma.senior.update({
            where: {
              id: seniorId,
            },
            data: {
              location: seniorLocation,
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
          error: `failed to update location of senior: ${error}`,
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

export default senior;
