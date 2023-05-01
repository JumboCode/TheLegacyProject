import React from "react";

export interface TileEditProps {
  id: string;
  handleEdit: React.MouseEventHandler<HTMLDivElement>;
  handleDelete: React.MouseEventHandler<HTMLDivElement>;
}

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
)

const TileEdit = ({ id, handleEdit, handleDelete }: TileEditProps) => {
  return (
    <div className="border-2 border-red-500 h-8 w-8">
      <TileEditBreadcrumbs/>
    </div>

  );
};

export default TileEdit;