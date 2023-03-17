import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type TileData = {
  name: string;
  location: string;
  picture: string;
};

const ProfileTile = ({ name, location, picture }: TileData) => {
  return (
    <div className="w-64">
      <section className="h-64 p-4 rounded bg-white drop-shadow-md">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              className="object-scale-down"
              src={"/student_home/andrewbojangles.png"}
              alt="Placeholder profile image"
              height={80}
              width={80}
            ></Image>
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
  const [data, setData] = useState<TileData[]>([
    { name: "Jo", location: "Somerville, MA", picture: "" },
    { name: "JoJo", location: "Somerville, MA", picture: "" },
    { name: "Joe", location: "Somerville, MA", picture: "" },
    { name: "Joseph", location: "Somerville, MA", picture: "" },
    { name: "Jô", location: "Somerville, MA", picture: "" },
    { name: "Jonathan", location: "Somerville, MA", picture: "" },
    { name: "João", location: "Somerville, MA", picture: "" },
    { name: "Bojangles", location: "Somerville, MA", picture: "" },
  ]);

  return (
    <main className="lg:px-9 md:px-5 px-3 flex min-h-fit pb-9 flex-col w-full mx-auto">
          <div className="mt-5 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">

          { /* Grid styling submitted in PR */}
          {/* <div className="grid gap-10 pt-3 text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-evenly"> */}

          {/* Flex styling workaround */}
          {/* <div className="lg:px-9 md:px-5 px-3 flex justify-self-center flex-wrap gap-6"> */}

          {data.map(({ name, location, picture }: TileData) => (
            <ProfileTile key={name} name={name} location={location} picture={picture} />
          ))}
      </div>
    </main>
  );
};

export default SeniorGrid;