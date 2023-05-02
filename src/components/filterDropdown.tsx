import { useMemo, useState } from "react";

function Check(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
      className="mr-2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type FilterDropdownProps = {
  items: string[];
  selectedItems: string[];
  onItemSelect: (idx: number, item: string) => void;
};

export default function FilterDropdown({
  items,
  selectedItems,
  onItemSelect,
}: FilterDropdownProps) {
  const [filterText, setFilterText] = useState("");
  const filteredItems = useMemo(
    () => items.filter((tag) => tag.indexOf(filterText) != -1),
    [filterText]
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="bg-red flex w-full flex-col">
      <input
        onChange={onChange}
        className="mt-5 h-[46px] w-full border-[0.3px] border-[#e6e6e6] px-3 focus:outline-none"
        onFocus={() => setShowOptions(true)}
        onClick={() => setShowOptions(true)}
      />
      {showOptions && (
        <div
          className="relative w-full"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <div className="top-100 absolute z-50 flex max-h-[150px] w-full flex-col overflow-y-auto bg-white">
            {filteredItems.map((item: string, index: number) => (
              <span
                className="flex flex-row border border-[#e6e6e6] px-3 py-1 text-gray-700 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  onItemSelect(index, item);
                }}
                key={index}
              >
                {selectedItems.includes(item) && <Check />}
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
