import useDropdown from "@components/dropdown";
import Dropdown from "@components/dropdown";
import type { NextPage } from "next";
import Head from "next/head";

// TODO: revert this file to match main before opening pull request

const Home: NextPage = () => {
  let [dropdownValue, DropdownComponent] = useDropdown({
      items: ["one", "two", "three"],
      color: "purple"
  });

  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <p>{dropdownValue}</p>
        {DropdownComponent}
      </main>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
