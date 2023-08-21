import React, { FormEvent, FocusEvent, useState } from "react";
import FlowerBox from "@components/FlowerBox";

const LandingFooter = () => {
  const [email, setEmail] = useState<string>("");
  const [eList, setEList] = useState<Set<string>>(new Set<string>());

  const [buttonText, setButtonText] = useState<string>("Join Us");
  const [buttonStyle, setButtonStyle] = useState<string>("bg-teal hover:bg-dark-teal hover:-translate-y-0.5");

  function resetButton(target: FocusEvent<HTMLInputElement>) {
    setButtonStyle("bg-teal hover:bg-dark-teal hover:-translate-y-0.5");
    setButtonText("Join Us");
  }

  const onEmailSubmit= async (event: FormEvent) => {
    event.preventDefault();

    const pattern = ["([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))",
                     "+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"]
                    .join()
                    
    const validEmailRegex = new RegExp(pattern);
    // if box isn't empty and content is a valid email, add it to the set
    
    if (email && validEmailRegex.test(email)) {
      eList.add(email);
      setEList(eList);

      // // use SendGrid 'subscribe' route to send a test email
      // const res = await fetch(
      //   "/api/sendgrid/subscribe",
      //   {
      //     body: JSON.stringify({ to: email }),
      //     headers: { "Content-Type": "application/json" },
      //     method: "POST",
      //   }
      // );

      // const { error } = await res.json();
      // if (error) {
      //   console.log(error);
      //   setButtonText("Invalid Email");
      //   setButtonStyle("bg-light-rust");  // no hover
      //   return;
      // }
      
      setButtonText("Subscribed!");
      setButtonStyle("bg-light-teal");  // no hover
    }
    else {
      setButtonText("Invalid Email");
      setButtonStyle("bg-light-rust");  // no hover
    }
  }

  return (
    <div className="mb-[40px]">
      <FlowerBox>
          <p className="text-3xl xl:text-4xl self-center font-semibold font-serif">
            There are millions of stories waiting to be told. It&apos;s your moment to change that.
          </p>
          <p className="self-center w-3/4 text-lg font-serif">
            Leave a lasting legacy on your college or university campus by founding a chapter of
            The Legacy Project at your school today. Join our E-List below for updates.
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

export default LandingFooter;