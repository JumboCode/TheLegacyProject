import React from "react";

export interface TileEditProps {
  id: string;
  handleEdit: React.MouseEventHandler;
  handleDelete: React.MouseEventHandler;
}

const TileEditBreadcrumbs = () => (
  <svg 
    height="100%" 
    stroke-miterlimit="10" 
    style="fill-rule:nonzero;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;" 
    version="1.1" 
    viewBox="0 0 1000 1000" 
    width="100%" 
    xml:space="preserve" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:vectornator="http://vectornator.io" 
    xmlns:xlink="http://www.w3.org/1999/xlink">
  <g>
    <path 
      d="M115.104 498.827C115.104 457.587 148.535 424.155 189.775 424.155C231.015 424.155 264.447 457.587 264.447 498.827C264.447 540.067 231.015 573.498 189.775 573.498C148.535 573.498 115.104 540.067 115.104 498.827Z" 
      fill="#5e4b3c" 
      fill-rule="nonzero" 
      opacity="1"
    />
    <path 
      d="M426.622 498.827C426.622 457.587 460.053 424.155 501.293 424.155C542.533 424.155 575.965 457.587 575.965 498.827C575.965 540.067 542.533 573.498 501.293 573.498C460.053 573.498 426.622 540.067 426.622 498.827Z" 
      fill="#5e4b3c" 
      fill-rule="nonzero" 
      opacity="1" 
    />
    <path 
      d="M738.14 498.827C738.14 457.587 771.572 424.155 812.812 424.155C854.052 424.155 887.483 457.587 887.483 498.827C887.483 540.067 854.052 573.498 812.812 573.498C771.572 573.498 738.14 540.067 738.14 498.827Z" 
      fill="#5e4b3c" 
      fill-rule="nonzero" 
      opacity="1" 
    />
  </g>
</svg>
)

const TileEdit = ({ id, handleEdit, handleDelete }: TileEditProps) => {
  return (
    <div>
      <TileEditBreadcrumbs/>
    </div>
  );
};

export default TileEdit;