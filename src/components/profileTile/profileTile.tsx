import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type tileData =  {
        name: string
        location: string
        picture: string
};

const ProfileTile = ({ name, location, picture }: tileData) => {
        return (
        <div className="lg:px-9 md:px-5 px-3">
          <section className="w-64 h-64 p-4 rounded bg-white drop-shadow-md">
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image className="object-scale-down" src={'/student_home/andrewbojangles.png'} alt="Placeholder profile image" height={80} width={80}></Image>
              </div>
              <br></br>
              <p className="text-base text-gray-700 font-medium">{name}</p>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="text-xs text-gray-600">{location}</p>
            </div>
          </section>
      </div>
      );
};

const SeniorGrid = () => {

  //function to create new files
    const [ data, setData ] = useState<tileData[]>([
      {name: "Jo", location: "Somerville, MA", picture: ""},
      {name: "JoJo", location: "Somerville, MA", picture: ""},
      {name: "Joe", location: "Somerville, MA", picture: ""},
      {name: "Joe", location: "Somerville, MA", picture: ""},
      {name: "Joe", location: "Somerville, MA", picture: ""},
    ]);
    //useEffect(() => {
   //   setData();
   // }, []) 

    return (
        <main className="container flex min-h-screen flex-col border border-red-500">
          <div className="mt-5 grid gap-10 pt-3 text-center grid-cols-4 space-evenly">
           
           {data.map(({ name, location, picture }: tileData) =>
              <ProfileTile key={name} name={name} location={location} picture={picture} />)}
           
          </div>
        </main>
    );
}

export default SeniorGrid;