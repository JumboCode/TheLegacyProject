import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image"; 
import cn from "classnames";
import FilterDropdown from "@components/filterDropdown";
import { Senior, File } from "@prisma/client"

type AddSeniorProps = {
  seniors: Senior [],
  setSeniors: Dispatch<SetStateAction<Senior[]>>,
  showAddSeniorPopUp: boolean;
  setShowAddSeniorPopUp: Dispatch<SetStateAction<boolean>>;
};


export const AddSeniorTile = ({showAddSeniorPopUp, setShowAddSeniorPopUp}: AddSeniorProps) => {

  const handlePopUp = () => {
    setShowAddSeniorPopUp(!showAddSeniorPopUp);
  };

  return (
  <button onClick={handlePopUp}>
    <div className="relative w-auto flex flex-col aspect-square items-center rounded bg-white hover:bg-off-white font-medium drop-shadow-md">
      <div className="flex flex-col h-1/2 justify-end">
        <Image
          className="object-scale-down"
          src={"/profile/addprofile_icon.png"}
          alt="Add profile image"
          height={75}
          width={75}
        />
      </div>
      <div className="relative h-1/2 w-full p-2 flex flex-col font-medium text-center text-lg">
          <span className="break-words px-2 text-neutral-800"> Add New Senior </span>
      </div>
    </div>
  </button>);
};

const StudentSelector = ({
  selectedStudents,
  setSelectedStudents,
}: {
  selectedStudents: string[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div>
      <div className="h-[34px] mb-1 w-full font-sans text-lg text-neutral-600">
        Students
      </div>
      <FilterDropdown
        items={["TODO: STUDENT LIST"]}
        onItemSelect={(idx: number, item: string) => {
          if (!selectedStudents.includes(item)) {
            setSelectedStudents([...selectedStudents, item]);
          } else {
            setSelectedStudents(selectedStudents.filter((i) => i != item));
          }
        }}
        selectedItems={selectedStudents}
      />
      <div className="flex flex-row flex-wrap my-2">
        {selectedStudents.map((student: string, i: number) => (
          <p key={i}> {student} </p>
        ))}
      </div>
    </div>
  );
};

const AddSenior = ({
  seniors,
  setSeniors,
  showAddSeniorPopUp,
  setShowAddSeniorPopUp,
}: AddSeniorProps) => {
  const [seniorName, setSeniorName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [confirm, setConfirm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handlePopUp = () => {
    setShowAddSeniorPopUp(!showAddSeniorPopUp);
  };

  const handleConfirm = () => {
    handlePopUp();
    setConfirm(false);
    setError(false);
  }


  const callAddSenior = async () => {
    // POST new senior model to database

    const newSenior = {
      name: seniorName,
      location: location,
      description: description,
      StudentIDs: []
    }
    
    const AddSeniorRes = await fetch("/api/seniors/add", {
      method: "POST",
      body: JSON.stringify(newSenior),
    });

    if (AddSeniorRes.status === 200) {
      setConfirm(true);
      const newSeniorObj = await AddSeniorRes.json();
      console.log(newSeniorObj);
      setSeniors([...seniors, newSeniorObj]);
    } else {
      console.log(AddSeniorRes.text().then((text) => { console.log(text); }));
      setError(true);
    }
  };

  return (
    <>
      {showAddSeniorPopUp && 
        (
        <div className="absolute top-0 left-0 z-50 flex h-full w-screen flex-row items-start justify-center \
                        text-left backdrop-blur-[2px] backdrop-brightness-75 md:w-full">
          
          <div className={cn("flex min-h-1/4 p-10 flex-col justify-between rounded-lg bg-white", 
                          confirm || error ? "mt-[12.5%] w-2/5" : "sm:mt-10 md:mt-20 sm:w-4/5 md:w-1/2")}>
          {!confirm && !error ? (
                <>
                  <div>
                    <div className="mb-8 sm:text-center md:text-left font-serif text-3xl"> Add New Senior </div>

                    <div className="mb-1 h-[34px] w-full font-sans text-lg text-neutral-600"> Name </div>
                    <input
                      className="mb-5 h-[46px] w-full rounded border-2 border-solid border-nav-taupe px-3"
                      type="text"
                      value={seniorName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSeniorName(e.target.value)
                      }
                    />

                    <StudentSelector
                      selectedStudents={selectedStudents}
                      setSelectedStudents={setSelectedStudents}
                    />

                    <div className="mb-1 h-[34px] w-full font-sans text-lg text-neutral-600"> Location </div>
                    <input
                      className="mb-5 h-[46px] w-full rounded border-2 border-solid border-nav-taupe px-3"
                      type="text"
                      value={location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLocation(e.target.value)
                      }
                    />


                    <div className="mb-1 h-[34px] w-full text-lg text-neutral-600"> Description </div>
                    <textarea
                      className="mb-4 h-1/2 min-h-[46px] w-full rounded border-2 border-solid border-nav-taupe bg-off-white p-[12px] text-start text-base"
                      placeholder=""
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                      }
                    />
                  </div>

                  <div className="flex w-full flex-row justify-center">
                    <button
                      className="mx-2 my-4 w-full p-3 max-w-[10rem] rounded drop-shadow-md bg-off-white text-lg font-normal \
                                hover:bg-offer-white"
                      onClick={handlePopUp}
                    >
                      Cancel
                    </button>
                    <button
                      className="mx-2 my-4 w-full p-3 max-w-[10rem] rounded drop-shadow-md bg-nav-teal text-lg font-normal text-white \
                                hover:bg-dark-teal"
                      onClick={callAddSenior}
                    >
                      Create
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {confirm ? (
                    <div className="flex flex-col items-center">
                      <div className="mb-8 text-center font-serif text-3xl">
                        {seniorName === "" ? "Senior" : seniorName} was added successfully!
                      </div>
                        <button
                        className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-lg font-normal drop-shadow-md hover:bg-offer-white"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col break-words items-center">
                      <div className="mb-8 text-center font-serif text-xl">
                        There was an error adding your senior. Please reach out to your club administrator for help.
                      </div>
                        <button
                        className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-lg font-normal drop-shadow-md hover:bg-offer-white"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </>)}
          </div>
        </div>
        )
      }
        <button onClick={handlePopUp}>
          <div className="relative w-auto flex flex-col aspect-square items-center rounded bg-white hover:bg-off-white font-medium drop-shadow-md">
            <div className="flex flex-col h-1/2 justify-end">
              <Image
                className="object-scale-down"
                src={"/profile/addprofile_icon.png"}
                alt="Add profile image"
                height={75}
                width={75}
              />
            </div>
            <div className="relative h-1/2 w-full p-2 flex flex-col font-medium text-center text-lg">
                <span className="break-words px-2 text-neutral-800"> Add New Senior </span>
            </div>
          </div>
        </button>
    </>
  );
};

export default AddSenior;