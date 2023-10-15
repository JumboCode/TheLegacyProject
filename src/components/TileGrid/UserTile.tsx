import { TileEdit } from "./TileEdit";
import { Senior, User } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";
import "@fontsource/merriweather";

interface UserTileProps {
  student?: User;
  senior?: Senior;
  link: string;
  setDeactivated?: Dispatch<SetStateAction<User[]>>;
  setStudents?: Dispatch<SetStateAction<User[]>>;
  setSeniors?: Dispatch<SetStateAction<Senior[]>>;
  refreshData: () => void;
  setShowAddSeniorPopUp?: Dispatch<SetStateAction<boolean>>;
  setSeniorPatch?: Dispatch<SetStateAction<string>>;
}

export function UserTile({
  student,
  senior,
  link,
  setDeactivated,
  setStudents,
  setSeniors,
  refreshData,
  setShowAddSeniorPopUp,
  setSeniorPatch,
}: UserTileProps) {
  const { data } = useSession();

  const options: Parameters<typeof TileEdit>[0]["options"] = [];

  if (student && setStudents && setDeactivated) {
    if (data && data?.user?.id !== student.id) {
      if (student.admin) {
        options.push({
          name: "Demote",
          onClick: () => {
            setStudents((prev) =>
              prev.map((s) =>
                s.id === student.id ? { ...s, admin: false } : s
              )
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
  } else if (senior) {
    options.push({
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
    });

    options.push({
      name: "Delete",
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();
        fetch(`/api/senior/${senior.id}`, {
          method: "DELETE",
        });
        if (!setSeniors) {
          return;
        }
        setSeniors((prev) => prev.filter((s) => s.id !== senior.id));
        refreshData();
      },
    });
  }

  return (
    <div
      style={{ backgroundColor: "white", borderRadius: "8px", width: "160px" }}
    >
      <div
        className="drop-shadow-md hover:bg-off-white"
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "8px 8px 0px 0px",
          backgroundColor: "white",
        }}
      >
        <Link href={link}>
          <div style={{ width: "100%", height: "100%", objectFit: "cover" }}>
            {student ? (
              <Image
                src={
                  (student && student.image) ?? "/profile/genericprofile.png"
                }
                alt="Placeholder profile image"
                layout="fill"
                style={{
                  borderRadius: "8px 8px 0px 0px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            ) : (
              <Image
                src={"/profile/seniorprofile_icon.png"}
                alt="Placeholder profile image"
                layout="fill"
                style={{
                  borderRadius: "8px 8px 0px 0px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            )}
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
        <p
          style={{
            color: "#22555A",
            textOverflow: "ellipsis",
            fontSize: "14px",
            fontFamily: "Merriweather",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {data && student && student.name
            ? student.name + (student.admin ? " (Admin)" : "")
            : data && senior && senior.name
            ? senior.name
            : null}
        </p>
        {/* @TODO: Add senior's location after discussing */}
        {/* <p className="text-md font-base text-neutral-600 truncate px-2">
          {senior && senior.location}
        </p> */}
        <TileEdit options={options} />
      </div>
    </div>
  );
}
