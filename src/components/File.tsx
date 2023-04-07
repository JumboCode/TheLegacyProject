import React from "react";

export type FileProps = {
  id: string;
  name: string;
  description: string;
  lastModified: Date;
  url: string;
  tags: string[];
};

const File = ({
  //   id,
  name,
  //   description,
  lastModified,
  url,
}: //   tags,
FileProps) => {
  return (
    <div className="flex aspect-square flex-col rounded-md border bg-off-white p-4 text-left font-sans hover:cursor-pointer hover:bg-taupe-hover">
      <span> {name} </span>
      <span> {url} </span>
      <span> {lastModified} </span>
    </div>
  );
};

export default File;
