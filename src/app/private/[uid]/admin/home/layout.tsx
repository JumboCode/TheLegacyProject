"use client";

import SearchBar from "@components/SearchBar";
import SortDropdown from "@components/SortDropdown";
import { HeaderContainer } from "@components/container/index";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

interface IAdminHomeLayout {
  children: React.ReactNode;
}

const AdminHomeLayout = ({ children }: IAdminHomeLayout) => {
  const [filter, setFilter] = useState("");

  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const isChaptersSelected = !!searchParams?.get("chapters");
  const isResourcesSelected = !!searchParams?.get("resources");

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
              replace
              href={pathname + "/?chapters=true"}
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
              replace
              href={pathname + "/?resources=true"}
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
      {isChaptersSelected && (
        <div className="mb-6 mt-6 flex gap-2.5">
          <SearchBar setFilter={setFilter} />
        </div>
      )}
      {children}
    </HeaderContainer>
  );
};

export default AdminHomeLayout;
