import { TileEdit } from "./TileEdit";
import { Senior } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface ISeniorTileProps {
  senior: Senior;
  link: string;
  setSeniors: React.Dispatch<React.SetStateAction<Senior[]>>;
  refreshData: () => void;
  showAddSeniorPopUp: boolean;
  setShowAddSeniorPopUp: Dispatch<SetStateAction<boolean>>;
  seniorPatch: string;
  setSeniorPatch: Dispatch<SetStateAction<string>>;
}

export function SeniorTile({
  senior,
  link,
  setSeniors,
  refreshData,
  showAddSeniorPopUp,
  setShowAddSeniorPopUp,
  seniorPatch,
  setSeniorPatch
}: ISeniorTileProps) {

  const options: Parameters<typeof TileEdit>[0]["options"] = [
    {
      name: "Edit",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        setSeniorPatch(senior.id);
        setShowAddSeniorPopUp(true);
      },
    },
    {
      name: "Delete",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        fetch(`/api/senior/${senior.id}`, {
          method: "DELETE",
        });
        setSeniors((prev) => prev.filter((s) => s.id !== senior.id));
        refreshData();
      },
    }
  ];

  return (
      <div className="relative w-auto flex flex-col aspect-square items-center rounded bg-white hover:bg-off-white text-base font-medium text-gray-700 drop-shadow-md">
        <div className="absolute top-0 right-0">
          <TileEdit
            options={options}
          />
        </div>
        <Link href={link}>
          <div className="flex flex-col h-full w-full justify-center">
            <div className="flex flex-col h-1/2 justify-end">
              <Image
                className="object-scale-down"
                src={"/profile/seniorprofile_icon.png"}
                alt="Placeholder profile image"
                height={75}
                width={75}
              />
            </div>
            <div className="relative h-1/2 w-full p-2 flex flex-col font-medium text-center text-lg text-neutral-600">
                <span className="font-semibold break-words px-2"> {senior.name} </span>
                <p className="text-md font-base text-neutral-600 truncate px-2">{senior.location}</p>
            </div>
          </div>
        </Link>
      </div>
  );
}
