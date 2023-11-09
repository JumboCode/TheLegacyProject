"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface PathNavParams {
  pathInfo: PathInfoType[];
}

export type PathInfoType = {
  display: string;
  url: string;
};

const PathNav = ({ pathInfo }: PathNavParams) => {
  const currentPath = "http://localhost:3000" + usePathname();
  const totalPathLength = currentPath.length;

  const getRemovePath = (currentIndex: number) => {
    let removePath = 0;
    const pathDict = pathInfo;

    if (pathDict.length - 1 == currentIndex) {
      return removePath;
    }

    for (let i = currentIndex + 1; i < pathDict.length; i++) {
      removePath += (pathDict[i] as any).url.length + 1;
    }

    return removePath;
  };

  return (
    <>
      <div>
        <div className="font-merriweather mt-7 flex flex-row">
          {pathInfo.map((currPath, index, array) => (
            <>
              {index !== 0 && <div className="px-2">&gt;</div>}
              <a
                href={`${currentPath.substring(
                  0,
                  totalPathLength - getRemovePath(index)
                )}`}
                className={
                  index === array.length - 1 ? "text-dark-teal" : "text-black"
                }
              >
                {currPath.display}
              </a>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
export default PathNav;
