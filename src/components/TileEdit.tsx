import React from "react";

export interface TileEditProps {
  id: string;
  handleEdit: React.ChangeEvent<HTMLChangeEvent>;
  handleDelete: React.ChangeEvent<HTMLChangeEvent>;
}


const TileEdit = ({ id, handleEdit, handleDelete }: TileEditProps) => {
  return ();
};

export default TileEdit;