import { TileEdit } from "./TileEdit";
import { Senior } from "@prisma/client";
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
    <div className="p4 relative flex h-64 w-64 flex-col items-center justify-center gap-4 rounded bg-white text-base font-medium text-gray-700 drop-shadow-md">
      <div className="absolute top-2 right-2">
        <TileEdit
          handleEdit={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          handleDelete={(e) => {
            e.stopPropagation();
            e.preventDefault();
            fetch(`/api/senior/${senior.id}`, {
              method: "DELETE",
            });
            setSeniors((prev) => prev.filter((s) => s.id !== senior.id));
            refreshData();
          }}
        />
      </div>
      <Link href={`/senior/${senior.id}`}>{senior.name}</Link>
      <p>{senior.location}</p>
    </div>
  );
}
