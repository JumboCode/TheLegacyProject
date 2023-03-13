
type tileData =  {
    name: string
    location: string
    picture: typeof Image
};

const SeniorGrid = () => {

        //function to create new files
          const [ data, setData ] = useState<seniorProfiles[]>([
            {name: "Jo", location: "Somerville, MA", picture: ""},
          ]);
          //useEffect(() => {
         //   setData();
         // }, []) 
      
          return (
              <main className="container flex min-h-screen flex-col p-4">
                <h1 className="text-[3rem] leading-normal text-gray-700">File Grid</h1>
                
                <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-4 space-evenly">
                  <ProfileTile data={data} setData={setData}/>
                 
                 {data.map(({ name, URL, type, last_modified}: fileProps) =>
                    <File key={name} name={name} URL={URL} type={type} last_modified={last_modified}/>)}
                 
                </div>
              </main>
          );
      }

export default SeniorGrid;