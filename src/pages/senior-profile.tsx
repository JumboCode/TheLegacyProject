import type { NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import File, { FileProps } from "@components/File"

const SearchBar = ({
  data,
  setData
}:{
  data: FileProps[],
  setData: Dispatch<SetStateAction<FileProps[]>>
}) => {

  const [searchInput, setSearchInput] = useState("");
  const originalData = useRef(data);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    if (searchInput.length === 0) {
      setData(originalData.current);
    } else if (searchInput.length > 0){
      //function to filter files
      const filteredData = originalData.current.filter(x => {
        return x.name.includes(searchInput);
      });
      setData(filteredData);
      //data.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  };
    
  return (
    <input className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
           type="text" placeholder="Search" onChange={handleChange} value={searchInput} />
  );
}


const SeniorProfile: NextPage = () => {

    // TODO: replace with initial data for senior on load
    // should be initialized with single addTile
    const testArr: FileProps[] = [{name: 'First Note', url: '/url', fileIcon: undefined, lastModified: Date()},
                                  {name: 'Second Note', url: '/url', fileIcon: undefined, lastModified: Date()},];
    // TODO: resolve fileIcons images

    const [ fileData, setFileData ] = useState<FileProps[]>(testArr);

    return (
    <div className="container flex min-h-screen flex-col p-4">
        <h1 className="text-[3rem] font-serif text-teal leading-normal"> File Grid</h1>
        <SearchBar data={fileData as FileProps[]} setData={setFileData}/>

        {/* styling for a TileGrid-like grid */}
        <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4">
            {fileData.map((file) => (
                    <div> {File(file)}</div>) )
            }
        </div>
      </div>
    );
}

export default SeniorProfile;