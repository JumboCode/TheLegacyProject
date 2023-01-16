import React, { useState } from "react";
import Link from "next/link";
import { NavbarMenu, NavbarItem } from "./index";
import SignIn from "@components/signin";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleNavMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex flex-col overflow-hidden bg-white shadow-2xl">
        {/* navbar */}
        <div className="m-auto flex h-20 w-11/12 items-center justify-center justify-between">
          {/* logo */}
          <div className="flex">
            <div className="mr-6 py-1.5 text-2xl font-bold leading-normal text-gray-700">
              <Link href="/">The Legacy Project</Link>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden lg:flex">
            <NavbarItem inMenu={false} label="About" to="/about" />
            <NavbarItem inMenu={false} label="Contact Us" to="/contact" />
            <SignIn />
          </div>

          {/* mobile */}
          <div className="flex hover:cursor-pointer lg:hidden">
            {toggleMenu ? (
              // close icon
              <div className="" onClick={toggleNavMenu}>
                <svg
                  className="h-7 w-7 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="5" x2="5" y2="18" />
                  <line x1="5" y1="5" x2="18" y2="18" />
                </svg>
              </div>
            ) : (
              // hamburger icon
              <div className="space-y-1" onClick={toggleNavMenu}>
                <span className="block h-1 w-7 rounded bg-gray-700"></span>
                <span className="block h-1 w-7 rounded bg-gray-700"></span>
                <span className="block h-1 w-7 rounded bg-gray-700"></span>
              </div>
            )}
          </div>
        </div>

        {/* dropdown */}
        <NavbarMenu isActive={toggleMenu} />
      </nav>
    </>
  );
};

export default Navbar;
