import React from "react";
import Link from "next/link";

interface HorizontalMenuItemProps {
  label: string;
  to: string;
}

const HorizontalMenuItem = ({ label, to }: HorizontalMenuItemProps) => (
  <div className="text-2xl px-3 py-2 bg-taupe font-inter leading-normal text-dark-plum duration-150 hover:-translate-y-0.3 hover:bg-taupe-hover">
    <Link href={to}>{label}</Link>
  </div>
);

export default HorizontalMenuItem;