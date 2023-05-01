import { TileEdit } from "./TileEdit";
import { User } from "@prisma/client";
import Image from "next/image";

interface IStudentTileProps {
  student: User;
  setDeactivated: React.Dispatch<React.SetStateAction<User[]>>;
  setStudents: React.Dispatch<React.SetStateAction<User[]>>;
  refreshData: () => void;
}

export function StudentTile({
  student,
  setDeactivated,
  setStudents,
  refreshData,
}: IStudentTileProps) {
  return (
    <div className="p4 relative flex h-64 w-64 flex-col items-center justify-center gap-4 rounded bg-white text-base font-medium text-gray-700 drop-shadow-md">
      <div className="absolute top-2 right-2">
        <TileEdit
          handleDelete={() => {
            fetch(`/api/student/${student.id}`, {
              method: "DELETE",
            });
            setDeactivated((prev) => [...prev, student]);
            setStudents((prev) => prev.filter((s) => s.id !== student.id));
            refreshData();
          }}
        />
      </div>
      <div className="h-20 w-20 overflow-hidden rounded-full">
        <Image
          className="object-scale-down"
          src={student.image ?? "/images/placeholder.png"}
          alt="Placeholder profile image"
          height={80}
          width={80}
        ></Image>
      </div>
      <p>{student.name}</p>
    </div>
  );
}
