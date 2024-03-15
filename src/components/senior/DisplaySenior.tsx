"use client";

import SearchableContainer from "@components/SearchableContainer";
import { Prisma } from "@prisma/client";
import { formatFileDate } from "@utils";
import { File } from "@components/file";
import AddFile from "@components/file/AddFile";
import { v4 as uuid } from "uuid";
import Assignment from "./assignment";

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
  return (
    <div className="flex flex-col gap-y-6">
      {/* @TODO - Firstname + lastname */}
      <h1 className="text-4xl font-bold text-[#000022]">{`${senior.firstname} ${senior.lastname}`}</h1>
      <p>{senior.description}</p>
      <Assignment editable={editable} senior={senior} />
      <SearchableContainer
        display={(file) => <File key={file.id} file={file} />}
        elements={senior.Files}
        search={(file, filter) => formatFileDate(file.date).includes(filter)}
        addElementComponent={
          canAddFile && (
            <AddFile
              seniorId={senior.id}
              seniorFolder={senior.folder}
              files={senior.Files}
              key={addFileId}
            />
          )
        }
        emptyNode={
          <p className="text-2xl font-light text-[#000022]">No files yet.</p>
        }
      />
    </div>
  );
};

export default DisplaySenior;
