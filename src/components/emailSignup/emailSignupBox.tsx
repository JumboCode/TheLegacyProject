import React from "react";

function handleSubmit(event) {
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
        className="w-3/4 rounded-lg border border-gray-300 bg-taupe p-2.5 text-sm text-dark-gray focus:border-dark-green focus:ring-dark-green"
        placeholder="john.doe@company.com"
        required
      />
      <input
        type="submit"
        value="Join E-List"
        className="text-md w-fit rounded-lg bg-dark-green py-1.5 px-4 font-sans text-white duration-150 hover:-translate-y-0.5"
      ></input>
    </form>
  );
};

export default EmailSignupBox;
