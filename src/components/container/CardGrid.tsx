import React, { ReactNode } from "react";

interface UserGridProps {
  title?: ReactNode;
  tiles: ReactNode[];
}

const CardGrid = ({ title, tiles }: UserGridProps) => {
  return (
    <div className="flex w-full flex-col gap-y-5">
      {title}
      <div className="flex w-full flex-wrap gap-10">{tiles}</div>
    </div>
  );
};

export default CardGrid;
