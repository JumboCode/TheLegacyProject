import ChapterRequest from "@components/ChapterRequest";
import { prisma } from "@server/db/client";

const PendingChapters = async () => {
  // Use prisma to get all pending chapter requests
  const pendingChapters = await prisma.chapterRequest.findMany();
  console.log(pendingChapters[0]);
  // Map every chapter request to a pending chapter component and return!
  return (
    <div className="flex flex-wrap">
      {pendingChapters.map((chapter) => (
        <ChapterRequest
          key={chapter.id}
          universityName={chapter.university}
          universityAddress={chapter.universityAddress}
          name={chapter.firstName + " " + chapter.lastName}
          phoneNumber={chapter.phoneNumber}
          email={chapter.universityEmail}
        />
      ))}
    </div>
  );
};

export default PendingChapters;
