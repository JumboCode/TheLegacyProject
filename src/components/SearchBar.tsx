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
      className="h-[40px] w-full border border-darker-tan bg-off-white p-4 pl-6 text-sm focus:outline-none \
                focus:border-2 focus:border-dark-sage/50"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
}
