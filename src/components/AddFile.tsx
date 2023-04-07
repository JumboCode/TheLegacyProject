import React, { useState } from "react";

// https://feathericons.dev/?search=x&iconset=feather&format=strict-tsx
function X(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
}

const Tag = ({ text }: { text: string }) => {
  return (
    <div className="flex flex flex-row flex-row rounded-xl bg-gray-300 py-1 px-3">
      <small>{text}</small>
      <X className="text-xs" />
    </div>
  );
};

const TagSelector = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["tag 3"]);
  const tagList = ["tag 1", "tag 2", "tag 3"];

  return (
    <div>
      <span className="h-[34px] w-full font-sans text-sm leading-[22px] text-dark-gray">
        Tags
      </span>
      <form className="mt-[1rem]">
        <input className="h-[46px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] px-3" />
      </form>
      <div className="flex flex-row p-3">
        {selectedTags.map((tag: string) => (
          <Tag text={tag} />
        ))}
      </div>
    </div>
  );
};

const AddFile = () => {
  const [visibility, setVisibility] = useState<boolean>(true);

  const handleCancel = () => {
    // TODO: we should clear the form state here too
    setVisibility(!visibility);
  };

  return (
    <>
      {visibility && (
        <>
          <div className="absolute flex h-full w-full flex-row items-center justify-center backdrop-blur-[2px] backdrop-brightness-75">
            <div className="flex h-[700px] max-w-[35%] flex-col justify-between rounded-lg bg-white p-10">
              <div>
                <span className="my-5 h-[34px] w-full font-sans text-sm leading-[22px] text-dark-gray">
                  File name
                </span>
                <input className="my-5 h-[46px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] px-3" />
                <span className="mt-[1rem] h-[34px] w-full text-sm leading-[22px] text-dark-gray">
                  Description
                </span>
                <textarea
                  className="my-5 h-[123px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] bg-[#F5F6FA] p-[12px] text-start text-sm"
                  placeholder="Write a detailed description"
                />
                <TagSelector />
              </div>

              <div className="flex w-full flex-row justify-center">
                <button
                  className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-sm font-normal text-[#515151] hover:bg-gray-200"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="mx-1 w-full max-w-[10rem] rounded bg-teal-800 p-3 text-sm font-normal text-[#FFFFFF] hover:bg-dark-teal">
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddFile;
