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
        <div className="flex flex-col justify-center w-full gap-y-4 px-[20px]">
          <span className="font-serif font-semibold text-center sm:text-left text-3xl sm:text-4xl">
            About Us
          </span>
          <p className="tracking-easy">
            The concept of The Legacy Project (TLP) began in 2018, when Arielle Galinsky, a high school junior at the
            time, spent her time working at a local senior community in her Massachusetts hometown. Her role allowed her
            to interact with the residents, which she greatly enjoyed, yet she always left her shift with a strong
            desire to learn more about the stories of the seniors she met. With this strong curiosity, paired with a
            deep sense of regret she felt having lost her own grandfathers at a young age, Arielle decided to spearhead
            TLP as a personal project. The initiative encompassed conducting thorough interviews of 18 residents living
            in the community, with the intention to hold a ceremony at the finale of the project to provide her older
            friends with the opportunity to share their stories with their families. When the COVID-19 pandemic hit,
            Arielle pivoted, and decided the best way to preserve the 18 captivating stories of the seniors she
            interviewed was through prose. Arielle published Their Lives Reflected: A Treasury of Life Stories Captured
            Through The Legacy Project in 2021 to showcase and celebrate their life accounts, both for the seniors
            themselves and their families.
          </p>
          <p>
            Little did she know that, in the state right next over, Katie Furey, a sophomore in college home for the
            pandemic, started a similar project of her own. Katie had always been close with her grandmother, Mary,
            who was living in a nursing home at the time of the pandemic. When Katie and her family would visit Mary
            and her neighbors from outside the window of the nursing home, waving frantically through the glass and
            chatting on the phone, Katie wished there was a way for young people like herself to connect more deeply
            with these wonderful people on the other side of the glass who were experiencing a loneliness perhaps even
            more pronounced than the loneliness Katie and her peers were facing as the pandemic ramped up.
          </p>
          <p>
            The United Nations Millennium Fellowship being hosted through Tufts University presented a perfect
            opportunity for Katie to put her idea into action. Using the program’s framework, Katie partnered with
            the Little Sisters of the Poor home in Enfield, Connecticut. Katie met around ten older adults from the
            home on Zoom, connecting with them and learning tidbits of their life stories, which she is working on
            compiling as a series of vignettes.  
          </p>
          <p>
            Arielle and Katie met in 2020, quickly connecting over their aligned passions to build intergenerational
            connections provide a platform for local seniors to share their stories, and preserve such histories
            through their collective love for writing. They decided to start the Tufts Legacy Project, a chapter of
            The Legacy Project based out of Tufts University in Medford, Massachusetts which seeks to bond college
            students 1:1 with older adults living in the host communities of Medford and Somerville. When Katie decided
            to join the Millennium Fellowship for a second year, she met Wanda Schlumpf, a sophomore at Tufts, who was
            similarly dedicated to the value of storytelling. Wanda took on the project with her and joined the Tufts
            TLP chapter as a founding member. Together, the three women helped to build it into an organization of
            nearly 30 students passionate about empowering local seniors with the platform to amplify their stories.
          </p>
          <p>
            Having watched the Tufts chapter grow over the past two years, Arielle, Katie, and Wanda decided to establish
            TLP as a nonprofit organization with the goal of spreading TLP’s mission across the country - preserving
            stories of seniors who might not otherwise have the opportunity. TLP seeks to build sustainable,
            intergenerational connections as a means to combat social isolation, preserve the life histories of older
            adults, engage young individuals in revolutionizing perspectives on aging, and ensure that every old
            adult- regardless of background - has the opportunity to share their experiences.
          </p>
        </div>

          <PhotoCarousel />
          <LandingFooter />
        </div>
      </main>
    </>
  );
};
Home.displayName = "public";

export default Home;
