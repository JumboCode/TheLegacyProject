import { withRole, withSession } from "@server/decorator";
import { NextResponse } from "next/server";
import { prisma } from "@server/db/client";
import { EditSeniorRequest, EditSeniorResponse } from "./route.schema";

/**
 * Update a non-admin user's list of seniorIDs.
 */
export const PATCH = withSession(
  withRole(["CHAPTER_LEADER"], async ({ req, params }) => {
    const { uid } = params.params;
    const maybeBody = EditSeniorRequest.safeParse(await req.json());
    const maybeUser = await prisma.user.findUnique({ where: { id: uid } });

    if (!maybeBody.success || maybeUser == null) {
      return NextResponse.json(
        EditSeniorResponse.parse({
          code: "INVALID_REQUEST",
          message: "Invalid request",
        }),
        { status: 400 }
      );
    }

    // await prisma.user.update({
    //   where: {
    //     id: uid,
    //   },
    //   data: {
    //     SeniorIDs: maybeBody.data.SeniorIDs,
    //   },
    // });

    const seniorIDsToRemove = maybeUser.SeniorIDs.filter(
      (id) => !maybeBody.data.SeniorIDs.includes(id)
    );
    const seniorIDsToAdd = maybeBody.data.SeniorIDs;

    // const seniorsToRemove = await prisma.senior.findMany({
    //   where: { id: { in: seniorIDsToRemove } },
    // });
    // const seniorsToAdd = await prisma.senior.findMany({
    //   where: { id: { in: seniorIDsToAdd } },
    // });

    await prisma.user.update({
      where: { id: uid },
      data: {
        Seniors: {
          connect: seniorIDsToAdd.map((id) => ({ id })),
          disconnect: seniorIDsToRemove.map((id) => ({ id })),
        },
      },
    });

    // for (const senior of prismaSeniorsToRemove) {
    //   await prisma.senior.update({
    //     where: {
    //       id: senior.id,
    //     },
    //     data: {
    //       StudentIDs: senior.StudentIDs.filter((id) => id !== uid),
    //     },
    //   });
    // }

    // for (const senior of prismaSeniorsToAdd) {
    //   //Checks if student has already been added
    //   if (!senior.StudentIDs.includes(uid)) {
    //     await prisma.senior.update({
    //       where: {
    //         id: senior.id,
    //       },
    //       data: {
    //         StudentIDs: [...senior.StudentIDs, uid],
    //       },
    //     });
    //   }
    // }

    return NextResponse.json(
      EditSeniorResponse.parse({
        code: "SUCCESS",
        message: "Updated user role",
      })
    );
  })
);
