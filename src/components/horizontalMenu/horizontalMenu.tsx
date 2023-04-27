import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { HorizontalMenuItem } from "./index";
import cn from "classnames";

const HorizontalMenuWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
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
    <nav className="top-0 z-50 flex flex-col bg-taupe shadow-md lg:sticky font-inter">
      
{/*       <div className={ cn(dropdownVisible ? "w-screen" : "w-11/12",
            "relative m-auto flex min-h-[5rem] items-center justify-between")}> */}

      <div className="relative m-auto w-screen flex min-h-[5rem] items-center justify-between">
        {/* Mobile */}
        <button className="flex lg:hidden hover: { background: #FF4B4B } => hover:bg-[#ff4b4b]">
          {dropdownVisible ? (
            // close icon
            <div className="pr-8 hover:bgcolor: #FF4B4B" onClick={handleMenuClick}>
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
            <div className="space-y-1 pr-8" onClick={handleMenuClick}>
              <span className="block h-1 w-7 rounded bg-gray-700"></span>
              <span className="block h-1 w-7 rounded bg-gray-700"></span>
              <span className="block h-1 w-7 rounded bg-gray-700"></span>
            </div>
          )}
        </button>

        {/* Using templates is bad practice generally, but we have to mingle
            react and tailwind state here */}
        <div
          className={ cn(dropdownVisible ? "flex" : "hidden",
            "absolute top-full shadow-drop-inner shadow-md pr-8 w-screen flex-col items-center justify-center space-y-4 bg-taupe py-4 lg:static lg:m-0 lg:flex lg:w-auto lg:flex-row lg:space-y-0 lg:border-t-0 lg:py-0 lg:shadow-none"
          )}
        >
          {children}
        </div>
      </div>
    </nav>
  );
};

const HorizontalMenu = () => (
  <HorizontalMenuWrapper>
    <HorizontalMenuItem label="Seniors" to="/admin-home" />
    <HorizontalMenuItem label="Students" to="/admin-home" />
  </HorizontalMenuWrapper>
);

export default HorizontalMenu;
