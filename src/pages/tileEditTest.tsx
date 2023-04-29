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
      <TileEdit id="1" handleDelete={() => fetch("/api/senior/6442c41aa1fbce0735b20ba0/", {method: "DELETE"})} handleEdit={() => fetch("/api/senior/6442c41aa1fbce0735b20ba0/", {method: "PATCH"})}/>
      </div>
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;
