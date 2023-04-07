import React, { useState } from "react";

const AddFile = () => {
  const [visibility, setVisibility] = useState<boolean>(true);

  const handleCancel = () => {
    // TODO: we should clear the form state here too
    setVisibility(!visibility);
  };

  return (
    <div
      className={`absolute h-full w-full backdrop-blur-[2px] backdrop-brightness-75 ${
        visibility ? "" : "hidden"
      }`}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 m-auto flex h-[700px] w-[500px] flex-col rounded-[10px] bg-[#FFFFFF] px-[31px]">
        <span className="mt-[41px] h-[34px] w-full font-sans text-sm leading-[22px] text-dark-gray">
          File name
        </span>
        <input className="mt-[15px] h-[46px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] px-3" />

        <span className="mt-[22px] h-[34px] w-full text-sm leading-[22px] text-dark-gray">
          Description
        </span>
        <textarea
          className="mt-[15px] h-[123px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] bg-[#F5F6FA] p-[12px] text-start text-sm"
          placeholder="Write a detailed description"
        />

        {/* not sure the correct tag to use for tag inputs... */}
        <span className="mt-[22px] h-[34px] w-full font-sans text-sm leading-[22px] text-dark-gray">
          Tags
        </span>
        <input className="mt-[15px] h-[46px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] px-3" />

        <div className="m-auto mt-[154px] flex h-[54px] w-[300px] flex-row gap-4">
          <button
            className="w-full rounded bg-off-white text-sm font-normal text-[#515151] hover:bg-gray-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="w-full rounded bg-teal-800 text-sm font-normal text-[#FFFFFF] hover:bg-dark-teal">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFile;
