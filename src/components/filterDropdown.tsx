import { Dispatch, SetStateAction, useMemo, useState } from "react";

function Check(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      {...props}
      className="mr-2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type Named = { name: string | null }

type FilterDropdownProps<T extends Named> = {
  items: T[];
  filterMatch: (a: T, b: string) => boolean;
  display: (a: T) => JSX.Element;
  selectedItems: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
};

export default function FilterDropdown<T extends Named>({
  items,
  filterMatch,
  display,
  selectedItems,
  setSelectedItems
}: FilterDropdownProps<T>) {

  const [filterText, setFilterText] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const filteredItems = useMemo(
    () => items.filter((i) => filterMatch(i, filterText)), 
    [filterText]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const onItemSelect = (idx: number, item: T) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i != item));
    }
  }

  return (
    <>
      <div className="bg-red flex w-full flex-col">
        <input
          onChange={onChange}
          className="h-[46px] w-full mb-2 px-3 border-2 border-legacy-tan focus:outline-none rounded"
          onFocus={() => setShowOptions(true)}
          onClick={() => setShowOptions(true)}
        />
        {showOptions && (
          <div
            className="relative w-full"
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
          >
            <div className="top-100 absolute z-50 flex max-h-[150px] w-full flex-col overflow-y-auto \
                            bg-white">
              {filteredItems.map((item: T, index: number) => (
                <span
                  className="flex flex-row pl-2 py-2 text-gray-700 items-center border border-light-gray \
                            hover:cursor-pointer hover:bg-legacy-teal hover:text-white"
                  onClick={() => {
                    onItemSelect(index, item);
                  }}
                  key={index}
                >
                  {selectedItems.includes(item) && <Check />}
                  {item.name ?? ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap my-2">
        {selectedItems.map((item: T, i: number) => (
          <div key={i}>
            {display(item)}
          </div>
        ))}
      </div>
    </>
  );
}
