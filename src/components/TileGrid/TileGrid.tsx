import { useState } from "react";
import SearchBar from "@components/SearchBar";

interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
  const [filter, setFilter] = useState("");
  return (
    <>
      <div className="my-6">
        <SearchBar setFilter={setFilter} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {children}
      </div>
    </>
  );
}