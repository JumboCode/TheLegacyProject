import { TileEdit } from "./TileEdit";
import { User } from "@prisma/client";
import Image from "next/legacy/image";
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
    <div
      style={{ backgroundColor: "white", borderRadius: "8px", width: "122px" }}
    >
      <div
        className="drop-shadow-md hover:bg-off-white"
        style={{
          width: "122px",
          height: "122px",
          borderRadius: "8px 8px 0px 0px",
          backgroundColor: "white",
        }}
      >
        <Link href={link}>
          <div style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            <Image
              src={student.image ?? "/profile/genericprofile.png"}
              alt="Placeholder profile image"
              layout="fill"
              style={{
                borderRadius: "8px 8px 0px 0px",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
        }}
      >
        {data && student.name && (
          <p
            style={{
              color: "#22555A",
              textOverflow: "ellipsis",
              fontSize: "12px",
              fontFamily: "Merriweather",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {student.name} {student.admin ? "(Admin)" : ""}
          </p>
        )}
        <TileEdit options={options} />
      </div>
    </div>

    // <div className="relative flex aspect-square w-auto flex-col items-center rounded bg-white font-medium drop-shadow-md hover:bg-off-white">
    //   <div className="absolute right-0 top-0">
    //     <TileEdit options={options} />
    //   </div>
    //   <Link href={link}>
    //     <div className="flex h-full w-full flex-col items-center justify-center">
    //       <div className="relative h-[60px] w-[60px] object-cover">
    //         <Image
    //           src={student.image ?? "/profile/genericprofile.png"}
    //           alt="Placeholder profile image"
    //           layout="fill"
    //         />
    //       </div>
    //       <div className="relative flex w-full flex-col px-4 pt-2 text-center text-sm font-semibold">
    //         {data && student.name && (
    //           <p
    //             className={
    //               student.admin ? "break-words font-bold text-tag-rust" : ""
    //             }
    //           >
    //             {student.name} {student.admin ? "(Admin)" : ""}
    //           </p>
    //         )}
    //       </div>
    //     </div>
    //   </Link>
    // </div>
  );
}
