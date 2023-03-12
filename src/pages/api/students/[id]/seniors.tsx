import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import { Session } from "inspector";
import type { NextApiRequest, NextApiResponse } from "next";

const student = async (req: NextApiRequest, res: NextApiResponse) => {
    const {student_id} = JSON.parse(req.body); 
    if (req.method == 'GET') {
        try {
            const student = await prisma.user.findUnique({
                where: {
                    id: student_id
                },
                select: {
                    Seniors : true
                }
            })
        } catch {
            res.status(500).json({
                error: `Accessing seniors failed.`,
              });   
        }
    }
}

export default student;