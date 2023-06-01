import React from "react";

const handleSubmit = (event: any) => {
  event.preventDefault();
  alert("Confirm email: " + event.target.email.value);
  event.target.email.value = "";
  event.preventDefault();
}

const EmailSignupBox = () => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flew-row flex content-center gap-3"
    >
      <input
        type="email"
        id="email"
        className="w-3/4 rounded bg-white border border-dark-taupe p-3 text-dark-gray focus:border-blue-500 focus:ring-blue-500"
        placeholder="john.doe@company.com"
        required
      />
      <input
        type="submit"
        value="Join E-List"
        className="text-l w-1/4 rounded-lg bg-nav-teal py-1.5 px-4 font-sans text-white duration-150 hover:-translate-y-0.5"
      ></input>
    </form>
  );
};

export default EmailSignupBox;
