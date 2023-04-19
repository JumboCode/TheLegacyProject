import cn from "classnames";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type DropdownProps = {
  items: string[];
  bgColor: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

type ItemProps = {
  text: string;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  selected?: boolean;
  bgColor: string;
};

type SortProps = {
  text: string;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
};

function Sort({ text, onClick }: SortProps) {
  return (
    <button className="text-dark-gray-500 cursor-pointer rounded bg-off-white px-5 py-3">
      {text}
    </button>
  );
}

function Item({ text, onClick, selected, bgColor }: ItemProps) {
  const [styles, setStyles] = useState<string>("");

  useEffect(() => {
    setStyles(
      `px-5 py-3 text-dark-gray-500 cursor-pointer whitespace-nowrap ${
        selected ? `text-dark-gray-500` : ""
      }`
    );
  });

  return (
    <div className={styles} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}

export default function DropdownCopy({
  items,
  bgColor,
  selected,
  setSelected,
}: DropdownProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    // <div className= "h-full border-2 border-red-500 relative">
    <div
      className="relative h-full rounded bg-white"
      onClick={() => setOpen(!open)}
    >
      <Sort text="Sort" onClick={() => setOpen(!open)} />
      <div className="absolute -right-0.5 top-16 rounded">
        {open &&
          items.map((item: string, i: number) => (
            <div key={i} className="rounded bg-white">
              <Item
                text={item}
                onClick={() => setSelected(items[i] || "")} //figure out setSelected?
                bgColor={bgColor}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

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

export function SortDropdown({
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
              onClick={() => setSortMethod(method)}
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
