import React from "react";
import AddProfileForm from "./form";
import ProfileHeader from "./header";

type User = {
  icon?: JSX.Element;
};

// documentation explaining how this component is "parameterized": i.e.,
// it operates on a specific type, specified by the <T>; the type must
// contain the field "selectName: string []"!

type ProfileProps<T extends { selectName: string [] }> = {
  placeholdData: T;
  profileLabels: T;
  dropData: string[];
  handleSubmit: Function;
};

const AddProfile = <T extends { selectName: string [] }>({
  placeholdData,
  profileLabels,
  dropData,
  handleSubmit,
}: ProfileProps<T>) => {
  return (
    <>
      <div className="absolute inset-y-0 right-0 h-screen w-[84%] bg-tan font-sans">
        <ProfileHeader title={"Add New Member"} icon={null} />
        <AddProfileForm
          placeholdData={placeholdData}
          profileLabels={profileLabels}
          handleSubmit={handleSubmit}
          dropData={dropData}
        />
      </div>
    </>
  );
};

export default AddProfile;
