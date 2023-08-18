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
      className="block w-full rounded border-2 border-tan bg-off-white p-4 pl-6 text-md focus:outline-none focus:border-dark-sage"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
}
