import { TileEdit } from "./TileEdit";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface IStudentTileProps {
  student: User;
  link: string;
  setDeactivated: React.Dispatch<React.SetStateAction<User[]>>;
  setStudents: React.Dispatch<React.SetStateAction<User[]>>;
  refreshData: () => void;
}

export function StudentTile({
  student,
  link,
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
    <div className="relative w-auto flex flex-col aspect-square items-center rounded bg-white hover:bg-off-white font-medium drop-shadow-md">
       <div className="absolute top-0 right-0">
        <TileEdit options={options} />
       </div>
          <Link href={link}> 
          <div className="flex flex-col h-full w-full items-center justify-center">
            <div className="relative object-cover h-[60px] w-[60px]">
              <Image
                src={student.image ?? "/profile/genericprofile.png"}
                alt="Placeholder profile image"
                layout="fill"
              />
            </div>
            <div className="relative flex flex-col w-full pt-2 px-4 font-semibold text-center text-sm">
                {data && student.name &&
                  <p className={student.admin ? "break-words text-tag-rust font-bold" : ""}>
                    {student.name} {student.admin ? "(Admin)" : ""}
                  </p>
}
              </div>
            </div>
          </Link>

    </div>
  );
}