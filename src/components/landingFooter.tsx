// landingFooter for Landing Page

import React from "react";

const landingFooter = () => {
  return (
    <>
      <div className="w-[659px] bg-taupe pb-9 text-center">
        <p className="px-[21.5px] font-serif text-4xl text-[40px] font-bold leading-[56px]">
          The Legacy Project. We&apos;re here.
        </p>
        <br></br>
        <p className="font-serif text-lg font-normal opacity-80">
          We believe that the experiences and wisdom of our elders are valuable
          treasures that should be passed down to future generations. Join us in
          our effort to honor the past and shape the future by preserving the
          stories of our elders
        </p>
        <br></br>
        <br></br>
        <div className="flex flex-col gap-3" id="contact">
          <a href="mailto:arielle.galinsky@tufts.edu">
            <button className="text-md rounded-lg bg-light-sage py-1.5 px-5 duration-150 hover:-translate-y-0.5">
              ✉️ Email
            </button>
          </a>
          <a href="https://www.instagram.com/tuftslegacyproject/">
            <button className="text-md rounded-lg bg-light-sage py-1.5 px-5 duration-150 hover:-translate-y-0.5">
              🌿 Instagram
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default landingFooter;
