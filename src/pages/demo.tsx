import Button from "@components/button";
import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "@components/navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          The Legacy Project
        </h1>
        <Button />
      </main>
    </>
  );
};

export default Home;
