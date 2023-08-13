import type { NextPage } from "next";
import Head from "next/head";
import PhotoCarousel from "@components/PhotoCarousel";
import LandingFooter from "@components/LandingFooter";
import Button from "@components/Button"
import Image from "next/image";

const EmailSignupBox = () => {
  return (
    <form
      // TODO: add email e-list integration with SendGrid
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

  const chapterInitForm = "https://forms.gle/CKcsXkvNGqfaAdBx8";
  const chapterResources = "https://drive.google.com/drive/folders/1vw8rc5sU0bYJkgH75VZOjI6IF-XAWEmG?usp=share_link"
  const legacyInstagram = "https://www.instagram.com/tuftslegacyproject/"

  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-screen min-h-screen">
        <div className="relative flex flex-col place-items-center max-h-full w-screen sm:w-auto bg-med-tan \
                        mx-[0px] md:mx-[80px] xl:mx-[160px] my-[20px] gap-[20px] p-[20px] md:p-[40px]">
          {/* Hero Section and Action Items Buttons */}
            <div className="flex flex-row w-full md:px-[40px] lg:px-0">
              <div className="flex flex-col items-center lg:items-start gap-[20px] lg:mr-[20px]">
                <h1 className="mb-[10px] px-[40px] md:px-0 font-serif font-semibold text-2xl sm:text-3xl lg:text-4xl \
                              text-center lg:text-left">
                  Everyone has a story that&apos;s worth preserving.
                </h1>
                <p className="text-center lg:text-left font-sans text-lg xl:text-xl tracking-easy">
                  The Legacy Project, Inc. (TLP) connects college students with local elders in their community with
                  the purpose of building strong intergenerational relationships and documenting the life histories of
                  seniors, ensuring that their legacies are preserved for years to come.
                </p>
                <p className="text-center lg:text-left font-sans text-lg xl:text-xl tracking-easy">
                Join an ever-growing network of college students across the country passionate about telling stories,
                and form a Legacy Project chapter at your school or university today.
                </p>
              </div>
              
              <span className="hidden relative lg:flex max-h-[240px] w-1/2 aspect-square grow-0">
                <Image
                  className="rounded"
                  src="/landing/senior.jpg"
                  alt="A photo of an older woman sitting in a wheelchair."
                  layout="fill"
                  objectFit="cover"
                  />
              </span>
            </div>
            {/* Action Items Buttons */}
            <span className="lg:hidden absolute h-[120px] aspect-square -top-8 -left-16 -rotate-12 opacity-80">
                <Image 
                  src="/landing/pink-flower.png"
                  layout="fill"
                  objectFit="cover"
                />
            </span>
            <span className="absolute h-[140px] md:h-[170px] aspect-square -bottom-10 -left-16 \
                            -rotate-45 opacity-70">
                <Image 
                  src="/landing/olive-branch.png"
                  layout="fill"
                  objectFit="cover"
                />
              </span>
            <div className="flex flex-col md:flex-row place-items-center justify-center gap-[20px]">
                <Button text="Start a Chapter" color="tag-rust" hover="dark-rust" link={chapterInitForm} />
                <Button text="TLP Chapter Resources" color="tag-rust" hover="dark-rust" link={chapterResources} />
                <Button text="TLP Instagram" color="tag-rust" hover="dark-rust" link={legacyInstagram} />
            </div>
            <span className="lg:hidden absolute h-[140px] md:h-[170px] aspect-square \
                            -top-8 -right-16 -rotate-12 opacity-90">
                <Image 
                  src="/landing/pink-stem.png"
                  layout="fill"
                  objectFit="cover"
                />
            </span>
            <span className="absolute h-[140px] aspect-square -bottom-2 -right-12 opacity-80">
                <Image 
                  src="/landing/yellow-flower.png"
                  layout="fill"
                  objectFit="cover"
                />
            </span>
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
