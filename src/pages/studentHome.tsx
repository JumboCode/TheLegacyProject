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
      
      <div className="bg-off-white h-max">
        <PhotoHeader/>
        <div className="lg:px-9 md:px-5 px-3">
          <h1 className="font-semibold text-xl">My Senior</h1>
          <button className="bg-dark-teal h-0.5 inline-block min-w-[2in] 2xl:w-[12%] xl:w-[12%] lg:w-[12%] md:w-[12%] w-1/3 my-3"></button>
        </div>
        <SeniorGrid name="Andrew" location="Boston" picture="" />

        

      </div>
      
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;