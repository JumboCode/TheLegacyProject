import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [buttonId, setButtonId] = useState(0);
  const [buttonCount, setButtonCount] = useState(0);
  useEffect(() => {
    fetch(`api/button/${buttonId}`)
      .then((res) => res.json())
      .then((data) => setButtonCount(data.timesClicked));
  }, [buttonId]);

  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          The Legacy Project
        </h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            setButtonCount(buttonCount + 1);
            fetch(`api/button/${buttonId}`, { method: "PUT" })
              .then((res) => res.json())
              .then((data) => setButtonCount(data.timesClicked));
          }}
        >
          Button {buttonId}
        </button>
        <p>Button clicked {buttonCount} times!</p>
      </main>
    </>
  );
};

export default Home;
