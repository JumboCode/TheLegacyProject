import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

type AddFileProps = {
  showAddFilePopUp: boolean;
  setShowAddFilePopUp: Dispatch<SetStateAction<boolean>>;
};

const Tag = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-row rounded-xl bg-gray-300 py-1 px-3">
      <small>{text}</small>
    </div>
  );
};

const TagSelector = () => {
  const [selectedTags, setSelectedTags] = useState(["tag 3"]);
  const tagList = ["tag 1", "tag 2", "tag 3"];
  const [filterText, setFilterText] = useState("");

  const filteredTags = useMemo(
    () => tagList.filter((tag) => tag.indexOf(filterText) != -1),
    [filterText]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <div>
      <span className="h-[34px] w-full font-sans text-sm leading-[22px] text-dark-gray">
        Tags
      </span>
      <input
        className="mt-[1rem] h-[46px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] px-3"
        value={filterText}
        onChange={onChange}
      />
      <div className="flex flex-row p-3">
        {selectedTags.map((tag: string, i) => (
          <Tag key={i} text={tag} />
        ))}
      </div>
    </div>
  );
};

const AddFile = ({ showAddFilePopUp, setShowAddFilePopUp }: AddFileProps) => {
  const [fileName, setFilename] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleCancel = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };

  const addFile = async () => {
    const res = await fetch("/api/drive/addfile", {
      method: "POST",
      body: JSON.stringify({
        fileName: fileName,
        description: description,
      }),
    });
    if (res.status === 200) {
      setConfirm(true);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {showAddFilePopUp && (
        <div className="absolute flex h-full w-full flex-row items-center justify-center backdrop-blur-[2px] backdrop-brightness-75">
          {!confirm && !error ? (
            <div className="flex h-[700px] max-w-[35%] flex-col justify-between rounded-lg bg-white p-10">
              <div>
                <span className="my-5 h-[34px] w-full font-sans text-sm leading-[22px] text-dark-gray">
                  File name
                </span>
                <input
                  className="my-5 h-[46px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] px-3"
                  type="text"
                  value={fileName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFilename(e.target.value)
                  }
                />
                <span className="mt-[1rem] h-[34px] w-full text-sm leading-[22px] text-dark-gray">
                  Description
                </span>
                <textarea
                  className="my-5 h-[123px] max-h-[123px] min-h-[123px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] bg-[#F5F6FA] p-[12px] text-start text-sm"
                  placeholder="Write a detailed description"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                />
                <TagSelector />
              </div>

              <div className="flex w-full flex-row justify-center">
                <button
                  className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-sm font-normal text-[#515151] hover:bg-gray-200"
                  onClick={handleCancel}
                >
                  Cancel{" "}
                </button>
                <button
                  className="mx-1 w-full max-w-[10rem] rounded bg-teal-800 p-3 text-sm font-normal text-[#FFFFFF] hover:bg-dark-teal"
                  onClick={addFile}
                >
                  Create
                </button>
              </div>
            </div>
          ) : (
            <>
              {confirm ? (
                <div className="flex h-[700px] max-w-[35%] flex-col justify-between rounded-lg bg-white p-10">
                  <span>File added successfully!</span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-sm font-normal text-[#515151] hover:bg-gray-200"
                      onClick={() => setShowAddFilePopUp(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-[700px] max-w-[35%] flex-col justify-between rounded-lg bg-white p-10">
                  <span>Error in adding file...</span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-sm font-normal text-[#515151] hover:bg-gray-200"
                      onClick={() => setShowAddFilePopUp(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddFile;
