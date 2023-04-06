

type FileProps =  {
    id:           string,
    name:         string,
    description:  string,
    lastModified: Date,
    url:          string,
    tags:         string[],
};


const File = ({id, name, description, lastModified, url, tags}: FileProps) => {
    return (
        <div className="flex flex-col text-left font-sans p-4 bg-off-white rounded-md aspect-square border hover:cursor-pointer hover:bg-taupe-hover">
            <span> {name} </span>
            <span> {url} </span>
            <span> {lastModified} </span>
        </div>
    );
}

export { FileProps };
export default File;