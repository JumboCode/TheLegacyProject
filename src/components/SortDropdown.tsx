import cn from "classnames";
import { useState } from "react";

const SortIcon = () => (
  <svg
    height="24"
    width="24"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 36h12v-4h-12v4zm0-24v4h36v-4h-36zm0 14h24v-4h-24v4z" />
    <path d="M0 0h48v48h-48z" fill="none" />
  </svg>
);

export type SortMethod = "By Name" | "By Last Modified";

export interface ISortDropdownProps {
  sortMethod: SortMethod;
  setSortMethod: React.Dispatch<React.SetStateAction<SortMethod>>;
}

export default function SortDropdown({
  sortMethod,
  setSortMethod,
}: ISortDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-dark-gray-500 relative flex h-full flex-row rounded-lg border border-gray-300 bg-gray-50 px-5 pb-3 pt-4"
        onClick={() => setOpen(!open)}
      >
        <SortIcon />
        <p className="pl-2">Sort</p>
      </button>
      {open && (
        <div className="absolute right-0 top-16 flex w-max flex-col overflow-hidden rounded-lg border border-gray-300">
          {(["By Name", "By Last Modified"] as SortMethod[]).map((method) => (
            <button
              key={method}
              onClick={() => {
                setOpen(false);
                setSortMethod(method);
              }}
              className={cn(
                method === sortMethod ? "bg-light-sage" : "bg-gray-50",
                "px-5 pb-3 pt-4 text-left"
              )}
            >
              {method}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}