import Image from "next/image";

type FileProps =  {
    name: string,
    URL: string,
    fileType: string,
    lastModified: Date
};

const File = ({
    name,
    URL,
    fileType,
    lastModified
}: FileProps) => {
    return (
        <div className="flex flex-col text-left font-sans p-4 bg-off-white rounded-md aspect-square border hover:cursor-pointer hover:bg-taupe-hover">
            <span> {fileType} </span>
            <span> {URL} </span>
            <span> {lastModified} </span>
        </div>
    );
}

export { FileProps };
export default File;