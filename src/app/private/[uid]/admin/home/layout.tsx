"use client";

import SearchBar from "@components/SearchBar";
import SortDropdown from "@components/SortDropdown";
import TabButtons from "@components/TabButtons";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  usePathname,
  useSelectedLayoutSegment,
  redirect,
} from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface IAdminHomeLayout {
  children: React.ReactNode;
}

const AdminHomeLayout = ({ children }: IAdminHomeLayout) => {
  const pathname = usePathname() ?? "";
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    if (segment === null) {
      redirect(pathname + "/chapters");
    }
  }, [pathname, segment]);

  const isChaptersSelected = segment === null || segment === "chapters";
  const isResourcesSelected = segment === "resources";

  return (
    <HeaderContainer
      header="Home"
      headerIcon={faHouse}
      showHorizontalLine={false}
    >
      <div style={{ width: "fit-content" }}>
        <div className="flex gap-6">
          <div>
            <Link
              // replace
              href={
                segment === null
                  ? pathname + "/chapters"
                  : pathname.split("/").slice(0, -1).join("/") + "/chapters"
              }
              className={
                "text-xl" +
                (isChaptersSelected ? " text-dark-teal" : " text-black")
              }
            >
              CHAPTERS
            </Link>

            {isChaptersSelected ? (
              <hr style={{ border: "1px solid black", width: "100%" }} />
            ) : null}
          </div>
          <div>
            <Link
              // replace
              href={
                segment === null
                  ? pathname + "/resources"
                  : pathname.split("/").slice(0, -1).join("/") + "/resources"
              }
              className={
                "text-xl" +
                (isResourcesSelected ? " text-dark-teal" : " text-black")
              }
            >
              RESOURCES
            </Link>
            {isResourcesSelected ? (
              <hr style={{ border: "1px solid black", width: "100%" }} />
            ) : null}
          </div>
        </div>
        <hr style={{ border: "0.5px solid black", width: "100%" }} />
      </div>
      {children}
    </HeaderContainer>
  );
};

export default AdminHomeLayout;
