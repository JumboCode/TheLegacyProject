import React from "react";
import Link from "next/link";

interface NavbarItemProps {
  label: string;
  to: string;
}

const NavbarItem = ({ label, to }: NavbarItemProps) => (
  <div className="text-2xl font-serif leading-normal text-dark-plum duration-150 hover:-translate-y-0.5 lg:mr-5">
    <Link href={to}>{label}</Link>
  </div>
);

export default NavbarItem;