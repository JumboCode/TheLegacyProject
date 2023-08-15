import React, { FormEvent } from "react";
import FlowerBox from "@components/FlowerBox";
import Button from "./Button";

const landingFooter = () => {
  function onEmailSubmit(event: FormEvent) {
    event.preventDefault();

    if ('email' in event.target) {
      const inputEmail = event.target.email.value;
      
    }
  };

  return (
    <div className="mb-[40px]">
      <FlowerBox>
          <p className="text-3xl xl:text-4xl self-center font-bold font-serif">
            There are millions of stories waiting to be told. It&apos;s your moment to change that.
          </p>
          <p className="self-center text-lg font-serif">
            Leave a lasting legacy on your college or university campus by spearheading a chapter of
            The Legacy Project at your school today.
          </p>
          {/* <form className="flex flex-col sm:flex-row w-3/4 gap-[20px] self-center"
                method="post"
                onSubmit={onEmailSubmit}>
            <input className="relative sm:w-3/4 h-[40px] px-[10px] rounded bg-off-white text-dark \
                              border-offer-white border-2 focus:border-light-teal focus:outline-none" 
                   name="email"
                   placeholder="join.us@thelegacyproj.org"/>
            <Button text="Join E-List" color="legacy-teal" hover="dark-teal"/>
          </form> */}
      </FlowerBox>
    </div>
  );
};

export default landingFooter;