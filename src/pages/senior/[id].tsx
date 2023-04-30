import type { GetServerSidePropsContext } from "next";
import { useState } from "react";
import FileCard from "@components/FileCard";
import SortDropdown, { SortMethod } from "@components/SortDropdown";
import SearchBar from "@components/SearchBar";
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

  return (
    <div className="container flex min-h-screen flex-col p-8">
      <h1 className="text-teal mb-8 font-serif text-[3rem] leading-normal">
        {senior.name}
      </h1>
      <div className="flex flex-row justify-between space-x-3 align-middle">
        <SearchBar setFilter={setFilter} />
        <div className="relative z-10">
          <SortDropdown sortMethod={sortMethod} setSortMethod={setSortMethod} />
        </div>
      </div>
      {/* styling for a TileGrid-like grid */}
      <div className="mt-7 grid grid-cols-[repeat(auto-fill,_256px)] gap-10 text-center">
        {filteredFiles.map(({ name, lastModified, url, Tags }) => (
          <div key={url}>
            <FileCard
              name={name}
              lastModified={new Date(lastModified)}
              url={url}
              Tags={Tags}
            />
          </div>
        ))}
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
        destination: "/login",
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
