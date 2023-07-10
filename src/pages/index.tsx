import type { NextPage } from "next";
import Head from "next/head";
import PhotoCarousel from "@components/PhotoCarousel";
import LandingFooter from "@components/LandingFooter";
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
        className="w-1/4 rounded-lg bg-dark-green py-2 px-4 font-sans text-lg text-white duration-150 hover:-translate-y-0.5"
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

      <main className="flex flex-col w-screen min-h-screen">
        <div className="relative flex w-screen h-full flex-row items-center justify-center bg-med-tan">
          {/* holds hero section and email signup */}
          <div className="z-10 p-16">
            <h1
              className="my-8 text-center font-serif font-bold 
                           duration-500 text-5xl
                           lg:text-left"
            >
              Everyone has a story that's worth preserving.
            </h1>
            <p className="my-8 text-center font-serif text-2xl lg:text-left tracking-easy">
              The Legacy Project tells the stories of our older generations to
              ensure that their legacy is memorialized for years to come.
            </p>
            <EmailSignupBox />
          </div>
          <div className="absolute top-10 -left-4 lg:hidden">
            <Image
              src="/home/pinkflower.png"
              height={160}
              width={160}
              alt="Image of a branch with small dried pink flowers with a transparent background"
              className="absolute z-0 duration-500"
            ></Image>
          </div>
          <div className="absolute -bottom-0 -right-0 z-0 lg:hidden">
            <Image
              src="/home/yellowflower.png"
              height={146}
              width={146}
              alt="Image of a single yellow-orange dried flower with transparent background"
              className="duration-500"
            ></Image>
          </div>
          <div className="absolute -top-8 -right-0 lg:hidden">
            <Image
              src="/home/paper.png"
              height={184}
              width={137}
              alt="Image of an aged piece of paper with cursive writing onit"
              className="duration-500"
            ></Image>
          </div>
          <div
            className="relative m-4 hidden shrink-0 duration-500 lg:flex
                          lg:h-[350px] lg:w-[350px]
                          xl:h-[500px] xl:w-[500px]"
          >
            <Image
              src="/home/accent.png"
              alt="A circular photo of a young woman working with an older woman, with dried
                     flower accents around it."
              layout="fill"
              objectFit="cover"
              className=""
            ></Image>
          </div>
        </div>
        <div className="flex flex-col text-wrap px-10 items-center w-full">
          <PhotoCarousel />
          <LandingFooter />
        </div>
      </main>
    </>
  );
};
Home.displayName = "public";

export default Home;
