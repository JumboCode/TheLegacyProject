import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        /*
         * If the user performing the request is a student, it returns their 
         * seniors; otherwise, if the user is an admin, it returns all existing 
         * seniors.
         */

        if (/*current id is student -- we don't know how to get curr id*/) {
          const senior = await prisma.senior.findMany({
            select: {
              id: true,
              name: true,
              photo: true,
            },
          });
        } else { // current id is admin, return all seniors
          const senior = await prisma.senior.findMany();
        }

        res.status(200).json(senior);
      } catch (error) {
        res.status(500).json({
          /*not sure what to put here*/
          error: `failed to fetch seniors`,
        });
      }
      break;

    case "POST":
      try {
        const senior = await prisma.senior.create({
          /* we don't know how to pass variables into the create function */
          data = { ...req.body } /*we think we should use req.body somewhere?*/
        });
        res.status(200).json(senior);
      } catch (error) {
        res.status(500).json({
          error: `failed to create senior`,
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
