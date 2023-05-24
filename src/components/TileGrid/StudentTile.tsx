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

  const options: Parameters<typeof TileEdit>[0]["options"] = [];
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
      onClick: (e) => {
        e.preventDefault();
        setDeactivated((prev) => [...prev, student]);
        setStudents((prev) => prev.filter((s) => s.id !== student.id));
        fetch(`/api/student/${student.id}/reject`, { method: "POST" });
        refreshData();
      },
    });
  }

  return (
    <div className="relative w-auto flex flex-col aspect-square items-center rounded bg-white text-base font-medium text-gray-700 drop-shadow-md">
      <div className="absolute top-2 right-2">
        <TileEdit options={options} />
      </div>
      <div className="flex flex-col h-1/2 justify-end">
        <Image
          className="object-scale-down"
          src={student.image ?? "/student_home/genericprofile.png"}
          alt="Placeholder profile image"
          height={75}
          width={75}
        />
      </div>
      <div className="relative h-1/2 w-full p-2 flex flex-col font-semibold text-center text-lg text-neutral-600">
          {data && student.name &&
            <span className={"text-xl break-words px-2" && student.admin ? "text-tag-rust font-bold" : ""}>
              {student.name} {student.admin ? "(Admin)" : ""}
            </span>
          }

          {student.email ? (
            <p className="text-md font-medium text-neutral-600 truncate px-2">{student.email}</p>
            ) : null}
      </div>
    </div>
  );
}