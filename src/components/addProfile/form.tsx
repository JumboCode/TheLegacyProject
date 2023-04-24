import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Icon = {
  preview: string | null;
  raw: File | null;
};

type ProfileProps<T extends { selectName: string[] }> = {
  placeholdData: T;
  profileLabels: T;
  dropData: string[];
  handleSubmit: React.FormEvent<HTMLFormElement>;
};

const AddProfileForm = <T extends { selectName: string[] }>({
  placeholdData,
  profileLabels,
  dropData,
  handleSubmit,
}: ProfileProps<T>) => {
  
  Object.keys(placeholdData).map((keyname) => (initialData[keyname] = ""));

  const [profileData, setProfileData] = useState<T>(initialData);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currIcon, setCurrIcon] = useState<Icon>({ preview: null, raw: null });

  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitWithState = React.useCallback(
    async (event: React.SyntheticEvent) => {
      console.log(event);
      event.preventDefault();
      handleSubmit(profileData);
    },
    [profileData]
  );

  const handleImageUploaded = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setCurrIcon({
        preview: URL.createObjectURL(event.target.files[0]!),
        raw: event.target.files[0]!,
      });
    }
  };

  const handleSelected = (item: string) => {
    setProfileData({
      ...profileData,
      selectName: item,
    });
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  useEffect(() => {
    if (showDropdown) {
      nameRef.current?.focus();
    } else {
      nameRef.current?.blur();
    }
  }, [showDropdown]);

  return (
    <section className="m-auto flex h-[80%] w-[96%] items-center justify-center overflow-scroll rounded-xl bg-white">
      <div className="flex h-[90%] w-full flex-col items-center justify-between gap-y-4">
        <div className="flex h-[26%] w-[15%] flex-col items-center">
          <label
            className="relative flex h-[5.5rem] w-[5.5rem] cursor-pointer items-center rounded-full bg-[#F5F6FA]"
            htmlFor="upload-button"
          >
            {currIcon.preview ? (
              <Image
                className="rounded-full"
                src={currIcon.preview}
                alt="preview"
                layout="fill"
              />
            ) : (
              <>
                <svg
                  className="absolute left-[29px] block"
                  width="30"
                  height="30"
                  viewBox="0 0 25 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.1548 17.2917C24.1548 17.8302 23.9347 18.3468 23.5429 18.7276C23.1512 19.1084 22.6198 19.3224 22.0658 19.3224H3.26484C2.7108 19.3224 2.17946 19.1084 1.78769 18.7276C1.39593 18.3468 1.17584 17.8302 1.17584 17.2917V6.12278C1.17584 5.58421 1.39593 5.06769 1.78769 4.68686C2.17946 4.30603 2.7108 4.09208 3.26484 4.09208H7.44282L9.53182 1.04602H15.7988L17.8878 4.09208H22.0658C22.6198 4.09208 23.1512 4.30603 23.5429 4.68686C23.9347 5.06769 24.1548 5.58421 24.1548 6.12278V17.2917Z"
                    stroke="#22555A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className="absolute left-[38.5px] block"
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.66534 9.261C7.97278 9.261 9.84333 7.44265 9.84333 5.19959C9.84333 2.95654 7.97278 1.13818 5.66534 1.13818C3.3579 1.13818 1.48735 2.95654 1.48735 5.19959C1.48735 7.44265 3.3579 9.261 5.66534 9.261Z"
                    stroke="#22555A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </label>
          <input
            className="hidden"
            id="upload-button"
            accept="image/*"
            type="file"
            onChange={handleImageUploaded}
          />
          <span className="mt-3 h-6 w-24 cursor-default text-center text-[14px] text-[#22555A]">
            Upload Photo
          </span>
        </div>

        <form
          className="flex h-[80%] w-full flex-col items-center justify-between"
          onSubmit={handleSubmitWithState}
        >

          {/* PUT IF SELECTNAME UP HERE */}
          <div className="grid h-full w-[70%] grid-cols-1 justify-items-center gap-5 gap-x-10 text-[#515151] md:grid-cols-2 md:gap-5">
            {Objct.keys(placeholdData).map((keyname) => (
              <div
                key={keyname}
                className="relative flex h-full w-full flex-col gap-y-1"
              >
                <label className="w-full text-[14px] font-normal">
                  {profileLabels[keyname]}
                </label>
                <input
                  className="h-10 w-full rounded border-[0.3px] border-[#A6A6A6] bg-[#F5F6FA] pl-[12px] text-[14px] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#A6A6A6] md:h-12"
                  placeholder={placeholdData[keyname]}
                  name={keyname}
                  type="text"
                  value={profileData[keyname]}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                ></input>
                {showDropdown &&
                  keyname == "selectName" &&
                  dropData.filter((item) =>
                    item
                      .toLowerCase()
                      .startsWith(profileData.selectName.toLowerCase())
                  ).length != 0 && (
                    <ul className="absolute top-[71px] z-10 w-full list-none rounded border-[0.3px] border-[#A6A6A6] bg-white pb-1 shadow-md">
                      {dropData
                        .filter((item) =>
                          item
                            .toLowerCase()
                            .startsWith(profileData.selectName.toLowerCase())
                        )
                        .map((item) => (
                          <li
                            className="py-1 pl-3"
                            key={item}
                            onClick={() => handleSelected(item)}
                          >
                            {item}
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            ))}

            <button
              className="text-md h-10 w-full justify-self-center rounded border-[1px] border-[#22555A] bg-white font-bold text-[#22555A] md:h-12 md:w-[70%] md:justify-self-end"
              type="reset"
            >
              Cancel
            </button>
            <button
              className="text-md h-10 w-full justify-self-center rounded bg-[#22555A] font-bold text-white md:h-12 md:w-[70%] md:justify-self-start"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProfileForm;
export type { ProfileProps };