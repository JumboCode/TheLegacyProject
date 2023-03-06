import type { NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TileGrid from "@components/TileGrid"


type FileProps =  {
    name: string,
    URL: string,
    test: int,
    fileIcon: Image,
    lastModified: Date
};

const File = ({
    name,
    URL,
    test,
    fileIcon,
    lastModified
}: FileProps) => {
    return (
        <div className="bg-slate-200">
            <span> {name} </span>
            <span> {URL} </span>
            <span> {test} </span>
            <span> {fileIcon} </span>
            <span> {lastModified} </span>
        </div>
    );
}

const SearchBar = ({
  data,
  setData
}:{
  data: FileProps[],
  setData: Dispatch<SetStateAction<FileProps[]>>
}) => {

  const [searchInput, setSearchInput] = useState("");
  const originalData = useRef(data);
  //search files by name only
  //const [searchParam] = useState(["name"]);

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
    const docIcon = "/icons/icon_doc.png";
    const pdfIcon = "/icons/icon_pdf.png";
    const audioIcon = "/icons/icon_audio.png";

    // TODO: replace with initial data for senior on load
    // should be initialized with single addTile
    const testArr: FileProps[] = [{name: 'Note_A', url: '/url', fileIcon: docIcon, lastModified: Date()},
                                  {name: 'Note_B', url: '/url', fileIcon: pdfIcon, lastModified: Date()},];

    const emptyFile = {name: '', url: '', fileIcon: null, last_modified: null };
    const [ fileData, setFileData ] = useState<FileProps[]>(testArr);

    return (
        <div className="container flex min-h-screen flex-col p-4">
        <h1 className="text-[3rem] leading-normal text-gray-700">File Grid</h1>
        <SearchBar data={fileData as FileProps[]} setData={setFileData}/>
        <TileGrid<FileProps> tileData={testArr} setTileData={setFileData} createTile={File}/>
      </div>
    );
}

export default SeniorProfile;