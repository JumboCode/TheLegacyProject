import type { NextPage } from "next";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import File, { FileProps, TagProps } from "@components/File";
import DropdownCopy, {
  SortDropdown,
  SortMethod,
} from "@components/dropdownCopy";
import SearchBar from "@components/SearchBar";

type SeniorFields = {
  id: string;
  name: string;
  location: string;
  description: string;
  studentIds: string[];
  folder: string;
  files: FileProps[];
};

const fileArr: FileProps[] = [
  {
    id: "1",
    name: "First Note",
    description: "My first note",
    lastModified: new Date(2023, 3, 7, 20, 34),
    url: "/url",
    tags: [
      { name: "Childhood", color: "bg-tag-rust" },
      { name: "Early career", color: "bg-tag-tan" },
      { name: "Adulthood", color: "bg-tag-sage" },
      { name: "Childhood", color: "bg-tag-rust" },
      { name: "Early career", color: "bg-tag-tan" },
      { name: "Adulthood", color: "bg-tag-sage" },
    ],
  },

  {
    id: "2",
    name: "Second Note",
    description: "My second note",
    lastModified: new Date(2024, 2, 31, 14, 52),
    url: "/url2",
    tags: [
      { name: "College", color: "bg-tag-rust" },
      { name: "Romance", color: "bg-tag-tan" },
    ],
  },
];

const SeniorProfile: NextPage = (initSeniorData: SeniorFields) => {
  const [fileData, setFileData] = useState<FileProps[]>(fileArr);
  const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");
  const [filter, setFilter] = useState("");

  const sortFunction: (a: FileProps, b: FileProps) => number = useMemo(
    () =>
      sortMethod === "By Name"
        ? ({ name: nameA }: FileProps, { name: nameB }: FileProps) =>
            nameA.localeCompare(nameB)
        : (
            { lastModified: dateA }: FileProps,
            { lastModified: dateB }: FileProps
          ) => +dateA - +dateB,
    [sortMethod]
  );

  const sortedFiles = useMemo(
    () => fileData.sort(sortFunction),
    [fileData, sortFunction]
  );

  const filteredFiles = useMemo(
    () =>
      sortedFiles.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      ),
    [sortedFiles, filter]
  );

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
        {filteredFiles.map(({ name, lastModified, url, tags }: FileProps) => (
          <div key={url}>
            <File
              name={name}
              lastModified={lastModified}
              url={url}
              tags={tags}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeniorProfile;
