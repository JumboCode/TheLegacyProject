import DisplayChapterInfo from "@components/DisplayChapterInfo";
import { prisma } from "@server/db/client";

interface UserHomePageParams {
  params: {
    uid: string;
  };
}

const UserHomePage = async ({ params }: UserHomePageParams) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: params.uid,
    },
  });

  if (user.ChapterID == null) {
    return null;
  }

  const chapter = await prisma.chapter.findFirstOrThrow({
    where: {
      id: user.ChapterID ?? "",
    },
    include: {
      students: {
        where: {
          OR: [
            {
              position: {
                not: "",
              },
            },
            {
              role: "CHAPTER_LEADER",
            },
          ],
        },
      },
    },
  });
  const resources = await prisma.resource.findMany({
    where: {
      access: {
        isEmpty: true,
      },
    },
  });

  return <DisplayChapterInfo chapter={chapter} resources={resources} />;
};

export default UserHomePage;
