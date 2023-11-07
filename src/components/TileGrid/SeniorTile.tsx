import { TileEdit } from "./TileEdit";
import { Senior } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { deleteSenior } from "src/app/api/senior/[id]/route.client";

interface ISeniorTileProps {
  senior: Senior;
  link: string;
  setSeniors?: React.Dispatch<React.SetStateAction<Senior[]>>;
  refreshData: () => void;
  setShowAddSeniorPopUp?: Dispatch<SetStateAction<boolean>>;
  setSeniorPatch?: Dispatch<SetStateAction<string>>;
}

export function SeniorTile({
  senior,
  link,
  setSeniors,
  refreshData,
  setShowAddSeniorPopUp,
  setSeniorPatch,
}: ISeniorTileProps) {
  const options: Parameters<typeof TileEdit>[0]["options"] = [
    {
      name: "Edit",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!setSeniorPatch || !setShowAddSeniorPopUp) {
          return;
        }
        setSeniorPatch(senior.id);
        setShowAddSeniorPopUp(true);
      },
    },
    {
      name: "Delete",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        deleteSenior({ seniorId: senior.id });
        if (!setSeniors) {
          return;
        }
        setSeniors((prev) => prev.filter((s) => s.id !== senior.id));
        refreshData();
      },
    },
  ];

  console.log(senior.name + "'s Students: " + senior.StudentIDs.toString());

  return (
    <div className="relative flex aspect-square w-auto flex-col items-center rounded bg-white font-medium drop-shadow-md hover:bg-off-white">
      <TileEdit options={options} />
      <Link href={link}>
        <div className="flex h-full w-full flex-col justify-center">
          <div className="flex h-1/2 flex-col justify-end">
            <Image
              src={"/profile/seniorprofile_icon.png"}
              alt="Placeholder profile image"
              height={100}
              width={100}
            />
          </div>
          <div className="text-md text-neutral-600 relative flex h-1/2 w-full flex-col p-2 text-center font-medium">
            <span className="break-words px-2 font-semibold">
              {" "}
              {senior.name}{" "}
            </span>
            <p className="text-md font-base text-neutral-600 truncate px-2">
              {senior.location}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
