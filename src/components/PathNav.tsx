"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface PathNavParams {
  pathInfo: PathInfoType[];
}

export type PathInfoType = {
  display: string;
  url: string;
};

const PathNav = ({ pathInfo }: PathNavParams) => {
  const currentPath = usePathname() as string;

  const getPath = (currentIndex: number) => {
    const segments = currentPath.split("/");
    const path = segments.slice(
      0,
      segments.length - (pathInfo.length - currentIndex - 1)
    );
    return path.join("/");
  };

  return (
    <div className="mt-6">
      <div className="font-merriweather flex flex-row">
        {pathInfo.map((currPath, index, array) => (
          <React.Fragment key={index}>
            {index !== 0 && <div className="px-2">&gt;</div>}
            <Link
              href={getPath(index)}
              className={
                index === array.length - 1 ? "text-dark-teal" : "text-black"
              }
            >
              {currPath.display}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PathNav;
