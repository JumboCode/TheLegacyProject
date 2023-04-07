import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export type FileProps = {
  id: string;
  name: string;
  description: string;
  lastModified: Date;
  url: string;
  tags: TagProps[];
};

export type TagProps = {
  name: string;
  color: string;
};

const Tag = ({name, color}: TagProps) => {

    // TODO: function to set tag color based on color prop

    return (
        <div className="w-fit whitespace-nowrap rounded-md text-center border-2 h-15 p-2">
            <span className=""> {name}, {color} </span>
        </div>
    )
};

const File = ({
  //   id,
  name,
  //   description,
  lastModified,
  url,
  tags,
}:
FileProps) => {

  const [tagData, setTagData] = useState<TagProps[]>(tags);

  return (
    <div className="flex aspect-square flex-col justify-between rounded-md border bg-off-white p-4 text-left font-sans hover:cursor-pointer hover:bg-taupe-hover">
      <div className="flex flex-col">
        <span> {name} </span>
        <span> {url} </span>
        <span> {lastModified} </span>
      </div>
      {/* Row of Tags */}
      <div className="flex flex-row flex-nowrap overflow-x-scroll">
        {tagData.map(({name, color}: TagProps) => (
            <div className=""> 
                <Tag name={name} color={color} /> 
            </div>
        ))}
      </div>
    </div>
  );
};

export default File;
