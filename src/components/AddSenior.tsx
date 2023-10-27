import React, { Dispatch, SetStateAction, useState } from "react";
import Image, { StaticImageData } from "next/legacy/image";
import cn from "classnames";
import FilterDropdown from "@components/FilterDropdown";
import { Senior, User } from "@prisma/client";
import ImageIcon from "../../public/icons/icon_add_photo.png";

type AddSeniorProps = {
  seniors: Senior[];
  students: User[];
  setSeniors: Dispatch<SetStateAction<Senior[]>>;
  showAddSeniorPopUp: boolean;
  setShowAddSeniorPopUp: Dispatch<SetStateAction<boolean>>;
  seniorPatch: string;
  setSeniorPatch: Dispatch<SetStateAction<string>>;
};

type AddSeniorTileProps = {
  showAddSeniorPopUp: boolean;
  setShowAddSeniorPopUp: Dispatch<SetStateAction<boolean>>;
  setSeniorPatch: Dispatch<SetStateAction<string>>;
};

export const AddSeniorTile = ({
  showAddSeniorPopUp,
  setShowAddSeniorPopUp,
  setSeniorPatch,
}: AddSeniorTileProps) => {
  const handlePopUp = () => {
    setShowAddSeniorPopUp(!showAddSeniorPopUp);
    setSeniorPatch("");
  };

  return (
    <button onClick={handlePopUp}>
      <div className="relative flex aspect-square w-auto flex-col items-center rounded bg-white font-medium drop-shadow-md hover:bg-off-white">
        <div className="flex h-1/2 flex-col justify-end">
          <Image
            className="object-scale-down"
            src={"/profile/addprofile_icon.png"}
            alt="Add profile image"
            height={75}
            width={75}
          />
        </div>
        <div className="relative flex h-1/2 w-full flex-col p-2 text-center text-lg font-medium">
          <span className="text-neutral-800 break-words px-2">
            Add New Senior
          </span>
        </div>
      </div>
    </button>
  );
};

const StudentSelector = ({
  students,
  selectedStudents,
  setSelectedStudents,
}: {
  students: User[];
  selectedStudents: User[];
  setSelectedStudents: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  return (
    <div>
      <div className="text-neutral-600 mb-1 h-[34px] w-full font-merriweather text-lg">
        Assign students
      </div>
      <FilterDropdown<User>
        items={students}
        filterMatch={(usr, term) => (usr.name ?? "").indexOf(term) != -1}
        display={(usr: User) => (
          <div className="m-1 flex whitespace-nowrap rounded-full bg-amber-red px-4 py-2 text-white">
            {usr.name}
            <div className="flex1 ml-3">
              <button
                type="button"
                onClick={() =>
                  setSelectedStudents(
                    selectedStudents.filter((item) => item.id !== usr.id)
                  )
                }
              >
                &#x2715;
              </button>
            </div>
          </div>
        )}
        selectedItems={selectedStudents}
        setSelectedItems={setSelectedStudents}
      />
    </div>
  );
};

type SeniorData = {
  name: string;
  location: string;
  description: string;
};

const AddSenior = ({
  seniors,
  students,
  setSeniors,
  showAddSeniorPopUp,
  setShowAddSeniorPopUp,
  seniorPatch,
  setSeniorPatch,
}: AddSeniorProps) => {
  const emptySenior: SeniorData = {
    name: "",
    location: "",
    description: "",
  };
  const [seniorData, setSeniorData] = useState<SeniorData>(emptySenior);
  const [selectedStudents, setSelectedStudents] = useState<User[]>([]);
  const [currentImage, setCurrentImage] = useState<string | StaticImageData>(
    ImageIcon
  );
  const [confirm, setConfirm] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handlePopUp = () => {
    setShowAddSeniorPopUp(!showAddSeniorPopUp);
    setSeniorData(emptySenior);
    setSelectedStudents([]);
  };

  const handleConfirm = () => {
    handlePopUp();
    setConfirm(false);
    setError(false);
  };

  const updateSeniorStudents = async (seniorID: string) => {
    let currRes = await fetch("/api/senior/" + seniorID + "/students", {
      method: "GET",
      body: null,
    });

    if (currRes.status != 200) {
      return currRes;
    }

    const oldStudentsData = await currRes.json();
    const oldStudents = oldStudentsData["students"] as User[];

    const removedStudents = oldStudents.filter(
      (usr) => !selectedStudents.includes(usr, 0)
    );
    const newStudents = selectedStudents.filter(
      (usr) => !oldStudents.includes(usr, 0)
    );

    removedStudents.map(async (usr) => {
      // remove this Senior from Student
      currRes = await fetch("/api/student/" + usr.id, {
        method: "PATCH",
        body: JSON.stringify({
          SeniorIDs: usr.SeniorIDs.filter((id) => id != seniorID),
        }),
      });

      if (currRes.status != 200) {
        return currRes;
      }
      console.log("Removed " + usr.name + " from senior " + seniorID);
    });

    newStudents.map(async (usr) => {
      // add this Senior from Student
      currRes = await fetch("/api/student/" + usr.id, {
        method: "PATCH",
        body: JSON.stringify({
          SeniorIDs: [...usr.SeniorIDs, seniorID],
        }),
      });

      if (currRes.status != 200) {
        return currRes;
      }
      console.log("Added " + usr.name + " to senior " + seniorID);
    });

    return currRes;
  };

  const patchAddSenior = async () => {
    // put accumulated students into senior model data
    const seniorModel = {
      ...seniorData,
      StudentIDs: selectedStudents.map((usr) => usr.id),
    };

    // PATCH existing senior model in database
    let currRes = await fetch("/api/senior/" + seniorPatch, {
      method: "PATCH",
      body: JSON.stringify(seniorModel),
    });
    const newerSeniorObj = await currRes.json();

    if (currRes.status === 200) {
      // PATCH students models previously and newly associated with senior model
      currRes = await updateSeniorStudents(seniorPatch);

      if (currRes.status === 200) {
        setConfirm(true);
        const newSeniors = seniors.filter((i) => i.id !== newerSeniorObj.id);
        setSeniors([...newSeniors, newerSeniorObj]);
      }
    }
    // check after both API calls
    if (currRes.status != 200) {
      console.log(
        currRes.text().then((text) => {
          console.log(text);
        })
      );
      setError(true);
    }

    setSeniorData(emptySenior);
    setSeniorPatch(""); // empty string used as falsey value to indicate update or patch
  };

  const postAddSenior = async () => {
    // put accumulated students into senior model data
    const seniorModel = {
      ...seniorData,
      StudentIDs: selectedStudents.map((usr) => {
        console.log(usr.id);
        return usr.id;
      }),
    };

    // POST new senior model to database
    let currRes = await fetch("/api/seniors/add", {
      method: "POST",
      body: JSON.stringify(seniorModel),
    });
    const newSeniorObj = await currRes.json();

    if (currRes.status === 200) {
      // PATCH students models previously and newly associated with senior model
      currRes = await updateSeniorStudents(newSeniorObj.id);

      if (currRes.status === 200) {
        setConfirm(true);
        setSeniors([...seniors, newSeniorObj]);
      }
    }
    // check after both API calls
    if (currRes.status != 200) {
      console.log(
        currRes.text().then((text) => {
          console.log(text);
        })
      );
      setError(true);
    }

    setSeniorData(emptySenior);
    setSelectedStudents([]);
  };

  const handleImageReplace = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    if (!selectedFile) return;
    const reader = new FileReader();

    reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
      const dataUrl = loadEvent.target?.result;
      if (typeof dataUrl === "string") {
        setCurrentImage(dataUrl);
      }
    };

    reader.readAsDataURL(selectedFile);
  };
  return (
    <>
      {showAddSeniorPopUp && (
        <div
          className="absolute bottom-0 left-0 top-10 z-50 flex w-screen flex-row items-center justify-center
                        text-left md:w-full"
        >
          <div
            className={cn(
              "top-5% flex h-[85%] w-[60%] max-w-[495px] flex-col justify-between overflow-auto rounded-lg bg-dark-teal px-6 py-9 font-merriweather text-white",
              confirm || error
                ? "top-[5.5%] w-2/5"
                : "top-[2.5%] sm:w-4/5 md:w-1/2"
            )}
          >
            {!confirm && !error ? (
              <>
                <div>
                  <div className="mb-5 font-serif text-xl font-extrabold sm:text-center md:text-left">
                    {seniorPatch ? "Update" : "Add New"} Senior
                  </div>
                  <div>
                    <div className=" relative mb-4 flex h-2 w-2 flex-col items-center justify-center gap-10 rounded bg-white p-10">
                      <Image
                        src={currentImage}
                        alt="Description"
                        layout="fill"
                      />
                      <input
                        type="file"
                        className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                        onChange={handleImageReplace}
                      />
                    </div>
                  </div>

                  {/* Todo: First and Last name values are stored into the seniorData.name field. Seperate into two fields
                  later as seniorData.name propgates to backend*/}
                  <div className="flex">
                    <div className="mr-2 flex-1 flex-col">
                      <div className="text-neutral-600 mb-2 h-[19px] w-full font-merriweather text-base">
                        {" "}
                        First name{" "}
                      </div>
                      <input
                        className="mb-3 h-[36px] w-full rounded-md border-2 border-solid border-tan px-3 text-sm text-black"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSeniorData({
                            ...seniorData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="ml-2 flex-1 flex-col">
                      <div className="text-neutral-600 mb-2 h-[19px] w-full font-merriweather text-base">
                        {" "}
                        Last name{" "}
                      </div>
                      <input
                        className="mb-3 h-[36px] w-full rounded-md border-2 border-solid border-tan px-3 text-sm text-black"
                        type="text"
                        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSeniorData((seniorData) => ({
                            ...seniorData,
                            name: seniorData.name + " " + e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="text-neutral-600 mb-2 h-5 w-full font-merriweather text-base">
                    {" "}
                    Location{" "}
                  </div>
                  <input
                    className="mb-3 h-9 w-full rounded-md border-2 border-solid border-tan px-3 text-sm text-black"
                    type="text"
                    value={seniorData.location}
                    placeholder="Where are you and your senior meeting?"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSeniorData({ ...seniorData, location: e.target.value })
                    }
                  />

                  <div className="text-neutral-600 mb-5 h-2 w-full text-base">
                    {" "}
                    Description{" "}
                  </div>
                  <textarea
                    className="h-25 mb-3 min-h-[20px] w-full rounded-md border-2 border-solid border-tan bg-white p-[10px] text-start text-sm text-black"
                    placeholder="Write a brief description about the senior"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setSeniorData({
                        ...seniorData,
                        description: e.target.value,
                      })
                    }
                  />

                  <StudentSelector
                    students={students}
                    selectedStudents={selectedStudents}
                    setSelectedStudents={setSelectedStudents}
                  />

                  <div className="top-0 flex max-h-[36px] w-full flex-row justify-center">
                    <button
                      className=" mx-2 flex max-h-[36px] w-24 items-center justify-center rounded-xl bg-white 
                                  px-4 py-2 text-[18px] font-normal text-dark-teal drop-shadow-md hover:bg-off-white"
                      onClick={handlePopUp}
                    >
                      Cancel
                    </button>
                    <button
                      className=" mx-2 flex max-h-[36px] w-24 items-center justify-center rounded-xl bg-white 
                      px-4 py-2 text-[18px] font-normal text-dark-teal drop-shadow-md hover:bg-off-white"
                      onClick={seniorPatch ? patchAddSenior : postAddSenior}
                    >
                      {seniorPatch ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {confirm ? (
                  <div className="flex flex-col items-center">
                    <div className="mb-8 text-center font-serif text-3xl">
                      {seniorPatch ? "Updated" : "Added"} successfully!
                    </div>
                    <button
                      className="font-large mx-1 w-full max-w-[10rem] rounded bg-white p-3 text-lg text-dark-teal drop-shadow-md hover:bg-off-white"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center break-words">
                    <div className="mb-8 text-center font-serif text-xl">
                      There was an error adding your senior. Please reach out to
                      your club administrator for help.
                    </div>
                    <button
                      className="mx-1 w-full max-w-[10rem] rounded bg-off-white p-3 text-lg font-normal drop-shadow-md hover:bg-offer-white"
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <AddSeniorTile
        showAddSeniorPopUp={showAddSeniorPopUp}
        setShowAddSeniorPopUp={setShowAddSeniorPopUp}
        setSeniorPatch={setSeniorPatch}
      />
    </>
  );
};

export default AddSenior;
