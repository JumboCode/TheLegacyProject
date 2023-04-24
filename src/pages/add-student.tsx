import AddProfile from "@components/addProfile";
import type { NextPage } from "next";
import Head from "next/head";

const AddStudentPage: NextPage = () => {
  type Student = {
    firstName: string;
    lastName: string;
    selectName: string[];
    pronouns: string;
    classYear: string;
    email: string;
  };

  const placeholdStudent: Student = {
    firstName: "Enter their first name.",
    lastName: "Enter their last name.",
    selectName: ["Enter their senior's name."],
    pronouns: "Enter their pronouns.",
    classYear: "Enter their class year.",
    email: "Enter their email.",
  };

  const labelStudent: Student = {
    firstName: "First Name",
    lastName: "Last Name",
    selectName: ["Senior Names"],
    pronouns: "Pronouns",
    classYear: "Class Year",
    email: "Email",
  };

  const handleStudentSubmit = async (
    studentData: Student,
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    alert("Submitted Student.");
  };

  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddProfile<Student>
        placeholdData={placeholdStudent}
        profileLabels={labelStudent}
        handleSubmit={handleStudentSubmit}
        dropData={["Place", "Holder", "Names"]}
      />
    </>
  );
};

export default AddStudentPage;
