import { File } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Tag, { tagMap } from "./Tag";

export type IFileCardProps = Pick<
  File,
  "id" | "name" | "lastModified" | "url" | "Tags"
>;

const FileCard = ({
  id,
  name,
  lastModified: intialLastModified,
  url,
  Tags,
}: IFileCardProps) => {
  const [lastModified, setLastModified] = useState(intialLastModified);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = new Date();
  let dateString = "";

  if (
    lastModified.getFullYear() == currentDate.getFullYear() &&
    lastModified.getMonth() == currentDate.getMonth()
  ) {
    if (
      lastModified.getDay() == currentDate.getDay() &&
      lastModified.getHours() <= currentDate.getHours()
    ) {
      // Today
      dateString =
        "today at " + lastModified.toLocaleTimeString(undefined, timeOptions);
    }
    if (
      lastModified.getDay() == currentDate.getDay() - 1 &&
      lastModified.getHours() > currentDate.getHours()
    ) {
      // Yesterday
      dateString =
        "yesterday at " +
        lastModified.toLocaleTimeString(undefined, timeOptions);
    }
  } else {
    // All other times
    dateString = lastModified.toLocaleDateString(undefined, dateOptions);
  }

  return (
    <div className="hover:bg-tan-hover flex aspect-square flex-col justify-between rounded-lg border bg-off-white p-5 text-left font-sans drop-shadow-md hover:cursor-pointer">
      <div className="flex flex-col">
        <span className="mb-1 text-lg font-semibold"> {name} </span>
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
          onClick={async () => {
            const date = new Date();
            setLastModified(date);
            const res = await fetch(`/api/file/${id}/update`, {
              method: "POST",
            });
            const newFile = await res.json();
            if (newFile.error) {
              console.error(newFile.error);
              return;
            }
            setLastModified(new Date(newFile.lastModified));
          }}
        >
          <span className="mb-1 w-[20px] text-slate-400 hover:text-purple-800">
            Link
          </span>
        </a>
        <span> Last opened {dateString} </span>
      </div>
      {/* Row of Tags */}
      <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto">
        {Tags.map((name, i) => (
          <Tag key={i} name={name} color={tagMap.get(name) ?? ""} />
        ))}
      </div>
    </div>
  );
};

export default FileCard;