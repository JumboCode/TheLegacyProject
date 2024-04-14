import { NextResponse } from "next/server";
import { withSessionAndRole } from "@server/decorator";
import { prisma } from "@server/db/client";
import { driveV3 } from "@server/service";

export const DELETE = withSessionAndRole(["ADMIN"], async ({ params }) => {
  // TODO
  // 1. Implement route.client.ts
  // 2. Implement route.schema.ts
  // 3. Finish deleting chapter
  // 4. Add it to AdminHomePage

  const chapterId = params.params.chapterId;
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  if (chapter == null) {
    // If no ID is found, chapter has been deleted by another admin.
    return NextResponse.json("ok");
  }

  await Promise.allSettled(
    chapter.permissions.map((permissionId) =>
      driveV3.permissions.delete({
        fileId: chapter.chapterFolder,
        permissionId: permissionId,
      })
    )
  );

  return NextResponse.json("ok");
});
