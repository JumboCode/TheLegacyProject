import { NextRequest, NextResponse } from "next/server";
import {
  batchCreateRequestSchema,
  batchCreateResponseSchema,
} from "./route.schema";
import { prisma } from "@server/db/client";
import { invalidFormReponse, unknownErrorResponse } from "../route.schema";
// import { withRole, withSession } from "@server/decorator";
import { withSessionAndRole } from "@server/decorator";

// export const POST = withSession(
//   withRole(["ADMIN"], async (request) => {
//     try {
//       const resourceRequest = batchCreateRequestSchema.safeParse(
//         await request.req.json()
//       );
//       if (!resourceRequest.success) {
//         return NextResponse.json(invalidFormReponse, { status: 400 });
//       } else {
//         const body = resourceRequest.data;
//         await prisma.resource.createMany({
//           data: body,
//         });

//         return NextResponse.json(
//           batchCreateResponseSchema.parse({ code: "SUCCESS" })
//         );
//       }
//     } catch {
//       return NextResponse.json(unknownErrorResponse, { status: 500 });
//     }
//   })
// );

export const POST = withSessionAndRole(["ADMIN"], async (request) => {
  try {
    const resourceRequest = batchCreateRequestSchema.safeParse(
      await request.req.json()
    );
    if (!resourceRequest.success) {
      return NextResponse.json(invalidFormReponse, { status: 400 });
    } else {
      const body = resourceRequest.data;
      await prisma.resource.createMany({
        data: body,
      });

      return NextResponse.json(
        batchCreateResponseSchema.parse({ code: "SUCCESS" })
      );
    }
  } catch {
    return NextResponse.json(unknownErrorResponse, { status: 500 });
  }
});
