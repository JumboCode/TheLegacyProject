import React from "react";
import Link from "next/link";

interface HorizontalMenuItemProps {
  label: string;
  to: string;
}

const HorizontalMenuItem = ({ label, to }: HorizontalMenuItemProps) => (
  <div className="text-slate-700 text-2xl px-6 py-2 bg-tan font-inter leading-normal text-neutral-600 duration-150 hover:-translate-y-0.3 hover:bg-tan-hover">
    <Link href={to}>{label}</Link>
  </div>
);

export default HorizontalMenuItem;