import React from "react";

function handleSubmit(event) {
    // validate that input is an email
    // contains alpha (65-90, 97-122) numeric (48-57) chars
    // no "." (46) at beginning or consecutive ("..")
    // contains an @ (64)
    // no ( ) , : ; < > @ [ \ ]

    alert("Email: ");
    event.target.email.value = "";
    event.preventDefault();
}

const EmailSignupBox = () => {
    return (
        <form onSubmit={handleSubmit} className="pt-4 border-2 border-red-500">
            <div className="mb-6">
            <label className="block mb-4 text-base font-bold dark:text-white">Sign up for our mailing list!</label>
            <label className="block mb-2 text-sm font-medium dark:text-white">Email address</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
            </div> 
        </form>
    );  
};

export default EmailSignupBox;