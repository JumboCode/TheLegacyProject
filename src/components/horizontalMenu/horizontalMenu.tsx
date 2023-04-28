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

  return (
    <div className="px-1 relative m-auto w-screen flex  ">
        <HorizontalMenuItem label="Seniors" to="/admin-home" />
        <HorizontalMenuItem label="Students" to="/admin-home" />
    </div> 
    // <nav className="relative flex flex-col bg-taupe shadow-md lg:sticky font-inter">
    //   <div className="relative m-auto w-screen flex min-h-[5rem] items-center justify-between">
    //     {/* Mobile */}
    //     <HorizontalMenuItem label="Seniors" to="/admin-home" />
    //     <HorizontalMenuItem label="Students" to="/admin-home" />
    //   </div>
    // </nav>
  );
}; 

// border-solid border-2 border-red-500 
const HorizontalMenu = () => (
  <HorizontalMenuWrapper>

  </HorizontalMenuWrapper>
);

export default HorizontalMenu;
