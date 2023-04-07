import React from "react";

type HeaderProps = {
  title: string;
  icon?: JSX.Element;
};

const ProfileHeader = ({ title, icon }: HeaderProps) => {
  return (
    <div className="m-auto flex h-[14%] w-[96%] flex-row items-center justify-between">
      <span className="text-4xl font-medium leading-[140%] text-[#000022]">
        {title}
      </span>
      {/* subject to change */}
      <div className="h-16 w-16 rounded-full bg-[#BCDFFB]">{icon}</div>
    </div>
  );
};

export default ProfileHeader;
