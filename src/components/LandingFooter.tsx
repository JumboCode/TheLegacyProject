import React, { FormEvent, FocusEvent, useState } from "react";
import FlowerBox from "@components/FlowerBox";

const landingFooter = () => {
  const [email, setEmail] = useState<string>("");
  const [eList, setEList] = useState<Set<string>>(new Set<string>());

  const [buttonText, setButtonText] = useState<string>("Join Us");
  const [buttonStyle, setButtonStyle] = useState<string>("bg-teal hover:bg-dark-teal hover:-translate-y-0.5");

  function resetButton(target: FocusEvent<HTMLInputElement>) {
    setButtonStyle("bg-teal hover:bg-dark-teal hover:-translate-y-0.5");
    setButtonText("Join Us");
  }

  function onEmailSubmit(event: FormEvent) {
    event.preventDefault();
    eList.add(email);
    setEList(eList);

    const validEmailRegex = new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/);
    // if box isn't empty and content is a valid email, add it to the set
    if (email && validEmailRegex.test(email)) {
      setButtonText("Subscribed!");
      setButtonStyle("bg-light-teal");  // no hover
    }
    else {
      setButtonText("Invalid email");
      setButtonStyle("bg-light-rust");  // no hover
    }
  };

  return (
    <div className="mb-[40px]">
      <FlowerBox>
          <p className="text-3xl xl:text-4xl self-center font-semibold font-serif">
            There are millions of stories waiting to be told. It&apos;s your moment to change that.
          </p>
          <p className="self-center text-lg font-serif">
            Leave a lasting legacy on your college or university campus by spearheading a chapter of
            The Legacy Project at your school today.
          </p>
            <form className="flex flex-col w-3/4 justify-center mx-auto sm:flex-row gap-[20px]"
                  method="post"
                  onSubmit={onEmailSubmit}>
              <input className="relative sm:w-3/4 h-[40px] px-[10px] rounded bg-off-white text-dark \
                                border-offer-white border-2 focus:border-light-teal focus:outline-none" 
                        
                     name="email"
                     placeholder="hello@thelegacyproj.org"
                     onFocus={resetButton}
                     onChange={ (event) => { setEmail(event.target.value); }}
              />
              <button
                  className={`w-auto h-[40px] ${buttonStyle} rounded duration-150`}
                  type="submit"
              >
                <span className="m-[10px] w-auto align-center font-serif text-md tracking-easy text-white">
                  {buttonText}
                </span>
              </button>
            </form>
      </FlowerBox>
    </div>
  );
};

export default landingFooter;