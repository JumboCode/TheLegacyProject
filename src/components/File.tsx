import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { current } from "tailwindcss/colors";

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

  const timeOptions: Intl.DateTimeFormatOptions = {hour: "numeric", hour12: true, minute: "numeric"};
  const dateOptions: Intl.DateTimeFormatOptions = {year: "numeric", month: "long", day: "numeric"};

  const currentDate = new Date();
  let dateString = "";

  if ((lastModified.getFullYear() == currentDate.getFullYear()) && (lastModified.getMonth() == currentDate.getMonth())) {
    if ((lastModified.getDay() == currentDate.getDay()) && (lastModified.getHours() <= currentDate.getHours())) {
      // TODAY
      dateString = "today at " + lastModified.toLocaleTimeString(undefined, timeOptions);
    }
    if ((lastModified.getDay() == currentDate.getDay() - 1) && (lastModified.getHours() > currentDate.getHours())) {
      // YESTERDAY
      dateString = "yesterday at " + lastModified.toLocaleTimeString(undefined, timeOptions);
    }
  } else {
    // ALL OTHER TIMES
    dateString = lastModified.toLocaleDateString(undefined, dateOptions);
  }

  return (
    <div className="flex aspect-square flex-col justify-between rounded-lg border bg-off-white p-5 drop-shadow-md text-left font-sans hover:cursor-pointer hover:bg-taupe-hover">
      <div className="flex flex-col">
        <span className="font-semibold mb-1 text-lg"> {name} </span>
        <span className="mb-1"> {url} </span>
        <span> Last opened {dateString} </span>
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
