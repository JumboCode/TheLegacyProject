import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import { Session } from "inspector";
import type { NextApiRequest, NextApiResponse } from "next";

const student = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const current_user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  if (current_user?.admin) {
    if (req.method == "POST") {
      try {
        const body = JSON.parse(req.body);
        if (body) {
          const student = await prisma.user.create({
            data: {
              id: body.id,
              name: body.name,
              email: body.email,
              emailVerified: body.emailVerified,
              image: body.image,
              admin: body.admin,
              Account: body.Account,
              Session: body.Session,
              SeniorIDs: body.SeniorIDS,
              Seniors: body.Seniors,
            },
          });
        } else {
          res.status(500).json({
            error: `Student creation request not well defined`,
          });
        }
      } catch {
        res.status(500).json({
          error: `Failed to create student`,
        });
      }
    }
  }
};

export default student;
