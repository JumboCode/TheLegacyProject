import React, { useState } from 'react';

const initialValues = {
  firstname: "",
  lastname: "",
  student: "",
  senior: "",
};

export default function AddSenior() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    alert(`First name: ${values.firstname}\nLast name: ${values.lastname}\nStudent: ${values.student}\nSenior: ${values.senior}`);
    setValues(initialValues);
    event.preventDefault();
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <label className='ml-2 mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150 border-5'>
          First name: 
          <input value={values.firstname} type="text" name="firstname" onChange={handleChange} />
        </label>
        <label className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150'>
          Last name: 
          <input value={values.lastname} type="text" name="lastname" onChange={handleChange} />
        </label>
        <label className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150'>
          Student: 
          <input value={values.student} type="text" name="student" onChange={handleChange} />
        </label>
        <label className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150'>
          Senior: 
          <input value={values.senior} type="text" name="senior"  className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150' onChange={handleChange} />
        </label>
          <input type="submit" value="Save" className='bg-blue-700 text-l text-white py-1.5 px-6 hover:-translate-y-0.5 duration-150'  />
      </form>
    </div>
        );
}

export { AddSenior };