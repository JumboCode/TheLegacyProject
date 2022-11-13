import type { NextPage } from "next";
import Head from "next/head";
import { format } from "date-fns";
import { date } from "zod";
//import pdf from './icons/icon_pdf.png';

enum FileType {
  Document = "https://freeiconshop.com/wp-content/uploads/edd/doc-outline.png",
  Pdf = "https://parkcam.com.tr/wp-content/uploads/2021/12/pdf_icon.jpg",
  //Pdf = "./icons/icon_pdf.png",
  Audio = "https://ecdn.teacherspayteachers.com/thumbitem/Demo-recording-The-Orffin-Blues--8080847-1657611393/original-8080847-1.jpg"
}

type fileProps =  {
    name: string
    URL: string
    type: FileType
    last_modified: Date
};

const FileGrid: NextPage = () => {
  
    return (
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            File Grid
            </h1>
            <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3">
          <File
            name="example_file.pdf"
            type = {FileType.Pdf}
            last_modified = {new Date(5)}
            URL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
          <File
            name="example_file1.pdf"
            type = {FileType.Audio}
            last_modified = {new Date(5)}
            URL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
          <File
            name="example_file2.pdf"
            type = {FileType.Document}
            last_modified = {new Date(5)}
            URL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
          <File
            name="example_file3.pdf"
            type = {FileType.Audio}
            last_modified = {new Date(5)}
            URL="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />

          </div>
        </main>
    );
}

export default FileGrid;

const File = ({
    name, 
    URL,
    type,
    last_modified,
}: fileProps) => {
  const formattedDate: () => String = () => {
    let dateStr = `Last modified on ${last_modified.toDateString()} at ${last_modified.toTimeString()}`;
    return dateStr.substring(0, dateStr.indexOf("G"));
  }


  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
    <h2 className="text-lg text-gray-700">{name}</h2>
    {/* <p className="text-sm text-gray-600">{type}</p> */}
    <p className="text-sm text-gray-600">{formattedDate()}</p>
    <a
      className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
      href={URL}
    >
      Link
    </a>
    <img className ="object-scale-down h-10" src={type}></img> 
    
  </section>
  );
};
