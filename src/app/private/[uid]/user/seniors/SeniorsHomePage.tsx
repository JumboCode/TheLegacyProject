"use client";

import { useState } from "react";
import { UserTile } from "@components/TileGrid";
import { CardGrid } from "@components/container";
import { TileEdit } from "@components/TileGrid/TileEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "@components/SearchBar";
import { Senior, User } from "@prisma/client";

type SeniorsHomePageProps = {
  seniors: Senior[];
  user: User;
};

const SeniorsHomePage = ({ seniors, user }: SeniorsHomePageProps) => {
  const [filter, setFilter] = useState("");

  return (
    <>
      <h1 className="font-merriweather text-3xl">
        {`My Assigned Seniors (${seniors.length})`}
      </h1>
      <div className="mb-6 mt-6 flex w-full gap-2.5">
        <SearchBar setFilter={setFilter} />
      </div>
      {seniors.length > 0 ? (
        <CardGrid
          tiles={seniors
            .filter((senior) =>
              senior.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((senior, index) => {
              return (
                <UserTile
                  key={index}
                  senior={senior}
                  link={`/private/${user.id}/user/seniors/${senior.id}`}
                />
              );
            })}
        />
      ) : (
        <h1 className="text-2xl font-light">
          {"You haven't been assigned a Senior yet."}
        </h1>
      )}
    </>
  );
};

export default SeniorsHomePage;
