"use client";

import { useState } from "react";
import { UserTile } from "@components/TileGrid";
import { CardGrid } from "@components/container";
import SearchBar from "@components/SearchBar";
import { User } from "@prisma/client";

type MembersHomePageProps = {
  members: User[];
  user: User;
};

const MembersHomePage = ({ members, user }: MembersHomePageProps) => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <h1 className="font-merriweather text-3xl">
        {`Members (${members.length})`}
      </h1>
      <div className="mb-6 mt-6 flex w-full gap-2.5">
        <SearchBar setFilter={setFilter} />
      </div>
      {members.length > 0 ? (
        <CardGrid
          tiles={members
            .filter((member) =>
              (member.firstName + " " + member.lastName)
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
            .map((member, index) => {
              return (
                <UserTile
                  key={index}
                  student={member}
                  link={`/private/${user.id}/chapter-leader/members/${member.id}`}
                />
              );
            })}
        />
      ) : (
        <h1 className="text-2xl font-light">
          {"This chapter has no members."}
        </h1>
      )}
    </>
  );
};

export default MembersHomePage;
