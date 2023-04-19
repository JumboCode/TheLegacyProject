// landingFooter for Landing Page

import React from "react";

const landingFooter = () => {
  return (
    <>
      <div className="pb-9 w-[659px] text-center bg-taupe">
        <p className="text-4xl font-bold text-[40px] px-[21.5px] leading-[56px]">
          The Legacy Project. We&apos;re here.
        </p>
        <br></br>
        <p className="font-normal text-sm leading-[22px] opacity-80">We believe that the experiences and wisdom of our elders are valuable
          treasures that should be passed down to future generations. Join us in
          our effort to honor the past and shape the future by preserving the 
          stories of our elders</p>
        <br></br>
        <br></br>
        <a href="https://www.instagram.com/tuftslegacyproject/">
          <button className="bg-light-sage py-1.5 px-5 text-sm rounded-[20px]">
            🌿Instagram
          </button>
        </a>
      </div>
    </>
  );
};

export default landingFooter;