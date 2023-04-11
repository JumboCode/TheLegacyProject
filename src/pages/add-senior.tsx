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

  const newSenior: Senior = {
    firstName: seniorData.firstName,
    lastName: seniorData.lastName,
    interests: seniorData.interests,
    location: seniorData.location,
    description: seniorData.description,
    StudentIDs: [1, 2, 3],
    Students: ["a", "b", "c"],
    File: "",
  };

  // Ultimately this is where we will get the user data, but there is a bug
  // TODO: fix typing bug
  const getCurrStudents = async (
    seniorData: Senior,
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const names = await fetch("/api/students", {
      method: "GET",
      body: JSON.stringify(seniorData),
    });

    return names.json()
    alert("Retrieved names.");
  };

  //alternative approach
  useEffect(() => {
    fetch('api/students')
      .then(response => response.json())
      .then(data => {
        const names = data.map(student => `${student.name}`);
        setStudents(names);
      });
  }, []);
  const [students, setStudents] = useState<string[]>([]);

  const handleSeniorSubmit = async (
    seniorData: Senior,
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const response = await fetch("/api/seniors", {
      method: "POST",
      body: JSON.stringify(seniorData),
    });

    return response.json()
    alert("Submitted Senior.");
  };
  
  const studentthing = ["Alice", "Alicia", "Bobert"]
  
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
