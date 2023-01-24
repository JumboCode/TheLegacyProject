import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method = "POST") {

        try {
            const senior = await prisma.senior.create({
            /* we don't know how to pass variables into the create function */
            const data = JSON.parse(req.body);
            
            });
            res.status(200).json(senior);
        } catch (error) {
            res.status(500).json({
            error: `failed to create senior`,
            });
        }
        break;
    } else {
        res.status(500).json({
          error: `method ${req.method} not implemented`,
        });
    }
  };