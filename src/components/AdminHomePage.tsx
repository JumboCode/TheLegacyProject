"use client";

import SearchBar from "@components/SearchBar";
import { ChapterTile } from "@components/TileGrid/ChapterTile";
import { useState } from "react";
import { Prisma } from "@prisma/client";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

type AdminHomePageProps = {
  chapters: ChapterWithUser[];
};

const AdminHomePage = ({ chapters }: AdminHomePageProps) => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <div className="mb-6 mt-6 flex gap-2.5">
        <SearchBar setFilter={setFilter} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-6">
        {chapters
          .filter((chapter) =>
            chapter.chapterName.toLowerCase().includes(filter.toLowerCase())
          )
          .map((chapter, index) => {
            let yearsActive =
              (new Date().getTime() - chapter.dateCreated.getTime()) / 1000;
            yearsActive /= 60 * 60 * 24;
            yearsActive = Math.abs(Math.round(yearsActive / 365.25));

            const prez = chapter.students.find(
              (user) => user.role == "CHAPTER_LEADER"
            );

            return (
              <ChapterTile
                key={index}
                title={chapter.chapterName}
                president={prez?.name ?? "Stephen Burchfield"}
                numMembers={chapter.students.length}
                yearsActive={yearsActive}
                emailPresident={prez?.email ?? "stephen.burchfield@tufts.edu"}
                phonePresident={"857-310-6658"} // @TODO: Add phone number to User?
              />
            );
          })}
      </div>
    </>
  );
};

export default AdminHomePage;
