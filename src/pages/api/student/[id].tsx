import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { prisma } from "@server/db/client";
import { Session } from "inspector";
import type { NextApiRequest, NextApiResponse } from "next";

const student = async (req: NextApiRequest, res: NextApiResponse) => {
    const {student_id} = JSON.parse(req.body); 
    const session = await getServerAuthSession({req, res});
    const current_user = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        }
    })
    if (current_user?.admin) {
        if (req.method == 'GET') {
            try {
                const student = await prisma.user.findUnique({
                    where: {
                        id: student_id
                    }
                })
            } catch {
                res.status(500).json({
                    error: `Student ID not found`,
                  });     
            }
        } else if (req.method == 'PATCH') {
            try {
                const body = JSON.parse(req.body);
                if (body) {
                    const student = await prisma.user.update({ 
                        where: {
                            id: student_id
                        },
                        data: { 
                            name: body.name || undefined,
                            email: body.email || undefined,
                            emailVerified: body.emailVerified || undefined,
                            image: body.image || undefined,
                            admin: body.admin || undefined,
                            Account: body.Account || undefined,
                            Session: body.Session || undefined,
                            SeniorIDs: body.SeniorIDS || undefined,
                            Seniors: body.Seniors || undefined,
                        } 
                    })
                        }
            } catch {
                res.status(500).json({
                    error: `Student ID not successfully updated`,
                  });   
            }
        }
    } else {
        res.status(500).json({
            error: `Must be signed in as an admin to access student information.`,
          });
    }
}

export default student;