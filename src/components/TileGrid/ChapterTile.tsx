import {
  faEllipsis,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChapterTileProps {
  title: string;
  president: string;
  numMembers: number;
  yearsActive: number;
  emailPresident: string;
  phonePresident: string;
}

export function ChapterTile({
  title,
  president,
  numMembers,
  yearsActive,
  emailPresident,
  phonePresident,
}: ChapterTileProps) {
  return (
    <div className="max-w-xl rounded-xl bg-white p-6">
      <div className="mb-2.5 flex items-center justify-between gap-2.5">
        <div className="text-2xl underline">{title}</div>
        <FontAwesomeIcon className="fa-lg cursor-pointer" icon={faEllipsis} />
      </div>
      <div className="mb-2.5 flex">
        President:&nbsp;<span className="font-bold">{president}</span>
      </div>
      <div className="flex gap-2.5">
        <div className=" flex w-6/12 flex-col gap-2.5">
          <div>
            No. of Members:&nbsp;<span className="font-bold">{numMembers}</span>
          </div>
          <div>
            Years active:&nbsp;<span className="font-bold">{yearsActive}</span>
          </div>
        </div>
        <div className="flex w-6/12 flex-col gap-2.5">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>{emailPresident}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faPhone} /> <span>{phonePresident}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
