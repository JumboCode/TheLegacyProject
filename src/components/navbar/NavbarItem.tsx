import React from "react";
import Link from "next/link";

interface NavbarItemProps {
  label: string;
  to: string;
}

const NavbarItem = ({ label, to }: NavbarItemProps) => {
  const isBrowser = () => typeof window !== "undefined";

  const scrollToContact = () => {
    if (!isBrowser()) return;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="font-serif text-2xl leading-normal text-dark-plum duration-150 hover:-translate-y-0.5 lg:mr-5">
      <Link href={to} onClick={scrollToContact}>
        {label}
      </Link>
    </div>
  );
};

export default NavbarItem;
