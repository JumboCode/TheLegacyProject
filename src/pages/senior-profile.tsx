import type { NextPage } from "next";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

enum FileType {
  Document = "/doc.png",
  Pdf = "/pdf.png",
  Audio = "/mp3.png",
}

type fileProps = {
  id: number;   // unique ID for given FileGrid item
  name: string;
  URL: string;
  type: FileType;
  last_modified: Date;
};

const SearchBar = ({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <input
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900"
      type="text"
      placeholder="Search"
      onChange={handleChange}
    />
  );
};


/* AddFile
 * onClick, creates a new File component with given fileProps properties
 * TODO: popup component for user to select or create Google Drive file,
 *       which generates properties to fill fileProps
 */
const AddFile = ({
  setData,
}: {
  setData: React.Dispatch<SetStateAction<fileProps[]>>;
}) => {
  // TODO: onClick, generate popup, pull from drive, store info in backend,
  // and then addFile
  const addFile = () => {
    setData((data: fileProps[]) => [
      ...data,
      {
        id: data.length + 1,
        name: `new_file_${data.length + 1}.pdf`,    // unique new names
        type: FileType.Pdf,
        URL: "",
        last_modified: new Date(),
      },
    ]);
  };

  return (
    <button
      className="flex flex-col items-center justify-center border hover:cursor-pointer hover:bg-slate-500 hover:text-white"
      onClick={addFile}
    >
      <Image src="/plus.png" alt="icon" width={100} height={100} />
      <p>Add file</p>
    </button>
  );
};


/* FileGrid
 * a flexible grid of File components that represent files in a given Senior
 * profile. 
 */ 
const FileGrid: NextPage = () => {
  // function to create new sample files
  const [data, setData] = useState<fileProps[]>([
    {
      id: 1,
      name: "example_file5.mp3",
      type: FileType.Audio,
      URL: "",
      last_modified: new Date(),
    },
    {
      id: 2,
      name: "example_file6.pdf",
      type: FileType.Pdf,
      URL: "",
      last_modified: new Date(),
    },
    {
      id: 3,
      name: "example_file7.doc",
      type: FileType.Document,
      URL: "",
      last_modified: new Date(),
    },
    {
      id: 4,
      name: "example_file8.mp3",
      type: FileType.Audio,
      URL: "",
      last_modified: new Date(),
    },
  ]);

  const [filter, setFilter] = useState("");

  const filteredData = useMemo(
    () => data.filter(({ name }) => name.includes(filter)),
    [data, filter]
  );

  // TODO: edit button somewhere near grid to modify and / or delete Files
  return (
    <main className="container flex min-h-screen flex-col p-4">
      <h1 className="text-[3rem] leading-normal text-gray-700">File Grid</h1>
      <SearchBar setFilter={setFilter} />
      <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4">
        <AddFile setData={setData} />
        {filteredData.map(
          ({ id, name, URL, type, last_modified }: fileProps) => (
            <File
              id={id}
              key={id}
              name={name}
              URL={URL}
              type={type}
              last_modified={last_modified}
            />
          )
        )}
      </div>
    </main>
  );
};

export default FileGrid;

const File = ({ name, URL, type, last_modified }: fileProps) => {
  const formattedDate: () => string = () => {
    const dateStr = `Last modified on ${last_modified.toDateString()} at ${last_modified.toTimeString()}`;
    return dateStr.substring(0, dateStr.indexOf("G"));
  };

  // TODO: onHover outline effect, onDoubleClick to open file in GoogleDrive
  return (
    <section className="flex flex-col justify-center rounded border p-3">
      <Image
        className="h-10 object-scale-down"
        width={75}
        height={75}
        src={type}
        alt="file icon"
      ></Image>
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{type}</p>
      <p className="text-sm text-gray-600">{formattedDate()}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={URL}
      >
        Link
      </a>
    </section>
  );
};
