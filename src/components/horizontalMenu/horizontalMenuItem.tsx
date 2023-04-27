import React from "react";
import Link from "next/link";

interface HorizontalMenuItemProps {
  label: string;
  to: string;
}

const HorizontalMenuItem = ({ label, to }: HorizontalMenuItemProps) => (
  <div className="text-2xl font-inter leading-normal text-dark-plum duration-150 hover:-translate-y-0.5 lg:mr-5">
    <Link href={to}>{label}</Link>
  </div>
);

export default HorizontalMenuItem;