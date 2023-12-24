"use client";
import { handleJoinChapterRequest } from "@api/user-request/route.client";

const Page = () => {
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          console.log(
            await handleJoinChapterRequest({
              body: { chapterId: "65878595b94284e0c3e02d55" },
            })
          );
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default Page;
