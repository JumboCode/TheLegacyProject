import type { NextPage } from "next";
import Head from "next/head";
import PhotoHeader from "@components/photoHeader";

import { SeniorGrid } from "@components/profileTile";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-max bg-off-white">
        <PhotoHeader />
        <div className="px-3 md:px-5 lg:px-9">
          <h1 className="mt-1 text-xl font-semibold">My Senior</h1>
          <button className="my-3 inline-block h-0.5 w-1/3 min-w-[2in] bg-dark-teal md:w-[12%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]"></button>
        </div>
        <SeniorGrid name="Andrew" location="Boston" picture="" />
      </div>
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;
