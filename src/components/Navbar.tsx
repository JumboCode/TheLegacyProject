import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import cn from "classnames";

const NavbarWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
  }, []);

  const handleMenuClick: React.MouseEventHandler = () => {
    setDropdownVisible((visible) => !visible);
  };

  return (
    <nav className="top-0 z-50 flex flex-col bg-tan shadow-md">
      <div className="relative m-auto flex min-h-[5rem] w-screen items-center justify-between">
        {/* Logo */}
        <div className="mr-6 py-1.5 pl-8 font-serif text-3xl lg:shadow-none">
          <Link href="/">The Legacy Project</Link>
        </div>

        {/* Mobile */}
        <button className="flex lg:hidden">
          {dropdownVisible ? (
            // close icon
            <div className="pr-6" onClick={handleMenuClick}>
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="4" x2="4" y2="18" />
                <line x1="4" y1="4" x2="18" y2="18" />
              </svg>
            </div>
          ) : (
            // hamburger icon
            <div className="pr-6" onClick={handleMenuClick}>
              <svg className="h-8 w-8"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2">
                <line x1="2" y1="6" x2="22" y2="6"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <line x1="2" y1="18" x2="22" y2="18"/>
              </svg>
            </div>
          )}
        </button>

        {/* Using templates is bad practice generally, but we have to mingle
            react and tailwind state here */}
        <div
          className={cn(
            dropdownVisible ? "flex" : "hidden",
            "absolute top-full w-full flex-col items-center gap-y-8 py-4 \
             bg-tan shadow-inner shadow-md border-t-2 border-med-tan \
             lg:static lg:flex lg:pr-8 lg:w-auto lg:gap-x-4 lg:border-0 lg:flex-row lg:space-y-0 lg:shadow-none"
          )}
        >
          {children}
        </div>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <NavbarWrapper>
      <span className="text-[1.25rem] w-auto font-serif duration-150 hover:-translate-y-1">
        <Link href="#contact"> Contact Us </Link>   
      </span>

      {session && session.user ? 
      (
        <span className="text-[1.25rem] font-serif duration-150 hover:-translate-y-1"
              onClick={() => signOut({ callbackUrl: "/" })}> Sign Out </span>
      )
      :
      (
        <span className="text-[1.25rem] font-serif duration-150 hover:-translate-y-1"
              onClick={() => signIn("google", { callbackUrl: "/home" })}> Sign In </span>
      )}
    </NavbarWrapper>
  );
}

export default Navbar;
