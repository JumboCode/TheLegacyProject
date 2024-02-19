import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className=" bg-dark-green px-[93px] py-[22px] text-white">
      <FontAwesomeIcon icon={faInstagram} className="h-[24px] w-[24px]" />
    </div>
  );
};

export default Footer;
