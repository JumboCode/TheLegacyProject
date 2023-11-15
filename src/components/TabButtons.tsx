"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

interface TabButtonsProps {
  queries: string[];
}

const TabButtons = ({ queries }: TabButtonsProps) => {
  const pathName = usePathname() ?? "";
  const segment = useSelectedLayoutSegment();

  return (
    <div style={{ width: "fit-content" }}>
      <div className="flex gap-6">
        {queries.map((query, index) => {
          const isTabSelected =
            segment === query || (segment === null && index === 0);

            let href;
            if (segment === null) {
              href = pathName + "/" + query;
            } else {
              const arr = pathName.split("/");
  
              let seg_idx = 0;
              for (let i = arr.length - 1; i >= 0; i--) {
                if (arr[i] === segment) {
                  seg_idx = i;
                  arr[i] = query;
                }
              }
  
              const new_arr = arr.slice(0, seg_idx + 1);
              
              const new_new_arr = new_arr.join("/");
              href = new_new_arr;
            }
            /* If segment is null, add to the end of pathName
             * Otherwise replace end of pathName with new query */
            /* const href =
              segment === null
                ? pathName + "/" + query
                : pathName.split("/").slice(0, -1).join("/") + "/" + query;
             */
          return (
            <div key={query}>
              <Link
                href={href}
                className={`text-xl uppercase ${
                  isTabSelected ? "text-dark-teal" : "text-black"
                }`}
              >
                {query}
              </Link>
              {isTabSelected ? (
                <hr className="w-full border border-solid border-dark-teal" />
              ) : null}
            </div>
          );
        })}
      </div>
      <hr style={{ border: "0.5px solid black", width: "100%" }} />
    </div>
  );
};

export default TabButtons;
