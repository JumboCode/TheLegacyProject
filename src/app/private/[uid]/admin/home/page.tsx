"use client";

import SearchBar from "@components/SearchBar";
import SortDropdown, { SortMethod } from "@components/SortDropdown";
import { ChapterTile } from "@components/TileGrid/ChapterTile";
import { useState } from "react";

const AdminHomePage = () => {
  const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");
  const [filter, setFilter] = useState("");

  const chapters = [
    {
      title: "Tufts University",
      president: "Won Kim",
      numMembers: 12,
      yearsActive: 2,
      emailPresident: "wonkim@tufts.edu",
      phonePresident: "781-498-9695",
    },
    {
      title: "Hello University",
      president: "Won Kim",
      numMembers: 12,
      yearsActive: 2,
      emailPresident: "wonkim@tufts.edu",
      phonePresident: "781-498-9695",
    },
    {
      title: "Harvard University",
      president: "Won Kim",
      numMembers: 12,
      yearsActive: 2,
      emailPresident: "wonkim@tufts.edu",
      phonePresident: "781-498-9695",
    },
    {
      title: "MIT",
      president: "Won Kim",
      numMembers: 12,
      yearsActive: 2,
      emailPresident: "wonkim@tufts.edu",
      phonePresident: "781-498-9695",
    },
  ];

  return (
    <>
      <div className="mb-6 mt-6 flex gap-2.5">
        <SearchBar setFilter={setFilter} />
        <SortDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-6">
        {chapters
          .filter((chapter) =>
            chapter.title.toLowerCase().includes(filter.toLowerCase())
          )
          .map((chapter, index) => (
            <ChapterTile
              key={index}
              title={chapter.title}
              president={chapter.president}
              numMembers={chapter.numMembers}
              yearsActive={chapter.yearsActive}
              emailPresident={chapter.emailPresident}
              phonePresident={chapter.phonePresident}
            />
          ))}
      </div>
    </>
  );
};

export default AdminHomePage;
