import React, { Dispatch, SetStateAction, useState } from "react";
import FilterDropdown from "@components/filterDropdown";
import Tag, { TagProps, tagList } from "@components/Tag";

type AddFileProps = {
  showAddFilePopUp: boolean;
  setShowAddFilePopUp: Dispatch<SetStateAction<boolean>>;
  seniorId: string;
  folder: string;
};

const TagSelector = ({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: TagProps[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
}) => {
  return (
    <div>
      <div className="h-[34px] mb-1 w-full font-sans text-lg text-neutral-600">
        Tags
      </div>
      <FilterDropdown<TagProps>
        items={tagList}
        filterMatch={(tag, text) => tag.name.indexOf(text) != -1}
        display={(tag) => (<Tag name={tag.name} color={tag.color}/>)}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
      />
    </div>
  );
};

const AddFile = ({
  showAddFilePopUp,
  setShowAddFilePopUp,
  seniorId,
  folder,
}: AddFileProps) => {
  const [fileName, setFilename] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);

  const handleCancel = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };

  const callAddFile = async () => {
    // POST file in drive
    const addFileRes = await fetch("/api/drive/addfile", {
      method: "POST",
      body: JSON.stringify({
        fileName: fileName,
        description: description,
        fileType: "Google Document",
        seniorId: seniorId,
        tags: selectedTags.map((tagProp) => tagProp.name),
        folder: folder,
      }),
    });

    if (addFileRes.status === 200) {
      setConfirm(true);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {showAddFilePopUp && (
        <div className="absolute z-50 flex h-full w-screen flex-row items-start justify-center backdrop-blur-[2px] backdrop-brightness-75 md:w-full">
          {!confirm && !error ? (
            <div className="flex min-h-[650px] w-1/2 mt-20 p-10 flex-col justify-between rounded-lg bg-white">
              <div>
                <div className="mb-8 font-serif text-3xl"> Create New File </div>
                <div className="mb-1 h-[34px] w-full font-sans text-lg text-neutral-600">
                  File name
                </div>
                <input
                  className="mb-5 h-[46px] w-full rounded border-2 border-tan px-3"
                  type="text"
                  value={fileName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFilename(e.target.value)
                  }
                />
                <div className="mb-1 h-[34px] w-full text-lg text-neutral-600">
                  Description
                </div>
                <textarea
                  className="mb-4 h-1/2 w-full rounded border-2 border-tan bg-off-white p-[12px] text-start text-base"
                  placeholder=""
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                />
                <TagSelector
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </div>

              <div className="flex w-full flex-row justify-center">
                <button
                  className="mx-2 my-4 w-full p-3 max-w-[10rem] rounded drop-shadow-md bg-off-white text-lg font-normal hover:bg-offer-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="mx-2 my-4 w-full p-3 max-w-[10rem] rounded drop-shadow-md bg-legacy-teal text-lg font-normal text-white hover:bg-dark-teal"
                  onClick={callAddFile}
                >
                  Create
                </button>
              </div>
            </div>
          ) : (
            <>
              {confirm ? (
                <div className="flex-row self-center h-[250px] max-w-[35%] flex-col place-content-center gap-y-10 rounded-lg bg-white p-10 text-center text-lg">
                  <span>File added successfully!</span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-legacy-teal p-3 text-md font-serif font-normal text-white hover:bg-dark-teal"
                      onClick={() => setShowAddFilePopUp(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex self-center h-[250px] max-w-[35%] flex-col place-content-center gap-y-10 rounded-lg bg-white p-10 text-center text-lg">
                  <span>
                    There was an error adding your file. Please reach out to
                    your club administrator for assistance.
                  </span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-legacy-teal p-3 text-md font-serif font-normal text-white hover:bg-dark-teal"
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
