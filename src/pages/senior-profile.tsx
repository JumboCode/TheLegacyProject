import type { NextPage } from "next";
import { useState } from "react";
import FileCard, { IFileCardProps } from "@components/FileCard";
import SortDropdown, { SortMethod } from "@components/SortDropdown";
import SearchBar from "@components/SearchBar";
import { File } from "@prisma/client";

type SeniorFields = {
  id: string;
  name: string;
  location: string;
  description: string;
  studentIds: string[];
  folder: string;
  files: File[];
};

const fileArr = [
  {
    id: "1",
    name: "First Note",
    description: "My first note",
    lastModified: new Date(2022, 3, 7, 20, 34),
    url: "/url",
    Tags: ["Childhood", "Early career", "Adulthood"],
  },
  {
    id: "3",
    name: "Third Note",
    description: "My second note",
    lastModified: new Date(2020, 2, 31, 14, 52),
    url: "/url3",
    Tags: ["College", "Romance"],
  },
  {
    id: "2",
    name: "Second Note",
    description: "My second note",
    lastModified: new Date(2024, 2, 31, 14, 52),
    url: "/url2",
    Tags: ["College", "Romance"],
  },
];

const SeniorProfile: NextPage = (initSeniorData: SeniorFields) => {
  const [fileData, setFileData] = useState<IFileCardProps[]>(fileArr);
  const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");
  const [filter, setFilter] = useState("");

  const sortFunction: (a: IFileCardProps, b: IFileCardProps) => number =
    sortMethod === "By Name"
      ? ({ name: nameA }: IFileCardProps, { name: nameB }: IFileCardProps) =>
          nameA.localeCompare(nameB)
      : sortMethod === "By Last Modified"
      ? (
          { lastModified: dateA }: IFileCardProps,
          { lastModified: dateB }: IFileCardProps
        ) => {
          return +dateA - +dateB;
        }
      : () => 0;

  const filteredFiles = fileData
    .sort(sortFunction)
    .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

  const seniorData = {
    id: "0",
    name: "Skylar Gilfeather",
    location: "Somerville",
    description: "She's your project manager!",
    studentIDs: ["1", "2", "3", "4"],
    folder: "FOLDERID",
    files: fileArr,
  };

  return (
    <div className="container flex min-h-screen flex-col p-8">
      <h1 className="text-teal mb-8 font-serif text-[3rem] leading-normal">
        {seniorData.name}
      </h1>
      <div className="flex flex-row justify-between space-x-3 align-middle">
        <SearchBar setFilter={setFilter} />
        <div className="relative z-10">
          <SortDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
        </div>
      </div>
      {/* styling for a TileGrid-like grid */}
      <div className="mt-7 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {filteredFiles.map(
          ({ name, lastModified, url, Tags }: IFileCardProps) => (
            <div key={url}>
              <FileCard
                name={name}
                lastModified={lastModified}
                url={url}
                Tags={Tags}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SeniorProfile;
