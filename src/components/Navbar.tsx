import React, { useState } from "react";

import Link from "next/link";
import SignIn from "./SignIn";

const Navbar = ({ displayName }: { displayName: string}) => {
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  return (
    <nav className="top-0 z-10 h-[60px] w-full flex flex-row items-center justify-between">

      {/* Logo */}
      <div className="pl-[20px] sm:pl-[40px] font-serif font-medium text-xl md:text-2xl">
        <Link href="/">The Legacy Project</Link>
      </div>

      {/* Menu Option vs. Menu Close */}
      <div className="visible z-10 pr-[20px] sm:pr-[40px]">
        <span onClick={handleMenuClick}>
          { dropdownVisible ? 
            (
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
                <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
              </svg>
            )
            :
            (
                <svg className="h-8 w-8 visible sm:hidden"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                  <line x1="2" y1="6.5" x2="22" y2="6.5"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <line x1="2" y1="17.5" x2="22" y2="17.5"/>
                </svg>  
            )
          }
        </span>
      </div>

    {/* Navbar Content */}
      <div className=
        { dropdownVisible ? 
          "flex sm:hidden flex-col absolute top-[60px] right-[0px] align-right gap-[20px] p-[20px] bg-tan border-t-2 border-dark-tan" 
          : 
          "hidden sm:flex flex-row align-center gap-[20px] pr-[40px]"}
      >
        <div className="font-serif m-auto font-medium text-lg z-20 duration-150 hover:-translate-y-0.5">
          <Link href="/">About Us</Link>
        </div>
        <SignIn isPublic={displayName === "public"}/>
      </div>
    </nav>
  );
}

export default Navbar;
