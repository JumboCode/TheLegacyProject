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
    <div className="pl-9 px-1 relative m-auto w-screen flex  ">
        <HorizontalMenuItem label="Seniors" to="/admin-home" />
        <HorizontalMenuItem label="Students" to="/admin-home" />
    </div> 
  );
}; 

const HorizontalMenu = () => (
  <HorizontalMenuWrapper>

  </HorizontalMenuWrapper>
);

export default HorizontalMenu;
