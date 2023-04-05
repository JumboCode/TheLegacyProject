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

    const placeholdSenior: Senior = {
        firstName: 'Enter their first name.',
        lastName: 'Enter their last name.',
        selectName: 'Enter their student\'s names.',
        interests: 'Enter their interests.',
        location: 'Enter their location.',
        description: 'Describe this senior.'
    };

    const labelSenior: Senior = {
        firstName: 'First Name',
        lastName: 'Last Name',
        selectName: 'Student Names',
        interests: 'Interests',
        location: 'Location',
        description: 'Description' 
    }

    const handleSeniorSubmit = async (seniorData: Senior,
                                      event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: POST to create a new model on submit
        alert("Submitted Senior.");
    }

    return (
        <>
            <AddProfile<Senior> placeholdData={placeholdSenior} profileLabels={labelSenior}
                                handleSubmit={handleSeniorSubmit}
                                dropData={['Place', 'Holder', 'Names']}/>
        </>
    ); 
}

export default AddSenior;