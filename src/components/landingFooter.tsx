// landingFooter for Landing Page

import React from "react";

const landingFooter = () => {
  return (
    <>
      <div className="flex flex-col w-screen gap-4 content-center py-10 bg-med-tan text-center">
        <p className="text-4xl font-bold font-serif">
          The Legacy Project. We&apos;re here.
        </p>
        <p className="flex w-full px-8 sm:px-0 sm:w-1/2 self-center font-normal text-lg font-serif opacity-80">
          We believe that the experiences and wisdom of our elders are valuable
          treasures that should be passed down to future generations. Join us in
          our effort to honor the past and shape the future by preserving the 
          stories of our elders</p>
        <div className="flex flex-row self-center gap-3">
          <a href="mailto:arielle.galinsky@tufts.edu">
            <button className="bg-light-sage py-2 px-8 text-lg rounded-md duration-150 hover:-translate-y-0.5">
              ✉️  Email
            </button>
          </a>
          <a href="https://www.instagram.com/tuftslegacyproject/">
            <button className="bg-light-sage py-2 px-8 text-lg rounded-md duration-150 hover:-translate-y-0.5">
              🌿 Instagram
            </button>
          </a>
          
        </div>
        
      </div>
    </>
  );
};

export default landingFooter;