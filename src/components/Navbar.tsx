import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const Navbar = ({ displayName }: { displayName: string}) => {
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  const router = useRouter();
  const { data: session } = useSession();
  const legacySignIn = (() => signIn("google", { callbackUrl: "/home" }));
  const legacyHome = (() => router.push("/home"));
  const buttonAction = session && session.user ? legacyHome : legacySignIn;

  return (
    <nav className="top-0 h-[60px] w-full flex flex-row items-center justify-between z-10 \ 
                    bg-med-tan border border-dark-tan z-10">

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
                className="h-8 w-8 sm:hidden text-darkest-tan"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="17" y1="6" x2="6" y2="17" />
                <line x1="6" y1="6" x2="17" y2="17" />
              </svg>
            )
            :
            (
                <svg className="h-8 w-8 visible sm:hidden text-darkest-tan"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                  <line x1="4" y1="7" x2="20" y2="7"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                  <line x1="4" y1="17" x2="20" y2="17"/>
                </svg>  
            )
          }
        </span>
      </div>

    {/* Navbar Content */}
      <div className=
        { dropdownVisible ? 
          "flex flex-col sm:hidden absolute items-center z-20 top-[60px] right-0 gap-[20px] p-[20px] \
           bg-med-tan border-l border-r border-b border-dark-tan "
          : 
          "hidden sm:flex flex-row align-center gap-[20px] pr-[40px]"}
      >
        <Link href="/">
          <div className="font-serif m-auto font-medium text-lg duration-150 hover:-translate-y-0.5">
            About Us
          </div>
        </Link>
        
        <button onClick={buttonAction}>
          <div className="font-serif m-auto font-medium text-lg duration-150 hover:-translate-y-0.5">
            {session && session.user ? "Home" : "Sign In"}
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
