import cn from "classnames";
import React, { useRef, useState } from "react";

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
  handleEdit?: React.MouseEventHandler;
  handleDelete?: React.MouseEventHandler;
}

function TileEditMenu({
  visible,
  setVisible,
  handleEdit,
  handleDelete,
}: ITileEditMenu) {
  return (
    <div
      className={cn(
        visible ? "flex" : "hidden",
        "absolute  flex-col rounded bg-white drop-shadow-md"
      )}
    >
      <form method="dialog">
        {handleEdit ? (
          <button
            className=" border-b-[1px] border-b-gray-100 p-2"
            onClick={(e) => {
              handleEdit(e);
              setVisible(false);
            }}
          >
            Edit
          </button>
        ) : null}
        {handleDelete ? (
          <button
            className="p-2"
            onClick={(e) => {
              handleDelete(e);
              setVisible(false);
            }}
          >
            Delete
          </button>
        ) : null}
      </form>
    </div>
  );
}

export interface TileEditProps {
  handleEdit?: React.MouseEventHandler;
  handleDelete?: React.MouseEventHandler;
}

export function TileEdit({ handleEdit, handleDelete }: TileEditProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setVisible(false);
      }}
    >
      <button
        onClick={() => setVisible(true)}
        type="button"
        className="relative h-6 w-8"
      >
        <TileEditBreadcrumbs />
      </button>
      <TileEditMenu
        visible={visible}
        setVisible={setVisible}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
