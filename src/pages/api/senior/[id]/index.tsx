import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
      session,
    });
    return;
  }

  const seniorId = z.string().parse(req.query.id);

  const userId = session.user.id;

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
          include: {
            Files: true,
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
            id: userId,
          },
          select: {
            admin: true, //return admin boolean field for given user id
          },
        })) ?? { admin: false };

        const SeniorUpdate = z.object({
          name: z.string().optional(),
          location: z.string().optional(),
          description: z.string().optional(),
        });

        const { name, location, description } = SeniorUpdate.parse(req.body);

        if (admin) {
          const senior = await prisma.senior.update({
            where: {
              id: seniorId,
            },
            data: {
              name,
              location,
              description,
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

    case "DELETE":
      try {
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            admin: true, //return admin boolean field for given user id
          },
        })) ?? { admin: false };

        if (admin) {
          const deleteSenior = await prisma.senior.delete({
            where: {
              id: seniorId,
            },
          });
          res.status(200).json(deleteSenior);
          return;
        } else {
          res.status(500).json({
            error:
              "This route is protected. In order to access it, please sign in as admin.",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to delete senior: ${error}`,
        });
      }
    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
};

export default senior;
