import React from "react";
import FlowerBox from "@components/FlowerBox";

const landingFooter = () => {
  return (
      <FlowerBox>
        <p className="text-3xl xl:text-4xl text-center font-bold font-serif">
          There are millions of stories waiting to be told. It&apos;s your moment to change that.
        </p>
        <p className="flex w-full px-8 sm:px-0 sm:w-1/2 self-center font-normal text-lg font-serif opacity-80">
          Leave a lasting legacy on your college or university campus by spearheading a chapter of
          The Legacy Project at your school today. Sign up for our e-list below.
        </p>
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
        
      </FlowerBox>
  );
};

export default landingFooter;