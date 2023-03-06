import React from "react";

function handleSubmit(event) {
    alert("Confirm email: " + event.target.email.value);
    event.target.email.value = "";
    event.preventDefault();
}

const EmailSignupBox = () => {
    return (
        <form onSubmit={handleSubmit} className="flex flew-row gap-3 content-center p-4 bg-off-white">
            <input type="email" id="email" className="bg-off-white border border-gray-300 text-dark-gray text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-3/4" placeholder="john.doe@company.com" required />
            <input type="submit" value="Join E-List" className="text-l rounded-lg bg-dark-green py-1.5 px-4 font-sans text-white duration-150 hover:-translate-y-0.5 w-1/4"></input>
        </form>
    );  
};

export default EmailSignupBox;