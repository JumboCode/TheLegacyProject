import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { Approval } from "@prisma/client";

type ITileProps = Awaited<ReturnType<typeof getServerSideProps>>["props"] & {redirect: undefined}

type TileData = {
  name: string;
  location: string;
  picture: string;
};

const ProfileTile = ({ name, location, picture }: TileData, { students }: ITileProps) => {
  return (
    <div className="w-64">
      <section className="h-64 rounded bg-white p-4 drop-shadow-md">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <Image
              className="object-scale-down"
              src={"/student_home/andrewbojangles.png"}
              alt="Placeholder profile image"
              height={80}
              width={80}
            ></Image>
          </div>
          <br></br>
          <p className="text-base font-medium text-gray-700">{name}</p>
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
    <main className="mx-auto flex min-h-fit w-full flex-col px-3 pb-9 md:px-5 lg:px-9">
      <div className="mt-5 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {/* Grid styling submitted in PR */}
        {/* <div className="grid gap-20 pt-3 text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"> */}

        {/* Flex styling workaround */}
        {/* <div className="lg:px-9 md:px-5 px-3 flex justify-self-center flex-wrap gap-6"></div> */}

        {data.map(({ name, location, picture }: TileData) => (
          <ProfileTile
            key={name}
            name={name}
            location={location}
            picture={picture}
          />
        ))}
        </div>
      {/* </div> */}
    </main>
  );
};

export default SeniorGrid;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const session = await getServerAuthSession(context);

//   if (!session || !session.user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   if (!prisma) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: session.user.id,
//     },
//   });

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   if (user.approved === Approval.PENDING) {
//     return {
//       redirect: {
//         destination: "/pending",
//         permanent: false,
//       },
//     };
//   }

//   const students = await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       image: true,
//     }
//   })

//   //console.log(students);

//   return {
//     props: {
//       students
//     },
//   };
// }; 

