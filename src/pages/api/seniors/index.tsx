// api/seniors
// GET request

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method = "GET") {
    try {
      /*
       * If the user performing the request is a student, it returns their 
       * seniors; otherwise, if the user is an admin, it returns all existing 
       * seniors.
       */

      if (!session.user.admin) {
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
        error: `failed to fetch seniors`,
      });
    }
  } else {
    res.status(500).json({
      error: `method ${req.method} not implemented`,
    });
  }
};

export default senior;
