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

    // TODO: set tag color based on color prop

    //let givenColor = "bg-tag-gray";

    // if (color == "rust") {
    //   givenColor = "bg-tag-rust";
    // } else if (color == "tan") {
    //   givenColor = "bg-tag-tan";
    // } else if (color == "sage") {
    //   givenColor = "bg-tag-sage";
    // } else if (color == "gray") {
    //   givenColor = "bg-tag-gray";
    // }
    
    return (
        <div className={`${color} w-fit whitespace-nowrap rounded-lg text-center text-off-white h-15 py-2 px-3`}>
            <span className=""> {name} </span>
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
    <div className="flex aspect-square flex-col justify-between rounded-lg border bg-off-white p-5 drop-shadow-md text-left font-sans hover:cursor-pointer hover:bg-taupe-hover">
      <div className="flex flex-col">
        <span className="font-semibold mb-1 text-lg"> {name} </span>
        <span className="mb-1"> {url} </span>
        <span> {lastModified} </span>
      </div>
      {/* Row of Tags */}
      <div className="flex flex-row gap-2 flex-nowrap overflow-x-scroll">
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
