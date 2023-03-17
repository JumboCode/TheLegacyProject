import Image from "next/image";

type FileProps =  {
    name: string,
    URL: string,
    fileIcon: Image,
    lastModified: Date
};

const File = ({
    name,
    URL,
    fileIcon,
    lastModified
}: FileProps) => {
    return (
        <div className="flex flex-col text-left font-sans p-4 bg-off-white rounded-md aspect-square border hover:cursor-pointer hover:bg-taupe-hover">
            <div className="flex flex-row justify-items-end w-full font-semibold"> {name} 
                <Image className="" width={75} height={75} src={fileIcon} />
            </div>
            <span> {URL} </span>
            <span> {lastModified} </span>
        </div>
    );
}

export { FileProps };
export default File;