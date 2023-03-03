import React from 'react';
import AddProfileForm from './form';
import ProfileHeader from './header';

type User = {
  icon?: JSX.Element;
}

// documentation explaining how this component is "parameterized": i.e.,
// it operates on a specific type, specified by the <T>; the type must
// contain the field "selectName: string"!

type ProfileProps<T extends {selectName: string}> = {
    icon: User,
    placeholdData: T,
    profileLabels: T 
}

const AddProfile = <T extends {selectName: string}>({
    icon,
    placeholdData, 
    profileLabels
}: ProfileProps<T>) => {
  return (
    <>
      <div className='bg-[#F5F5F5] w-[84%] h-screen absolute inset-y-0 right-0 font-sans'>
        <ProfileHeader title={"Add New Member"} icon={icon}/>
        <AddProfileForm placeholdData={placeholdData} profileLabels={profileLabels}/>
      </div>
    </>
  )
};

export default AddProfile;