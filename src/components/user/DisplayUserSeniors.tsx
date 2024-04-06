"use client";

import { editSeniorIDs } from "@api/user/[uid]/edit-seniors/route.client";
import { UserTile } from "@components/TileGrid";
import { CardGrid } from "@components/container";
import Assignment from "@components/senior/assignment";
import { RoleToUrlSegment } from "@constants/RoleAlias";
import { Prisma, Senior } from "@prisma/client";
import { compareName, fullName, seniorFullName } from "@utils";
import React from "react";
import { UserContext } from "src/context/UserProvider";

interface DisplayProps {
  editable: boolean;
  currentUser: Prisma.UserGetPayload<{
    include: { Chapter: { include: { seniors: true } } };
  }>;
}

const DisplayUserSenior = (props: DisplayProps) => {
  const { user } = React.useContext(UserContext);
  const { editable, currentUser } = props;

  const seniors = React.useMemo(
    () =>
      currentUser.Chapter?.seniors.sort((senior1, senior2) =>
        compareName(seniorFullName(senior1), seniorFullName(senior2))
      ) ?? [],
    [currentUser.Chapter?.seniors]
  );

  const getAssignments = () =>
    seniors?.filter((senior) => currentUser.SeniorIDs.includes(senior.id));

  const [assigned, setAssigned] = React.useState(() => getAssignments());

  const onSave = async () => {
    await editSeniorIDs(
      {
        body: {
          SeniorIDs: assigned.map((senior) => senior.id),
        },
      },
      currentUser.id
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-bold text-[#000022]">
        {fullName(currentUser)}
      </h1>
      <Assignment
        header="Assign seniors"
        editable={editable}
        display={(senior: Senior) => seniorFullName(senior)}
        elements={seniors}
        selected={assigned}
        setSelected={(element) => {
          if (assigned.some((other) => element.id === other.id)) {
            setAssigned((prev) =>
              prev.filter((other) => element.id !== other.id)
            );
          } else {
            setAssigned((prev) => [...prev, element]);
          }
        }}
        onSave={onSave}
      />

      <CardGrid
        tiles={assigned.map((eachSenior) => (
          <UserTile
            key={eachSenior.id}
            senior={eachSenior}
            link={`/private/${user.id}/${RoleToUrlSegment[user.role]}/seniors/${
              eachSenior.id
            }`}
          />
        ))}
      />
    </div>
  );
};

export default DisplayUserSenior;
