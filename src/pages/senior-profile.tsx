import type { NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import File, { FileProps, TagProps } from "@components/File";
import DropdownCopy from "@components/dropdownCopy"

type SeniorFields = {
  id: string;
  name: string;
  location: string;
  description: string;
  studentIds: string[];
  folder: string;
  files: FileProps[];
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
      lastModified: new Date(2023, 3, 7, 20, 34),
      url: "/url",
      tags: [
        {name: "Childhood", color: "bg-tag-rust"},
        {name: "Early career", color: "bg-tag-tan"},
        {name: "Adulthood", color: "bg-tag-sage"},
      ],
    },

    {
      id: "2",
      name: "Second Note",
      description: "My second note",
      lastModified: new Date(2023, 2, 31, 14, 52),
      url: "/url2",
      tags: [
        {name: "College", color: "bg-tag-rust"},
        {name: "Romance", color: "bg-tag-tan"},
      ],
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
    <div className="container flex min-h-screen flex-col p-8">
      <h1 className="text-teal font-serif text-[3rem] leading-normal mb-8">
        {" "}
        {seniorData.name}
      </h1>
      <div className="flex flex-row">
        <SearchBar data={fileData as FileProps[]} setData={setFileData} />
        {/* <DropdownCopy items={["By Name", "By Last Modified"]} bgColor="red" selected="Sortttt" setSelected={Dispatch<SetStateAction<string>>}/> */}
      </div>
      {/* styling for a TileGrid-like grid */}
      <div className="mt-7 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {fileData.map(({name, lastModified, url, tags}: FileProps) => (
          <div> 
            <File name={name} lastModified={lastModified} url={url} tags={tags}/> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeniorProfile;
