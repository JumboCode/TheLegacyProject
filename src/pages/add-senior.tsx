import type { NextPage } from "next";
import AddProfile from "@components/addProfile";
import React, { useState, useEffect } from 'react';

const AddSenior: NextPage = () => {
  type Senior = {
    firstName: string;
    lastName: string;
    selectName: string;
    interests: string;
    location: string;
    description: string;
  };

  const placeholdSenior: Senior = {
    firstName: "Enter their first name.",
    lastName: "Enter their last name.",
    selectName: "Enter their student's names.",
    interests: "Enter their interests.",
    location: "Enter their location.",
    description: "Describe this senior.",
  };

  const labelSenior: Senior = {
    firstName: "First Name",
    lastName: "Last Name",
    selectName: "Student Names",
    interests: "Interests",
    location: "Location",
    description: "Description",
  };


  const handleSeniorSubmit = (
    seniorData: Senior,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    alert("Time to Submit!");

    const seniorPost = {
      name: seniorData.firstName + " " + seniorData.lastName,
      location: seniorData.location,
      description: seniorData.description,
    };

    const postData = async () => {
      const response = await fetch("/api/seniors/add", {
        method: "POST",
        body: JSON.stringify(seniorPost),
      });
      return response.json();
    };

    postData().then((data) => { alert(JSON.stringify(data)); });    
  };


  // 1. fetch the Student list
  const studentthing = ["Alice", "Alicia", "Bobert"];
  //const curr_students = getCurrStudents().then(data => )
  // useEffect(() => {
  //   fetch('api/students')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("data", data)
  //       const names = data.map(student => `${student.name}`);
  //       setStudents(names);
  //     });
  // }, []);
  // const [students, setStudents] = useState<string[]>([]);

  return (
    <>
      <AddProfile<Senior>
        placeholdData={placeholdSenior}
        profileLabels={labelSenior}
        handleSubmit={handleSeniorSubmit}
        dropData={studentthing}
      />
    </>
  );
};

export default AddSenior;
