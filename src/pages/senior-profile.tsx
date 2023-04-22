import type { NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import File, { FileProps } from "@components/File"
import AddFile from "@components/AddFile";


export type SeniorFields = { 
    id:          string,
    name:        string,
    location:    string,
    description: string,
    studentIds:  string [],
    folder:      string,
    files:       FileProps [],
}

const SearchBar = ({
  data,
  setData
}:{
  data: FileProps[],
  setData: Dispatch<SetStateAction<FileProps[]>>
}) => {

  const [searchInput, setSearchInput] = useState(""); const originalData = useRef(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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


const SeniorProfile: NextPage<SeniorFields> = (initSeniorData) => {

    const fileArr: FileProps[] = [{id: "1", name: "First Note", 
                                   description: "My first note", 
                                  // hydration error if changed to Date()
                                  // placeholder below until uniformly formatted Date to prevent error
                                   lastModified: "Fri Apr 07 2023 22:02:31 GMT-0400 (Eastern Daylight Time)", 
                                   url: '/url',
                                   tags: ["Childhood", "Early career"]},

                                   {id: "2", name: "Second Note", 
                                   description: "My second note", 
                                   // hydration error if changed to Date()
                                   // placeholder below until uniformly formatted Date to prevent error
                                   lastModified: "Fri Apr 07 2023 22:02:31 GMT-0400 (Eastern Daylight Time)", 
                                   url: '/url2',
                                   tags: ["College", "Romance"] }];
                                  
    // initSeniorData will be set by passed-in prop; here's a temporary one
    // to use for this ticket

    initSeniorData = { id: "0", 
                       name: "Skylar Gilfeather",
                       location: "Somerville",
                       description: "She's your project manager!",
                       studentIds: ["1", "2", "3", "4"],
                       folder: "FOLDERID",
                       files: fileArr };
    
    const [ fileData, setFileData ] = useState<FileProps[]>(fileArr);
    const [ seniorData, setSeniorData ] = useState<SeniorFields>(initSeniorData);
    const [ showAddFilePopUp, setShowAddFilePopUp ] = useState<boolean>(false);
    
    const handlePopUp = () => {
      setShowAddFilePopUp(!showAddFilePopUp);
    }

    return (
    <div className="container relative flex w-screen h-screen flex-col">
        { showAddFilePopUp ? <AddFile showAddFilePopUp={showAddFilePopUp} setShowAddFilePopUp={setShowAddFilePopUp} /> : null }

        <div className="w-full h-full p-4">
          <h1 className="text-[3rem] font-serif text-teal leading-normal"> File Grid</h1>
          <SearchBar data={fileData as FileProps[]} setData={setFileData}/>

          {/* styling for a TileGrid-like grid */}
          <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4">
              <button className="flex flex-col text-left font-sans p-4 bg-off-white rounded-md aspect-square border hover:cursor-pointer hover:bg-taupe-hover justify-center items-center" 
                onClick={handlePopUp}
              >
                Add File
              </button>
              {fileData.map(
                  // file component replaces File
                  (file, i) => (
                    <File key={i}
                      id={file.id}
                      name={file.name}
                      description={file.description}
                      lastModified={file.lastModified}
                      url={file.url}
                      tags={file.tags}
                    />
                  ))}
          </div>
        </div>
        {/* <button onClick={() => fetch("/api/drive/addfile")}>Upload to Folder</button> */}
      </div>
    );
}

export default SeniorProfile;
