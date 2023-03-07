import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;