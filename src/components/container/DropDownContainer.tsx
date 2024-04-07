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
  const [showItems, setShowItems] = React.useState(false);

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
        className={`overflow-scroll`}
        style={
          showItems
            ? { maxHeight: "1024px", transition: "max-height 1s ease" }
            : { maxHeight: "0px", transition: "max-height 0.1s ease" }
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default DropDownContainer;
