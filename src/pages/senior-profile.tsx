import type { NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import File, { FileProps } from "@components/File";

type SeniorFields = {
  id: string;
  name: string;
  location: string;
  description: string;
  studentIds: string[];
  folder: string;
  files: string[];
};

export { SeniorFields };

const SearchBar = ({
  data,
  setData,
}: {
  data: FileProps[];
  setData: Dispatch<SetStateAction<FileProps[]>>;
}) => {
  const [searchInput, setSearchInput] = useState("");
  const originalData = useRef(data);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (searchInput.length === 0) {
      setData(originalData.current);
    } else if (searchInput.length > 0) {
      //function to filter files
      const filteredData = originalData.current.filter((x) => {
        return x.name.includes(searchInput);
      });
      setData(filteredData);
      //data.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  };

  return (
    <input
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900"
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
    />
  );
};

const SeniorProfile: NextPage = (initSeniorData: SeniorFields) => {
  const fileArr: FileProps[] = [
    {
      id: "1",
      name: "First Note",
      description: "My first note",
      lastModified: Date(),
      url: "/url",
      tags: ["Childhood", "Early career"],
    },

    {
      id: "2",
      name: "Second Note",
      description: "My second note",
      lastModified: Date(),
      url: "/url2",
      tags: ["College", "Romance"],
    },
  ];

  // initSeniorData will be set by passed-in prop; here's a temporary one
  // to use for this ticket

  initSeniorData = {
    id: "0",
    name: "Skylar Gilfeather",
    location: "Somerville",
    description: "She's your project manager!",
    studentIDs: ["1", "2", "3", "4"],
    folder: "FOLDERID",
    files: fileArr,
  };

  const [fileData, setFileData] = useState<FileProps[]>(fileArr);
  const [seniorData, setSeniorData] = useState<SeniorFields>(initSeniorData);

  return (
    <div className="container flex min-h-screen flex-col p-4">
      <h1 className="text-teal font-serif text-[3rem] leading-normal">
        {" "}
        File Grid
      </h1>
      <SearchBar data={fileData as FileProps[]} setData={setFileData} />

      {/* styling for a TileGrid-like grid */}
      <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4">
        {fileData.map((file) => (
          <div> {file /* File component here! */} </div>
        ))}
      </div>
    </div>
  );
};

export default SeniorProfile;
