"use client";

import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import {
  faArrowRightFromBracket,
  faCity,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "src/context/UserProvider";
import Logo from "@public/icons/logo.svg";
import Image from "next/image";
import { RoleAlias } from "@constants/RoleAlias";
import { fullName } from "@utils";
import { usePathname } from "next/navigation";

interface Button {
  name: string;
  icon: IconDefinition;
  link: string;
}

export interface ISideBar {
  buttons: Button[];
}

const SidebarItem = ({
  label,
  iconName,
  active,
}: {
  label: string;
  iconName: IconDefinition;
  active: boolean;
}) => {
  return (
    <div
      className={`flex w-full items-center space-x-4 text-left duration-150 hover:translate-x-1 ${
        active ? "text-dark-teal" : ""
      }`}
    >
      <div className="flex w-1/6 justify-center">
        <FontAwesomeIcon icon={iconName} size="lg" />
      </div>
      <div className="flex w-5/6 items-center text-xl">{label}</div>
    </div>
  );
};

const _Sidebar = ({ buttons }: ISideBar) => {
  const { user } = React.useContext(UserContext);
  const path = usePathname();

  return (
    <nav className="h-screen w-full overflow-y-auto bg-med-tan pb-32 pt-20 shadow-lg shadow-gray-500">
      <div className="flex h-full flex-col items-center justify-between">
        <Link href="/public/" className="flex justify-center">
          <h1 className="h-auto w-full items-center justify-center px-5 duration-150 hover:-translate-y-0.5">
            <Image src={Logo} alt="logo" className="items-end" />
          </h1>
        </Link>
        <div className="h-full w-full px-11">
          <div className="flex w-full flex-col space-y-6">
            {buttons.map((data) => (
              <Link key={data.name} href={data.link}>
                <SidebarItem
                  label={data.name}
                  iconName={data.icon}
                  active={path.startsWith(data.link)}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 w-full px-11">
          {user.Chapter != null && (
            <>
              <div className="text-md flex items-center gap-x-2 pb-2 pt-20 text-left   text-dark-gray">
                <FontAwesomeIcon icon={faCity} />
                <span>University</span>
              </div>
              <div className="text-md flex w-full truncate text-left   text-dark-plum">
                {user.Chapter.chapterName}
              </div>
            </>
          )}
          <hr className="my-6 h-px w-full rounded border-0 bg-black" />
          <div className="mb-1 flex w-full truncate text-left   text-lg font-bold">
            {fullName(user)}
          </div>
          <div className="flex w-full pb-6 pt-0 text-left   text-sm text-med-gray">
            {RoleAlias[user.role]}
          </div>
          <button onClick={() => signOut({ callbackUrl: "/public/" })}>
            <SidebarItem
              label="Sign Out"
              iconName={faArrowRightFromBracket}
              active={false}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Sidebar = (props: ISideBar) => {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  return (
    <>
      <div className="sticky top-0 hidden lg:block">
        <_Sidebar {...props} />
      </div>
      <div
        className="block lg:hidden"
        onMouseLeave={() => setSidebarVisible(false)}
      >
        <div
          className="mb-24 block lg:hidden"
          style={{ display: sidebarVisible ? "none" : "block" }}
        >
          <div className="fixed left-0 top-0 z-50 w-full bg-med-tan px-6 shadow-md shadow-gray-500">
            <div className="flex items-center justify-between">
              <svg
                className="h-8 w-8 text-darkest-tan"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                onClick={() => setSidebarVisible(!sidebarVisible)}
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
              <Link href="/public">
                <Image src={Logo} alt="logo" height={96} />
              </Link>
            </div>
          </div>
        </div>
        {sidebarVisible && (
          <div className="fixed left-0 top-0 z-50 h-full w-64 overflow-y-auto drop-shadow-lg lg:overflow-y-hidden">
            <_Sidebar {...props} />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
