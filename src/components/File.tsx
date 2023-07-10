

type FileProps =  {
    id:           string,
    name:         string,
    description:  string,
    lastModified: Date | string,
    url:          string,
    tags:         string[],
};


const File = ({id, name, description, lastModified, url, tags}: FileProps) => {
    return (
        <div className="flex flex-col text-left font-sans p-4 bg-off-white rounded-md aspect-square border hover:cursor-pointer hover:bg-tan-hover">
            <span> {name} </span>
            <span> {url} </span>
            <span> {lastModified.toString()} </span>
        </div>
    );
}

export type { FileProps };
export default File;
