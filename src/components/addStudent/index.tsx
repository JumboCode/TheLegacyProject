import React from 'react';
import AddStudentForm from './form';
import Header from './header';

type User = {
  icon?: JSX.Element;
}

const AddStudent = ({
  icon
}: User) => {
  return (
    <>
      <div className='bg-[#F5F5F5] w-[84%] h-screen absolute inset-y-0 right-0 font-sans'>
        <Header title={"Add New Member"} icon={icon}/>
        <AddStudentForm/>
      </div>
    </>
  )
};

export default AddStudent;
