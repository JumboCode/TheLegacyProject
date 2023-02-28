import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const { senior_id, senior_location } = JSON.parse(req.body); //TODO: verify that these fields are well-formed using zod
  switch (req.method) {
    case "GET":
      try {
        /*
        * Retrieve information about a Senior
        */
        const senior = await prisma.senior.findUnique({
          where : {
            id: senior_id //get all information for given senior
          },
        });
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
        const admin = await prisma.user.findUnique({ //is there a problem here if session is false?
          where : {
            id: session?.user?.id
          },
          select: {
            admin: true //return admin boolean field for given user id
          },
        })
        if (admin) { //for admin users
          const senior = await prisma.senior.update({
            where: {
              id: senior_id
            },
            data: {
              location: senior_location
            },
          });
          res.status(200).json(senior);
        } else {
          res.send({
            error:
              "You must be signed in as admin to view the protected content on this page.",
          });
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