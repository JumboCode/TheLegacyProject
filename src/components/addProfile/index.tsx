import React from 'react';
import AddProfileForm from './form';
import ProfileHeader from './header';

type User = {
  icon?: JSX.Element;
}

const AddProfile = ({
  icon
}: User) => {
  return (
    <>
      <div className='bg-[#F5F5F5] w-[84%] h-screen absolute inset-y-0 right-0 font-sans'>
        <ProfileHeader title={"Add New Member"} icon={icon}/>
        <AddProfileForm />
      </div>
    </>
  )
};

export default AddProfile;