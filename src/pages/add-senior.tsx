import type { NextPage } from "next";
import AddProfile from "@components/addProfile"

const AddSenior: NextPage = () => {

    type Senior = {
        firstName: string;
        lastName: string;
        selectName: string;
        interests: string;
        location: string;
        description: string;
    }

    const initSenior: Senior = {
        firstName: 'Enter their first name',
        lastName: 'Enter their last name',
        selectName: 'Enter their student\'s names',
        interests: 'Enter their interests',
        location: 'Enter their location',
        description: 'Describe them'
    };

    const labelSenior: Senior = {
        firstName: 'First Name',
        lastName: 'Last Name',
        selectName: 'Student Names',
        interests: 'Interests',
        location: 'Location',
        description: 'Description' 
    }

    return (
        <>
            <AddProfile<Senior> initialData=initSenior profileLabel=labelSenior/>
        </>
    ); 
}

export default AddSenior;