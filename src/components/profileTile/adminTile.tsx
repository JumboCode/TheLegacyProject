import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type AdminTileData = {
  name: string;
};

const AdminTile = ({ name }: AdminTileData) => {
  return (
    <div className="w-64">
      <section className="h-64 rounded bg-white p-4 drop-shadow-md">
        <div className="flex h-full flex-col items-center justify-center">
          <a href="add-student.html"><div className="h-20 w-20 overflow-hidden rounded-full">
            <Image
              className="object-scale-down"
              src={"/student_home/profile_photo_pic.jpeg"}
              alt="Placeholder profile image"
              height={80}
              width={80}
            ></Image>
          </div></a>
          <br></br>
          <p className="text-base font-medium text-gray-700">{name}</p>
        </div>
      </section>
    </div>
  );
};

const AdminGridSenior = () => {
  const [data, setData] = useState<AdminTileData[]>([
    { name: "Add Student",},
  ]);

  return (
    <main className="mx-auto flex min-h-fit w-full flex-col px-3 pb-9 md:px-5 lg:px-9">
      <div className="mt-5 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {/* Grid styling submitted in PR */}
        {/* <div className="grid gap-10 pt-3 text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-evenly"> */}

        {/* Flex styling workaround */}
        {/* <div className="lg:px-9 md:px-5 px-3 flex justify-self-center flex-wrap gap-6"> */}

        {data.map(({ name}: AdminTileData) => (
          <AdminTile
            key={name}
            name={name}
          />
        ))}
      </div>
    </main>
  );
};

export default AdminGridSenior;
