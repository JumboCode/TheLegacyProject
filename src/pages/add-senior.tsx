import type { NextPage } from "next";
import AddProfile from "@components/addProfile";

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
  

  return (
    <>
      <AddProfile<Senior>
        placeholdData={placeholdSenior}
        profileLabels={labelSenior}
        handleSubmit={handleSeniorSubmit}
        dropData={[labelSenior.selectName]}
      />
    </>
  );
};

export default AddSenior;
