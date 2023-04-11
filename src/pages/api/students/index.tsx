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
  if (req.method == "GET") {
    if (current_user?.admin) {
      //returns list of students
      try {
        const student : string[] = await prisma.user.findMany({
          select: {
            name: true
          }
        });
      } catch {
        res.status(500).json({
          error: `Failed to access student database`,
        });
      }
    }
  }
};

export default student;
