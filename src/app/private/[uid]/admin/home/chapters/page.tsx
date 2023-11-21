"use client";

import SearchBar from "@components/SearchBar";
import { useState } from "react";

const AdminChaptersPage = () => {
  const [filter, setFilter] = useState("");

  return (
    <div className="mb-6 mt-6 flex gap-2.5">
      <SearchBar setFilter={setFilter} />
    </div>
  );
};

export default AdminChaptersPage;
