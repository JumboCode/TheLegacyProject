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

  const [assigned, setAssigned] = React.useState(() => getAssignments());

  // const onSave = (savedSeniors: Senior[]) => {
  //   savedSeniors.map(async (senior) => {
  //     await patchSenior({
  //       body: {
  //         firstname: senior.firstname,
  //         lastname: senior.lastname,
  //         location: senior.location,
  //         description: senior.description,
  //         StudentIDs: [...senior.StudentIDs, user.id],
  //       },
  //       seniorId: senior.id,
  //     });
  //   })

  // };

  const onSave = async () => {
    await patchSenior({
      body: {
        firstname: senior.firstname,
        lastname: senior.lastname,
        location: senior.location,
        description: senior.description,
        StudentIDs: [...senior.StudentIDs, user.id],
      },
      seniorId: senior.id,
    });
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* @TODO - Firstname + lastname */}
      <h1 className="text-4xl font-bold text-[#000022]">{`${user.firstName} ${user.lastName}`}</h1>
      <NewAssignment
        editable={editable}
        display={(senior: Senior) => seniorFullName(senior)}
        elements={seniors}
        selected={assigned}
        setSelected={setAssigned}
        onSave={onSave(seniors)}
      />
    </div>
  );
};

export default DisplayUserSenior;
