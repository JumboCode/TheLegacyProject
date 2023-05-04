import type { NextPage } from "next";
import Head from "next/head";
import { PhotoCarousel } from "@components/photoGallery";
import LandingFooter from "@components/landingFooter";
import Image from "next/image";

function handleSubmit(event) {
  alert("Confirm email: " + event.target.email.value);
  event.target.email.value = "";
  event.preventDefault();
}

const EmailSignupBox = () => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flew-row flex content-center gap-3"
    >
      <input
        type="email"
        id="email"
        className="w-3/4 rounded-lg border border-gray-300 bg-off-white p-2.5 text-lg text-dark-gray focus:border-blue-500 focus:ring-blue-500"
        placeholder="john.doe@company.com"
        required
      />
      <input
        type="submit"
        value="Join E-List"
        className="text-lg w-1/4 rounded-lg bg-dark-green py-1.5 px-4 font-sans text-white duration-150 hover:-translate-y-0.5"
      ></input>
    </form>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-items-center p-4">
        <div className="h-full flex flex-row items-center justify-items-center gap-5">
          <div className="p-10"> 
            {/* holds paragraph and email signup */}
            <h1 className="my-8 font-serif font-bold leading-tight text-dark-plum duration-500  
                           xl:text-6xl 
                           lg:text-left lg:text-5xl
                           text-center sm:text-5xl text-4xl">
              Everyone has a story that's worth preserving.
            </h1>
            <p className="my-8 text-xl sm:text-2xl font-serif leading-tight sm:leading-[32px] text-[#515151] duration-500 text-center lg:text-left ">
              The Legacy Project tells the stories of our older generations to
              ensure that their legacies are preserved for years to come.
            </p>
            <EmailSignupBox />
          </div>
          <div className="relative lg:flex hidden shrink-0 m-4 duration-500
                          xl:h-[500px] xl:w-[500px]
                          lg:w-[350px] lg:h-[350px]">

              <Image
                src="/home/accent.png"
                alt="A circular photo of a young woman working with an older woman, with dried
                     flower accents around it."
                layout="fill"
                objectFit="cover"
                className="">
              </Image>
             {/* holds photo and dried flower accents */}
          </div>
        </div>
        <div className="w-full">
          <PhotoCarousel show={4} />
        </div>
        <LandingFooter />
      </main>
    </>
  );
};
Home.displayName = "public";

export default Home;
