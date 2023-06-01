import cn from "classnames";
import React, { useState } from "react";

const TileEditBreadcrumbs = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="10"
    clipRule="evenodd"
    viewBox="0 0 1000 1000"
  >
    <g fill="#5e4b3c">
      <path d="M115.104 498.827c0-41.24 33.431-74.672 74.671-74.672 41.24 0 74.672 33.432 74.672 74.672 0 41.24-33.432 74.671-74.672 74.671-41.24 0-74.671-33.431-74.671-74.671zM426.622 498.827c0-41.24 33.431-74.672 74.671-74.672 41.24 0 74.672 33.432 74.672 74.672 0 41.24-33.432 74.671-74.672 74.671-41.24 0-74.671-33.431-74.671-74.671zM738.14 498.827c0-41.24 33.432-74.672 74.672-74.672 41.24 0 74.671 33.432 74.671 74.672 0 41.24-33.431 74.671-74.671 74.671-41.24 0-74.672-33.431-74.672-74.671z"></path>
    </g>
  </svg>
);

interface ITileEditMenu {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  options: { name: string; onClick: React.MouseEventHandler }[];
}

function TileEditMenu({ visible, setVisible, options }: ITileEditMenu) {
  return (
    <div
      className={cn(
        visible ? "flex" : "hidden",
        "absolute top-0 right-0 z-10 flex-col text-center rounded bg-white drop-shadow-md"
      )}
    >
      <form method="dialog">
        {options.map((option) => (
          <button
            key={option.name}
            className="p-2 px-4"
            onClick={(e) => {
              option.onClick(e);
              setVisible(false);
            }}
          >
            {option.name}
          </button>
        ))}
      </form>
    </div>
  );
}

export interface TileEditProps {
  options: { name: string; onClick: React.MouseEventHandler }[];
}

export function TileEdit({ options }: TileEditProps) {
  const [visible, setVisible] = useState(false);

  return options.length > 0 ? (
    <div
      className="absolute top-0 right-0 w-auto p-1"
      onMouseLeave={(e) => { setVisible(false); }}
    >
      <button
        onClick={() => setVisible(true)}
        type="button"
        className="relative h-8 w-8"
      >
        <TileEditBreadcrumbs />
      </button>
      <TileEditMenu
        visible={visible}
        setVisible={setVisible}
        options={options}
      />
    </div>
  ) : null;
}
