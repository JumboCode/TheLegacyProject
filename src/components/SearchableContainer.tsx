import SearchBar from "./SearchBar";
import { useState } from "react";

interface SearchableContainerProps<T> {
  addElementComponent?: React.ReactNode;
  display: (elem: T) => React.ReactNode;
  elements: T[];
  search?: ((elem: T, filter: string) => boolean) | null;
}

const SearchableContainer = <T,>({
  addElementComponent,
  display,
  elements,
  search = null,
}: SearchableContainerProps<T>) => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      {search && (
        <div className="z-10 flex flex-row justify-between space-x-3 align-middle">
          <SearchBar setFilter={setFilter} />
        </div>
      )}
      <div className=" mx-8 mt-6 grid grid-cols-2 gap-12 pr-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {addElementComponent && addElementComponent}
        {elements
          .filter((e) => {
            if (search === null) return true; // No search method provided
            return search(e, filter);
          })
          .map((e) => display(e))}
      </div>
    </div>
  );
};

export default SearchableContainer;
