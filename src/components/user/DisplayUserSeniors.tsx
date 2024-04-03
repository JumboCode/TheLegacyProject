"use client";

import { patchSenior } from "@api/senior/[id]/route.client";
import NewAssignment from "@components/senior/assignment/NewAssignment";
import { Prisma, Senior, User } from "@prisma/client";
import { compareSenior, seniorFullName } from "@utils";
import React from "react";

interface DisplayProps {
  editable: boolean;
  user: Prisma.UserGetPayload<{
    include: { Chapter: { include: { seniors: true } } };
  }>;
}

const DisplayUserSenior = (props: DisplayProps) => {
  const { editable, user } = props;

  const seniors = React.useMemo(
    () => user.Chapter?.seniors.sort(compareSenior) ?? [],
    [user.Chapter?.seniors]
  );

  const getAssignments = () =>
    seniors?.filter((senior) => user.SeniorIDs.includes(senior.id));

  console.log("user.SeniorIDS", user.SeniorIDs);

  const [assigned, setAssigned] = React.useState(() => getAssignments());
  const [seniorsOfUser, setSeniorsOfUser] = React.useState(() =>
    getAssignments()
  );

  const onSave = () => {
    const seniorsToRemove = seniorsOfUser.filter(
      (senior) => !assigned.includes(senior)
    );

    setSeniorsOfUser(assigned);

    console.log("seniorsToRemove", seniorsToRemove);
    console.log("assignedSeniros", assigned);

    seniorsToRemove.map(async (senior) => {
      const temp = senior.StudentIDs.filter((id) => id != user.id);
      console.log("temp", temp);
    });

    return Promise.all([
      seniorsToRemove.map(async (senior) => {
        await patchSenior({
          body: {
            ...senior,
            StudentIDs: senior.StudentIDs.filter((id) => id != user.id),
          },
          seniorId: senior.id,
        });
      }),

      assigned.map(async (senior) => {
        await patchSenior({
          body: {
            ...senior,
            StudentIDs: [...senior.StudentIDs, user.id],
          },
          seniorId: senior.id,
        });
      }),
    ]);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-bold text-[#000022]">{`${user.firstName} ${user.lastName}`}</h1>
      <NewAssignment
        editable={editable}
        display={(senior: Senior) => seniorFullName(senior)}
        elements={seniors}
        selected={assigned}
        setSelected={setAssigned}
        onSave={onSave}
      />
    </div>
  );
};

export default DisplayUserSenior;
