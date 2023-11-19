import { UserTile } from "@components/TileGrid";
import { prisma } from "@server/db/client";
import { useParams } from "next/navigation";
import PathNav, { PathInfoType } from "@components/PathNav";
// import ChapterPage from "@components/ChapterPage";

interface ChapterPageParams {
  params: {
    chapterId: string;
  };
}
// Since ChapterPage is a server component, it has direct access to the dynamic route segment
const ChapterPage = async ({ params }: ChapterPageParams) => {
  // Fetch information according to a chapter
  // If no such chapter exist, throw an error
  const chapter = await prisma.chapter.findUniqueOrThrow({
    where: { id: params.chapterId },
    include: {
      students: true,
    },
  });
  const curr_date = new Date();
  const curr_year = curr_date.getFullYear();

  const chapterPath: PathInfoType = {
    display: "Chapters",
    url: "chapters",
  };

  const currchapterPath: PathInfoType = {
    display: chapter.chapterName,
    url: params.chapterId,
  };

  // TODO(nickbar0123) - Use the information to display breadcrumb + profiles
  return (
    <>
      <div className="h-fit">
        <PathNav pathInfo={[chapterPath, currchapterPath]} />
        <div className="font-merriweather mt-5 text-2xl font-bold">
          {chapter.chapterName}
        </div>
        <div className="font-merriweather mt-3 flex h-1/5 w-5/6 flex-col justify-between rounded-md bg-white p-8">
          <div className="flex flex-row text-start">
            <div>Location: </div>
            <div className="ml-2 font-bold">{chapter?.location}</div>
          </div>
          <div className="flex flex-row text-start">
            <div>No. of members: </div>
            <div className="ml-2 font-bold">{chapter.students.length}</div>
          </div>
          <div className="flex flex-row text-start">
            <div>Years Active: </div>
            <div className="ml-2 font-bold">
              {curr_year - chapter?.dateCreated.getFullYear()}
            </div>
          </div>
        </div>
        <div className="font-merriweather mt-5 text-xl font-bold">
          Executive Board
        </div>
        <div className="flex gap-x-8 pt-6">
          {chapter.students
            .filter((user) => user.role == "CHAPTER_LEADER")
            .map((user) => (
              <UserTile key={user.id} student={user} link="" />
            ))}
        </div>
        <div className="font-merriweather mt-5 text-xl font-bold">
          Pending (
          {chapter.students.filter((user) => user.approved == "PENDING").length}
          )
        </div>
        <div className="flex gap-x-8 pt-6">
          {chapter.students
            .filter((user) => user.approved == "PENDING")
            .map((user) => (
              <UserTile key={user.id} student={user} link="" />
            ))}
        </div>
        <div className="font-merriweather mt-5 text-xl font-bold">
          Members (
          {
            chapter.students.filter((user) => user.role != "CHAPTER_LEADER")
              .length
          }
          )
        </div>
        <div className="flex gap-x-8 pt-6">
          {chapter.students
            .filter((user) => user.role != "CHAPTER_LEADER")
            .map((user) => (
              <UserTile key={user.id} student={user} link="" />
            ))}
        </div>
      </div>
    </>
  );
};

export default ChapterPage;
