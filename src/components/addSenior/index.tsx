import React, { useState } from 'react';

function handleSubmit(event) {
    alert("First name: " + event.target.firstname.value + "\nLast name: " + event.target.lastname.value + "\nStudent: " + event.target.student.value + "\nSenior: " + event.target.senior.value);
    event.target.firstname.value = "";
    event.target.lastname.value = "";
    event.target.student.value = "";
    event.target.senior.value = "";
    event.preventDefault();
}

const initialValues = {
  firstname: "",
  lastname: "",
  student: "",
  senior: "",
};


export default function AddSenior() {
  const [values, setValues] = useState(initialValues);


  const handleChange = (e) => {
    //const name = e.target.name 
    //const value = e.target.value 
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  
  return (
          <div >
            <form onSubmit={handleSubmit}>
            <label className>
                First name: 
                <input value={values.firstname} type="text" name="firstname" className='ml-2 mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150 border-5' onChange={handleChange} />
              </label>
              <label className>
                Last name: 
                <input value={values.lastname} type="text" name="lastname" className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150' onChange={handleChange} />
              </label>
              <label className>
                Student: 
                <input value={values.student} type="text" name="student"  className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150' onChange={handleChange} />
              </label>
              <label>
                Senior: 
                <input value={values.senior} type="text" name="senior"  className='ml-2  mr-4 bg-gray-50 text-l text-black py-0 px-0 hover:-translate-y-0.5 duration-150' onChange={handleChange} />
              </label>
              <input type="submit" value="Save" className='bg-blue-700 text-l text-white py-1.5 px-6 hover:-translate-y-0.5 duration-150'  />
            </form>
          </div>
        );
}

export { AddSenior };
