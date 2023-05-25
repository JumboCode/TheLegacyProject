import { TileEdit } from "./TileEdit";
import { Senior } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ISeniorTileProps {
  senior: Senior;
  setSeniors: React.Dispatch<React.SetStateAction<Senior[]>>;
  refreshData: () => void;
}

export function SeniorTile({
  senior,
  setSeniors,
  refreshData,
}: ISeniorTileProps) {
  return (
    <div className="relative w-auto flex flex-col aspect-square items-center rounded bg-white text-base font-medium text-gray-700 drop-shadow-md">
      <div className="absolute top-2 right-2">
        <TileEdit
          options={[
            {
              name: "Edit",
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
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
            },
          ]}
        />
      </div>
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


  );
}
