import type { NextPage } from "next";
import Head from "next/head";
import TileEdit from "@components/TileEdit";
import SortDropdown from "@components/SortDropdown";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-max bg-taupe">
        
      </div>
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;
