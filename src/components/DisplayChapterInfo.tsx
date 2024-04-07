"use client";

import { Prisma, Resource, User, UserRequest } from "@prisma/client";
import { CardGrid } from "./container";
import { UserTile } from "./TileGrid";
import DisplayResources from "./DisplayResources";
import React from "react";
import { UserContext } from "@context/UserProvider";
import PendingCard from "@components/PendingCard";
import { fullName } from "@utils";
import { RoleToUrlSegment } from "@constants/RoleAlias";
import DropDownContainer from "@components/container/DropDownContainer";

type ChapterWithUser = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;

type RequestWithUser = Prisma.UserRequestGetPayload<{
  include: { user: true };
}>;

interface DisplayChapterInfoParams {
  chapter: ChapterWithUser;
  resources: Resource[];
  userRequests?: RequestWithUser[];
}

const DisplayChapterInfo = ({
  chapter,
  resources,
  userRequests,
}: DisplayChapterInfoParams) => {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;

  const students =
    user.role === "ADMIN"
      ? chapter.students
      : chapter.students.filter(
          (user) => user.role === "CHAPTER_LEADER" || user.position !== ""
        );

  return (
    <div className="w-full">
      <div className="font-merriweather mb-4 text-2xl font-bold text-[#000022]">
        {chapter.chapterName}
      </div>
      <div className="mb-7 flex gap-x-6 overflow-x-auto">
        {[
          chapter.location,
          `${chapter.students.length} members`,
          `Active since ${chapter.dateCreated.getFullYear()}`,
        ].map((value) => (
          <div
            key={value}
            className="whitespace-nowrap rounded bg-dark-teal p-2.5 font-light text-white"
          >
            {value}
          </div>
        ))}
      </div>
      {userRequests && (
        <div className="mb-12">
          <DropDownContainer
            title={
              <div className="mb-6 text-xl">{`Pending (${userRequests.length})`}</div>
            }
          >
            {userRequests.length > 0 ? (
              <CardGrid
                column_count={2}
                tiles={userRequests.map((user, index) => {
                  return (
                    <PendingCard
                      key={index}
                      name={fullName(user.user)}
                      uid={user.id}
                    />
                  );
                })}
              />
            ) : (
              <h1 className="font-light">
                {"This chapter has no pending members."}
              </h1>
            )}
          </DropDownContainer>
        </div>
      )}
      <div className="mb-12">
        <DropDownContainer
          title={
            <div className="mb-6 text-xl">
              {user.role === "ADMIN"
                ? `Members (${chapter.students.length})`
                : "Executive Board"}
            </div>
          }
        >
          <CardGrid
            tiles={students.map((student) => (
              <UserTile
                key={student.id}
                student={student}
                link={`/private/${user.id}/${
                  RoleToUrlSegment[user.role]
                }/users/${student.id}`}
              />
            ))}
          />
        </DropDownContainer>
      </div>
      <div className="mb-12">
        <DropDownContainer
          title={<div className="mb-6 text-xl">Resources</div>}
        >
          <DisplayResources
            resources={resources}
            showRole={false}
            editable={false}
            column={3}
          />
        </DropDownContainer>
      </div>
    </div>
  );
};

export default DisplayChapterInfo;
