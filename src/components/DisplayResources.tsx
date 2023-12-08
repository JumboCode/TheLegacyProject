"use client";

import React from "react";
import ResourceTile from "@components/ResourceTile";
import { Resource } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

interface IDisplayResources {
  resources: Resource[];
  showRole: boolean;
}

interface ResourceState extends Resource {
  state: "UNEDITED" | "EDITED" | "DELETED" | "CREATED";
}

// TODO (johnny) - Create button and use setState to set the isEdit
const DisplayResources = (props: IDisplayResources) => {
  const [edit, setEdit] = React.useState(false);
  const [stateResources, setStateResources] = React.useState<ResourceState[]>(
    () =>
      props.resources.map((resource) => ({ state: "UNEDITED", ...resource }))
  );

  const onDelete = (resource: Resource) => {
    setStateResources((prev) => {
      return prev.map((prevResource) => {
        if (
          prevResource.id === resource.id &&
          prevResource.state !== "CREATED"
        ) {
          return { ...prevResource, state: "DELETED" };
        }
        return prevResource;
      });
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <button className="flex w-44 items-center justify-between rounded-xl border border-dark-teal px-4 py-2.5">
          <p className="text-base font-normal">Add resource</p>
          <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
        </button>
        {edit ? (
          <button className="rounded-xl bg-dark-teal px-6 py-2 text-white">
            Save
          </button>
        ) : (
          <button
            className="cursor-pointer text-dark-teal"
            onClick={() => setEdit(true)}
          >
            <span className="mr-2 text-base font-normal">Edit</span>
            <FontAwesomeIcon icon={faPencil} className="inline h-5 w-5" />
          </button>
        )}
      </div>
      <div className="mt-6 grid items-start gap-6 self-stretch md:grid-cols-2 ">
        {stateResources
          .filter((resource) => resource.state !== "DELETED")
          .map((eachResource) => (
            <ResourceTile
              key={eachResource.id}
              resource={eachResource}
              isEdit={edit}
              showRole={props.showRole}
              onDelete={onDelete}
              onEdit={(resource) => { return; }}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayResources;
