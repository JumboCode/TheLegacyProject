import React, { Dispatch, SetStateAction, useState } from "react";
import FilterDropdown from "@components/filterDropdown";
import Tag from "@components/Tag";

type AddFileProps = {
  showAddFilePopUp: boolean;
  setShowAddFilePopUp: Dispatch<SetStateAction<boolean>>;
  seniorId: string;
  folder: string;
};



// const Tag = ({ text }: { text: string }) => {
//   return (
//     <div className="my-0.5 mx-0.5 flex flex-row rounded-lg bg-gray-300 py-1 px-3 text-base">
//       <span>{text}</span>
//     </div>
//   );
// };

const TagSelector = ({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const tagList = [
    "Getting to Know You",
    "Early Childhood",
    "Adolescence",
    "Early Twenties and College",
    "Career and Adulthood",
    "Marriage",
    "Parenthood and Family",
    "Elder Years and Retirement",
    "Beliefs, Values, and the Future",
  ];

  const tagColors: string[] = [
    "tag-rust",
    "tag-tan",
    "tag-gold",
    "tag-moss",
    "tag-teal",
    "tag-blue",
    "tag-violet",
    "tag-rose",
    "tag-steel",
  ];

  return (
    <div>
      <span className="h-[34px] w-full font-sans text-base leading-[22px] text-dark-gray">
        Tags
      </span>
      <FilterDropdown
        items={tagList}
        onItemSelect={(idx: number, item: string) => {
          if (!selectedTags.includes(item)) {
            setSelectedTags([...selectedTags, item]);
          } else {
            setSelectedTags(selectedTags.filter((i) => i != item));
          }
        }}
        selectedItems={selectedTags}
      />
      <div className="flex flex-row flex-wrap p-3">
        {selectedTags.map((tag: string, i) => (
          <div key={i}>
            {tagColors[i]}
            <Tag name={tag} color={'bg-' + tagColors[i]}/>
          </div>
          
        ))}
      </div>
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCancel = () => {
    setShowAddFilePopUp(!showAddFilePopUp);
  };

  const addFile = async () => {
    // POST file in drive
    const addFileRes = await fetch("/api/drive/addfile", {
      method: "POST",
      body: JSON.stringify({
        fileName: fileName,
        description: description,
        fileType: "Google Document",
        seniorId,
        tags: selectedTags,
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
        <div className="absolute z-50 flex h-full w-full flex-row items-center justify-center backdrop-blur-[2px] backdrop-brightness-75">
          {!confirm && !error ? (
            <div className="flex h-[700px] min-w-[400px] max-w-[35%] flex-col justify-between rounded-lg bg-white p-10">
              <div>
                <span className="my-5 h-[34px] w-full font-sans text-base leading-[22px] text-dark-gray">
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
                <span className="mt-[1rem] h-[34px] w-full text-base leading-[22px] text-dark-gray">
                  Description
                </span>
                <textarea
                  className="my-5 h-[123px] max-h-[123px] min-h-[123px] w-full rounded border-[0.3px] border-solid border-[#e6e6e6] bg-[#F5F6FA] p-[12px] text-start text-base"
                  placeholder="Write a detailed description"
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
                  className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-base font-normal text-[#515151] hover:bg-gray-200"
                  onClick={handleCancel}
                >
                  Cancel{" "}
                </button>
                <button
                  className="mx-1 w-full max-w-[10rem] rounded bg-teal-800 p-3 text-base font-normal text-[#FFFFFF] hover:bg-dark-teal"
                  onClick={addFile}
                >
                  Create
                </button>
              </div>
            </div>
          ) : (
            <>
              {confirm ? (
                <div className="flex h-[250px] max-w-[35%] flex-col justify-between rounded-lg bg-white p-10">
                  <span>File added successfully!</span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-base font-normal text-[#515151] hover:bg-gray-200"
                      onClick={() => setShowAddFilePopUp(false)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-[250px] max-w-[35%] flex-col justify-between text-base rounded-lg bg-white p-10 text-center text-dark-gray">
                  <span>There was an error adding your file. Please reach out to your club administrator for help.</span>
                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-base font-normal text-[#515151] hover:bg-gray-200"
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
