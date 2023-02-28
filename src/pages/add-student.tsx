import AddProfile from "@components/addProfile";
import AddStudent from "@components/addStudent";
import type { NextPage } from "next";
import Head from "next/head";

const AddStudentPage: NextPage = () => {

    type Student = {
        firstName: string;
        lastName: string;
        selectName: string;
        pronouns: string;
        classYear: string;
        email: string;
    }

    const initStudent: Student = {
        firstName: 'Enter their first name',
        lastName: 'Enter their last name',
        selectName: 'Enter their senior\'s name',
        pronouns: 'Enter their pronouns',
        classYear: 'Enter their class year',
        email: 'Enter their email'
    };

    const labelStudent: Student = {
        firstName: 'First Name',
        lastName: 'Last Name',
        selectName: 'Senior Names',
        pronouns: 'Pronouns',
        classYear: 'Class Year',
        email: 'Email'
    };
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddStudent />
      {/* <AddProfile<Student> initialData={initStudent} profileLabel={labelStudent}/> */}
    </>
  );
};

export default AddStudentPage;