import PathNav from "@components/PathNav";
import { UserTile } from "@components/TileGrid";
import { prisma } from "@server/db/client";
import { CardGrid } from "@components/container";

interface Params {
  params: {
    uid: string;
    userId: string;
    chapterId: string;
  };
}

const UserPage = async ({ params }: Params) => {
  const { userId, chapterId, uid } = params;

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId, ChapterID: chapterId },
    include: {
      Seniors: true,
      Chapter: true,
    },
  });

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <PathNav
        pathInfo={[
          { display: "Chapters", url: "chapters" },
          { display: user.Chapter?.chapterName ?? "", url: chapterId },
          { display: user.name ?? "", url: userId },
        ]}
      />
      {/* TODO(nickbar01234) - Add pronouns */}
      <CardGrid
        title={
          <div className="font-merriweather text-2xl font-bold text-[#002]">
            {user.name ?? ""}
          </div>
        }
        tiles={user.Seniors.map((senior) => (
          <UserTile
            key={senior.id}
            senior={senior}
            link={`/private/${uid}/admin/home/chapters/${chapterId}/users/${user.id}/seniors/${senior.id}`}
          />
        ))}
      />
    </div>
  );
};

export default UserPage;
