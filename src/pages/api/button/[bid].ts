import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../server/db/client";

const numeric = z.string().regex(/^\d+$/).transform(Number);

const button = async (req: NextApiRequest, res: NextApiResponse) => {
  const { bid } = req.query;

  if (bid === undefined || Array.isArray(bid)) {
    res.status(500).json({
      error: `${bid} is not a string: ${req.query}`,
    });
    return;
  }

  numeric
    .parseAsync(bid)
    .then(async (id) => {
      switch (req.method) {
        case "GET":
          prisma.button
            .findUniqueOrThrow({ where: { id } })
            .then((button) => {
              res.status(200).json(button);
            })
            .catch(() => {
              prisma.button
                .create({
                  data: {
                    id,
                    timesClicked: 0,
                  },
                })
                .then(({ timesClicked }) => {
                  res.status(200).json({ timesClicked });
                })
                .catch((e) => {
                  res.status(500).json({ error: e });
                });
            });
          break;

        case "PUT":
          prisma.button
            .upsert({
              where: {
                id,
              },
              create: {
                id,
                timesClicked: 0,
              },
              update: {
                timesClicked: {
                  increment: 1,
                },
              },
            })
            .then(({ timesClicked }) => {
              res.status(200).json({ timesClicked });
            })
            .catch((e) => {
              res
                .status(500)
                .json({
                  error: `failed to increment button with id ${id}: ${e}`,
                });
            });
          break;

        default:
          res.status(500).json({
            error: `method ${req.method} not implemented`,
          });
          break;
      }
    })
    .catch((e) => {
      res.status(500).json({ error: `invalid id with error: ${e}` });
    });
};

export default button;
