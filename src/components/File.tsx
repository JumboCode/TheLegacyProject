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

export type TagColorProps = {
  name: string;
  className: string;
}

// const tagColorArr: TagColorProps[] = [
//   {name: "rust", className: "bg-tag-rust-600 hover:bg-tag-rust-500"},
//   {name: "tan", className: "bg-tag-tan-600 hover:bg-tag-tan-500"},
//   {name: "sage", className: "bg-tag-sage-600 hover:bg-tag-sage-500"},
//   {name: "gray", className: "bg-tag-gray-600 hover:bg-tag-gray-500"},
// ]

const Tag = ({name, color}: TagProps) => {

    // TODO: set tag color based on color prop

    // const tagColors = [
    //     {rust: "bg-tag-rust-600 hover:bg-tag-rust-500"},
    //     {tan: "bg-tag-tan-600 hover:bg-tag-tan-500"},
    //     {sage: "bg-tag-sage-600 hover:bg-tag-sage-500"},
    //     {gray: "bg-tag-gray-600 hover:bg-tag-gray-500"},
    // ]

    let givenColor;
    //let givenColor = "bg-tag-gray";
    //const [tagColor, setTagColor] = useState<string>(givenColor);

    if (color == "rust") {
      givenColor = "bg-tag-rust";
    } else if (color == "tan") {
      givenColor = "bg-tag-tan";
    } else if (color == "sage") {
      givenColor = "bg-tag-sage";
    } else if (color == "gray") {
      givenColor = "bg-tag-gray";
    }
    
    return (
        <div className={`${givenColor} w-fit whitespace-nowrap rounded-md text-center text-off-white h-15 p-2`}>
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
    <div className="flex aspect-square flex-col justify-between rounded-md border bg-off-white p-5 drop-shadow-md text-left font-sans hover:cursor-pointer hover:bg-taupe-hover">
      <div className="flex flex-col">
        <span className="font-semibold mb-1 text-lg"> {name} </span>
        <span className="mb-1"> {url} </span>
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
