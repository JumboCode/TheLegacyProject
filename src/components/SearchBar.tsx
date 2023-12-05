import { useCallback, useState } from "react";

export interface ISearchBarProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setFilter }: ISearchBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
      setFilter(e.target.value);
    },
    [setFilter]
  );

  return (
    <input
      className="\  h-[40px] w-full  rounded-lg bg-white p-2.5 text-base placeholder-light-gray  focus:outline-none"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
}
