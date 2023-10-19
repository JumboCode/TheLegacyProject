/**
 * @todo Migrate the other routes
 */
import { withSession } from "@server/decorator";
import { NextResponse } from "next/server";
import { seniorDeleteResponse } from "./route.schema";
import { prisma } from "@server/db/client";

/**
 * @todo Enforces that this API request be made with a Chapter leader from the university
 * @todo Should senior/[id] be nested under /university/[uid]? This design decision is unclear... which is why we want
 * to wrap call into a client facing function.
 */
export const DELETE = withSession(async ({ params }) => {
  const nextParams: { id: string } = params.params;
  const { id: seniorId } = nextParams;

  try {
    const maybeSenior = prisma.senior.findUnique({ where: { id: seniorId } });
    if (maybeSenior == null) {
      return NextResponse.json(
        seniorDeleteResponse.parse({
          code: "NOT_FOUND",
          message: "Senior not found",
        }),
        { status: 404 }
      );
    }

    const disconnectSenior = await prisma.senior.update({
      where: {
        id: seniorId,
      },
      data: {
        Students: {
          set: [],
        },
      },
    });
    const deleteSenior = await prisma.senior.delete({
      where: {
        id: seniorId,
      },
    });

    return NextResponse.json({ code: "SUCCESS" });
  } catch {
    return NextResponse.json(
      seniorDeleteResponse.parse({ code: "UNKNOWN", message: "Network error" }),
      { status: 500 }
    );
  }
});

// import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@server/db/client";
// import { getServerAuthSession } from "@server/common/get-server-auth-session";
// import { z } from "zod";

// const senior = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getServerAuthSession({ req, res });

//   if (!session || !session.user) {
//     res.status(401).json({
//       error: "This route is protected. In order to access it, please sign in.",
//       session,
//     });
//     return;
//   }

//   const seniorId = z.string().parse(req.query.id);
//   const userId = session.user.id;

//   switch (req.method) {
//     case "GET":
//       try {
//         /*
//          * Retrieve information about a Senior
//          */
//         const senior = await prisma.senior.findUnique({
//           where: {
//             id: seniorId, //get all information for given senior
//           },
//           include: {
//             Files: true,
//           },
//         });

//         if (!senior) {
//           res.status(404).json({
//             error: `senior with id ${seniorId} not found`,
//           });
//           return;
//         }

//         res.status(200).json(senior);
//       } catch (error) {
//         res.status(500).json({
//           error: `Failed to fetch senior: ${error}`,
//         });
//       }
//       break;

//     case "PATCH":
//       try {
//         /*
//          * Allow change of senior information if admin
//          */
//         const { admin } = (await prisma.user.findUnique({
//           where: {
//             id: userId,
//           },
//           select: {
//             admin: true, //return admin boolean field for given user id
//           },
//         })) ?? { admin: false };

//         const seniorSchema = z.object({
//           name: z.string().optional(),
//           location: z.string().optional(),
//           description: z.string().optional(),
//           StudentIDs: z.array(z.string()),
//         });

//         const body = seniorSchema.parse(JSON.parse(req.body));

//         if (admin) {
//           const senior = await prisma.senior.update({
//             where: {
//               id: seniorId,
//             },
//             data: {
//               ...body,
//             },
//           });

//           res.status(200).json(senior);
//         } else {
//           res.status(500).json({
//             error:
//               "This route is protected. In order to access it, please sign in as admin.",
//           });
//           return;
//         }
//       } catch (error) {
//         res.status(500).json({
//           error: `Failed to update location of senior: ${error}`,
//         });
//       }
//       break;

//     case "DELETE":
//       try {
//         const { admin } = (await prisma.user.findUnique({
//           where: {
//             id: userId,
//           },
//           select: {
//             admin: true, //return admin boolean field for given user id
//           },
//         })) ?? { admin: false };

//         if (admin) {
//           const disconnectSenior = await prisma.senior.update({
//             where: {
//               id: seniorId,
//             },
//             data: {
//               Students: {
//                 set: [],
//               },
//             },
//           });
//           const deleteSenior = await prisma.senior.delete({
//             where: {
//               id: seniorId,
//             },
//           });
//           res.status(200).json(deleteSenior);
//           // TODO: delete Google Drive resources for this Senior
//           return;
//         } else {
//           res.status(500).json({
//             error:
//               "This route is protected. In order to access it, please sign in as admin.",
//           });
//           return;
//         }
//       } catch (error) {
//         res.status(500).json({
//           error: `failed to delete senior: ${error}`,
//         });
//       }
//     default:
//       res.status(500).json({
//         error: `method ${req.method} not implemented`,
//       });
//       break;
//   }
// };

// export default senior;
