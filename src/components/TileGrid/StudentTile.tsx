import { TileEdit } from "./TileEdit";
import { User } from "@prisma/client";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
  const { data } = useSession();

  const options = [];
  if (data && data?.user?.id !== student.id) {
    if (student.admin) {
      options.push({
        name: "Demote",
        onClick: () => {
          setStudents((prev) =>
            prev.map((s) => (s.id === student.id ? { ...s, admin: false } : s))
          );
          fetch(`/api/student/${student.id}/demote`, { method: "POST" });
          refreshData();
        },
      });
    } else {
      options.push({
        name: "Promote",
        onClick: () => {
          setStudents((prev) =>
            prev.map((s) => (s.id === student.id ? { ...s, admin: true } : s))
          );
          fetch(`/api/student/${student.id}/promote`, { method: "POST" });
          refreshData();
        },
      });
    }

    options.push({
      name: "Deactivate",
      onClick: () => {
        setDeactivated((prev) => [...prev, student]);
        setStudents((prev) => prev.filter((s) => s.id !== student.id));
        refreshData();
      },
    });
  }

  return (
    <div className="p4 relative flex h-64 w-64 flex-col items-center justify-center gap-4 rounded bg-white text-base font-medium text-gray-700 drop-shadow-md">
      <div className="absolute top-2 right-2">
        <TileEdit options={options} />
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
      <div className="text-center">
        <div className="flex w-full flex-row justify-center gap-2 text-base font-bold text-neutral-600">
          <span>{student.name}</span>
          {data && data.user?.id === student.id ? (
            <span>(you)</span>
          ) : student.admin ? (
            <span>(admin)</span>
          ) : null}
        </div>
        {student.email ? (
          <p className="text-sm font-light text-neutral-400">{student.email}</p>
        ) : null}
      </div>
    </div>
  );
}
