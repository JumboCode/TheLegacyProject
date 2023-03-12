import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { NavbarItem } from "./index";
import SignIn from "@components/SignIn";
import cn from "classnames";

const NavbarWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      console.log(window.scrollY);
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
    <nav
      className={cn(
        scrolling ? "shadow-2xl" : null,
        "top-0 z-50 flex flex-col bg-off-white lg:sticky"
      )}
    >
      <div className="relative m-auto flex min-h-[5rem] w-11/12 items-center justify-between">
        {/* Logo */}
        <div className="flex">
          <div className="mr-6 py-1.5 text-2xl font-bold leading-normal text-dark-plum">
            <Link href="/">The Legacy Project</Link>
          </div>
        </div>

        {/* Mobile */}
        <button className="flex lg:hidden">
          {dropdownVisible ? (
            // close icon
            <div onClick={handleMenuClick}>
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
            <div className="space-y-1" onClick={handleMenuClick}>
              <span className="block h-1 w-7 rounded bg-gray-700"></span>
              <span className="block h-1 w-7 rounded bg-gray-700"></span>
              <span className="block h-1 w-7 rounded bg-gray-700"></span>
            </div>
          )}
        </button>

        {/* Using templates is bad practice generally, but we have to mingle
            react and tailwind state here */}
        <div
          className={cn(
            dropdownVisible ? "flex" : "hidden",
            "absolute top-full left-[-4.16667%] m-auto w-screen flex-col items-center justify-center space-y-4 border-t-2 border-gray-200  bg-off-white py-4 shadow-xl lg:static lg:m-0 lg:flex lg:w-auto lg:flex-row lg:space-y-0 lg:border-t-0 lg:py-0 lg:shadow-none"
          )}
        >
          {children}
        </div>
      </div>
    </nav>
  );
};

const Navbar = () => (
  <NavbarWrapper>
    <NavbarItem label="About" to="/about" />
    <NavbarItem label="Contact Us" to="/contact" />
    <SignIn />
  </NavbarWrapper>
);

export default Navbar;

export default Navbar;
