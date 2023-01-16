import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

const button = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        /*
         * upsert is used to "update or insert" an entry in the database:
         * first, it checks if a value exists which fits it's where data, and
         * if it doesn't it creates it using its create data; then, it updates
         * that value using its update data. Here, since the update data is
         * empty, it only attempts to find or create.
         */
        const button = await prisma.button.upsert({
          where: {
            id: 0,
          },
          create: {
            id: 0,
            timesClicked: 0,
          },
          update: {},
        });
        res.status(200).json(button);
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch button with id 0: ${error}`,
        });
      }
      break;

    case "POST":
      try {
        /*
         * Here, upsert is used to update the button's timesClicked value or
         * create it if it doesn't exist.
         */
        const button = await prisma.button.upsert({
          where: {
            id: 0,
          },
          create: {
            id: 0,
            timesClicked: 0,
          },
          update: {
            timesClicked: {
              increment: 1,
            },
          },
        });
        res.status(200).json(button);
      } catch (error) {
        res.status(500).json({
          error: `failed to increment button with id 0: ${error}`,
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

export default button;
