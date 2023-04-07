import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

const students = async (req: NextApiRequest, res: NextApiResponse) => {
  const { senior_id } = JSON.parse(req.body); //Needs zod?
  if (req.method === "GET") {
    // Process a GET request
    try {
      const result = await prisma.user.findUnique({
        where: {
          id: senior_id,
        },
        select: {
          Students: true, //return list of all students associated w/ senior
        },
      });

      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        error: `failed to fetch students: ${error}`,
      });
    }
  }
};
