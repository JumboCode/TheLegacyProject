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

          const base = pathName.match(
            new RegExp(`.*?(?=${queries.map((q) => "/" + q).join("|")}|$)`)
          ) as RegExpExecArray;
          const href = `${base[0]}/${query}`;
          
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
