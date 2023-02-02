import React from "react";
import Link from "next/link";

interface NavbarItemProps {
  label: string;
  to: string;
}

const NavbarItem = ({ label, to }: NavbarItemProps) => (
  <div className="lg:text-l text-xl font-semibold leading-normal text-gray-700 duration-150 hover:-translate-y-0.5 lg:mr-5">
    <Link href={to}>{label}</Link>
  </div>
);

export default NavbarItem;
