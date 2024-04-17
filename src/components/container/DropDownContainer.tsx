"use client";

import React from "react";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropDownContainerProps {
  classname?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

const DropDownContainer = (props: DropDownContainerProps) => {
  const [showItems, setShowItems] = React.useState(true);

  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div className={props.classname ?? ""}>
      <div className="flex cursor-pointer" onClick={handleClick}>
        <div className="h-full pr-2">
          <FontAwesomeIcon icon={showItems ? faCaretDown : faCaretRight} />
        </div>
        {props.title}
      </div>
      <div
        className={`overflow-auto ${
          showItems ? "h-fit min-h-[256px] pb-4" : "max-h-0"
        }`}
        style={
          showItems
            ? { transition: "max-height 0.5s ease" }
            : { transition: "max-height 0.1s ease" }
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default DropDownContainer;
