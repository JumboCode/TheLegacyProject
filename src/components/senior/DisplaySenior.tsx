"use client";

import SearchableContainer from "@components/SearchableContainer";
import { Prisma, User } from "@prisma/client";
import { compareUser, formatFileDate, fullName, seniorFullName } from "@utils";
import { File } from "@components/file";
import AddFile from "@components/file/AddFile";
import { v4 as uuid } from "uuid";
import { Assignment } from "@components/selector";
import { patchSenior } from "@api/senior/[id]/route.client";
import React from "react";
import { useApiThrottle } from "@hooks";

interface DisplayProps {
  editable: boolean;
  canAddFile: boolean;
  senior: Prisma.SeniorGetPayload<{
    include: { Files: true; chapter: { include: { students: true } } };
  }>;
}

const DisplaySenior = (props: DisplayProps) => {
  const { editable, canAddFile, senior } = props;
  const addFileId = uuid();

  const students = React.useMemo(
    () => senior.chapter.students.sort(compareUser),
    [senior.chapter.students]
  );

  const [editFile, setFileEdit] = React.useState<File | undefined>(undefined);

  const getAssignments = () =>
    students.filter((student) => senior.StudentIDs.includes(student.id));

  const [assigned, setAssigned] = React.useState(() => getAssignments());

  const { fn: throttlePatchSenior } = useApiThrottle({ fn: patchSenior });
  const onSave = async () => {
    await throttlePatchSenior({
      body: {
        firstname: senior.firstname,
        lastname: senior.lastname,
        location: senior.location,
        description: senior.description,
        StudentIDs: assigned.map((user) => user.id),
      },
      seniorId: senior.id,
    });
  };
  const seniorFiles = senior.Files.map((file) => ({
    ...file,
    date: new Date(
      file.date.getTime() + new Date().getTimezoneOffset() * 60000
    ),
  }));
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-4xl font-bold text-[#000022]">
        {seniorFullName(senior)}
      </h1>
      {senior.location.length > 0 && (
        <p>
          <b>Meeting Location: </b>
          <span>{senior.location}</span>
        </p>
      )}
      <p>{senior.description}</p>
      <Assignment
        header="Assign members"
        editable={editable}
        display={(user: User) => fullName(user)}
        elements={students}
        selected={assigned}
        setSelected={setAssigned}
        onSave={onSave}
        tagColor="#A96257"
      />
      <SearchableContainer
        display={(file) => (
          <File
            key={file.id}
            file={file}
            setFileEdit={canAddFile ? setFileEdit : undefined}
          />
        )}
        elements={seniorFiles.sort(
          (fileA, fileB) => fileA.date.getTime() - fileB.date.getTime()
        )}
        search={(file, filter) => formatFileDate(file.date).includes(filter)}
        addElementComponent={
          canAddFile ? (
            <AddFile
              seniorId={senior.id}
              seniorFolder={senior.folder}
              files={seniorFiles}
              key={addFileId}
              editFile={editFile}
              setEditFile={setFileEdit}
            />
          ) : undefined
        }
        emptyNode={
          <p className="text-2xl font-light text-[#000022]">No files yet.</p>
        }
      />
    </div>
  );
};

export default DisplaySenior;
