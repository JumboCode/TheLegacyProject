<<<<<<< HEAD
import { useState } from "react";
import SearchBar from "@components/SearchBar";

=======
>>>>>>> parent of c2fc37b (better tile grid spacing)
interface ITileGridProps {
  children: React.ReactNode;
}

export default function TileGrid({ children }: ITileGridProps) {
<<<<<<< HEAD
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
=======
  return (
    <div className="bg-indigo-600 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-auto text-center">
        {children}
    </div>
    // <div className="flex flex-col w-full min-w-fit">
    //   <div className="grid grid-cols-[repeat(auto-fill,_256px)] sm:gap-8 md:gap-10 text-center">
    //     {children}
    //   </div>
    // </div>
  );
}
>>>>>>> parent of c2fc37b (better tile grid spacing)
