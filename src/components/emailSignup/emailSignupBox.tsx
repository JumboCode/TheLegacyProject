import React from "react";
import EmailSignupButton from "./emailSignupButton";

function handleSubmit(event) {
    // validate that input is an email
    // contains alpha (65-90, 97-122) numeric (48-57) chars
    // no "." (46) at beginning or consecutive ("..")
    // contains an @ (64)
    // no ( ) , : ; < > @ [ \ ]

    // https://www.geeksforgeeks.org/write-regular-expressions/
    // Example :  Regular expression for an email address :
    // ^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$

    if (isValidEmail(event.target.email.value)) {
        alert("Confirm email: " + event.target.email.value);
    } else {
        alert("Input is not a valid email");
    }

    event.target.email.value = "";
    event.preventDefault();
}

function isValidEmail(input: string) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (input.search(re) == -1) {
        return false;
    } 
    return true;
}

const EmailSignupBox = () => {
    return (
        <form onSubmit={handleSubmit} className="pt-4 border-2 border-red-500">
            <div className="mb-6">
            <label className="block mb-4 text-base font-bold">Sign up for our mailing list!</label>
            <label className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required />
            <EmailSignupButton />
            </div> 
        </form>
    );  
};

export default EmailSignupBox;