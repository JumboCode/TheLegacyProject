import Image from "next/image";
import type { GetServerSidePropsContext } from "next";
import { useState } from "react";
import FileCard from "@components/FileCard";
import SearchBar from "@components/SearchBar";
import AddFile from "@components/AddFile";
import SortDropdown, { SortMethod } from "@components/SortDropdown";

import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { z } from "zod";
import { Approval } from "@prisma/client";

type ISeniorProfileProps = Awaited<
  ReturnType<typeof getServerSideProps>
>["props"] & {
  redirect: undefined;
};

type SerialzedFile = ISeniorProfileProps["senior"]["Files"][number];

const SeniorProfile = ({ senior }: ISeniorProfileProps) => {
  const [files, setFiles] = useState(senior.Files);
  const [sortMethod, setSortMethod] = useState<SortMethod>("By Name");
  const [filter, setFilter] = useState("");
  const [showAddFilePopUp, setShowAddFilePopUp] = useState<boolean>(false);

  const sortFunction =
    sortMethod === "By Name"
      ? ({ name: nameA }: SerialzedFile, { name: nameB }: SerialzedFile) =>
          nameA.localeCompare(nameB)
      : sortMethod === "By Last Modified"
      ? (
          { lastModified: dateA }: SerialzedFile,
          { lastModified: dateB }: SerialzedFile
        ) => {
          return +dateA - +dateB;
        }
      : () => 0;

  const filteredFiles = files
    .sort(sortFunction)
    .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

  const handlePopUp = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      {showAddFilePopUp ? (
        <AddFile
          showAddFilePopUp={showAddFilePopUp}
          setShowAddFilePopUp={setShowAddFilePopUp}
          seniorId={senior.id}
          folder={senior.folder}
        />
      ) : null}
      <div className="w-full p-8">
        <h1 className="font-serif text-5xl leading-normal sm:text-center md:text-left mb-4">
          {senior.name}
          <h2 className="font-serif text-xl"> {senior.location} </h2>
        </h1>
        <div className="w-full mb-8 border-solid bg-nav-taupe drop-shadow-md">
          <p className="rounded bg-nav-taupe p-4 max-h-[100px] sm:text-lg md:text-md overflow-scroll">
          {senior.description} 
          </p>
        </div>
        <div className="flex flex-row justify-between space-x-3 align-middle">
          <SearchBar setFilter={setFilter} />
          <div className="relative z-10">
            <SortDropdown
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          </div>
        </div>

        {/* <div className="z-10 mt-7 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center"> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-center mt-6">

        <button className="relative w-auto flex flex-col aspect-square justify-center items-center rounded \ 
                           bg-white hover:bg-off-white text-base drop-shadow-md"
                onClick={handlePopUp}>
          <div className="flex flex-col justify-end">
            <Image
              className="object-scale-down"
              src={"/profile/addfile_icon.png"}
              alt="Add file icon"
              height={75}
              width={75}
            />
          </div>
          <div className="relative w-full p-2 flex flex-col text-center text-lg text-neutral-800">
            Create New File
          </div>
        </button>
          {filteredFiles.map(({ id, name, lastModified, url, Tags }, key) => (
            <div key={key}>
              <FileCard
                id={id}
                name={name}
                lastModified={new Date(lastModified)}
                url={url}
                Tags={Tags}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeniorProfile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);

  const seniorId = z.string().parse(context.query.id);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (!prisma) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (user.approved === Approval.PENDING) {
    return {
      redirect: {
        destination: "/pending",
        permanent: false,
      },
    };
  }

  // await fetch ("/api/senior/" + seniorId, { method: "GET" });
  // TODO: not using our beautiful API routes??
  const senior = await prisma.senior.findUnique({
    where: {
      id: seniorId, //get all information for given senior
    },
    include: {
      Files: true,
    },
  });

  if (
    !senior ||
    (!user.admin && !senior.StudentIDs.includes(session.user.id))
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      senior: {
        ...senior,
        Files: senior.Files.map((file) => ({
          ...file,
          lastModified: file.lastModified.getTime(),
        })),
      },
    },
  };
};
