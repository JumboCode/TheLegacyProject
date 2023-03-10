import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Icon = {
  preview: string | null;
  raw: File | null;
}

type ProfileProps<T extends {selectName: string}> = {
    placeholdData: T,
    profileLabels: T,
    handleSubmit: Function
}
 

const AddProfileForm = <T extends {selectName: string}>({
    placeholdData, 
    profileLabels,
    handleSubmit
}: ProfileProps<T>) => {

  const initialData = {}
  Object.keys(placeholdData).map((keyname) => (initialData[keyname] = ''));

  const [profileData, setProfileData] = useState<T>(initialData);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currIcon, setCurrIcon] = useState<Icon>({ preview: null, raw: null });

  // sample names   
  const [nameSuggestions, setNameSuggestions] = useState(['Skylar', 'Michael']);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitWithState = React.useCallback(async (event: React.SyntheticEvent) => {
    console.log(event)
    event.preventDefault();
    handleSubmit(profileData);
  }, [profileData])

  const handleImageUploaded = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCurrIcon({
        preview: URL.createObjectURL(event.target.files[0]!),
        raw: event.target.files[0]!
      });
    }
  }

  const handleSelected = (item: string) => {
    setProfileData({
      ...profileData,
      selectName: item
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
    <section className='flex items-center justify-center bg-white m-auto w-[96%] rounded-xl h-[80%] overflow-scroll'>
      <div className='flex flex-col gap-y-4 w-full h-[90%] justify-between items-center'>

        <div className='flex flex-col w-[15%] h-[26%] items-center'>
          <label className='rounded-full relative bg-[#F5F6FA] w-[5.5rem] h-[5.5rem] flex items-center cursor-pointer' htmlFor='upload-button'>
            {currIcon.preview
              ? <Image className='rounded-full'
                  src={currIcon.preview}
                  alt="preview"
                  layout='fill'
                />
              : <>
                  <svg className='block absolute left-[29px]' 
                    width="30" 
                    height="30" 
                    viewBox="0 0 25 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24.1548 17.2917C24.1548 17.8302 23.9347 18.3468 23.5429 18.7276C23.1512 19.1084 22.6198 19.3224 22.0658 19.3224H3.26484C2.7108 19.3224 2.17946 19.1084 1.78769 18.7276C1.39593 18.3468 1.17584 17.8302 1.17584 17.2917V6.12278C1.17584 5.58421 1.39593 5.06769 1.78769 4.68686C2.17946 4.30603 2.7108 4.09208 3.26484 4.09208H7.44282L9.53182 1.04602H15.7988L17.8878 4.09208H22.0658C22.6198 4.09208 23.1512 4.30603 23.5429 4.68686C23.9347 5.06769 24.1548 5.58421 24.1548 6.12278V17.2917Z" 
                      stroke="#22555A" 
                      strokeWidth="1.2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg className='block absolute left-[38.5px]' 
                    width="11" 
                    height="10" 
                    viewBox="0 0 11 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.66534 9.261C7.97278 9.261 9.84333 7.44265 9.84333 5.19959C9.84333 2.95654 7.97278 1.13818 5.66534 1.13818C3.3579 1.13818 1.48735 2.95654 1.48735 5.19959C1.48735 7.44265 3.3579 9.261 5.66534 9.261Z" 
                      stroke="#22555A" 
                      strokeWidth="1.2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
            }
          </label>
          <input className='hidden'
            id='upload-button'
            accept="image/*"
            type='file'
            onChange={handleImageUploaded}
          />
          <span className='text-[14px] text-[#22555A] w-24 h-6 mt-3 text-center cursor-default'>
            Upload Photo
          </span>
        </div>

        <form className='flex flex-col w-full h-[80%] justify-between items-center' onSubmit={handleSubmitWithState}>
            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-5 gap-x-10 w-[70%] h-full justify-items-center text-[#515151]'>
                    {Object.keys(placeholdData).map(
                        (keyname) =>(
                            <div className='flex flex-col gap-y-1 w-full h-full'>
                                <label className='w-full text-[14px] font-normal'>{profileLabels[keyname]}</label>
                                <input className='w-full md:h-12 h-10 bg-[#F5F6FA] text-[14px] rounded border-[0.3px] border-[#A6A6A6] placeholder:text-[#A6A6A6] placeholder:font-normal placeholder:text-[14px] pl-[12px]' 
                                placeholder={placeholdData[keyname]}
                                name={keyname}
                                type='text'
                                value={profileData[keyname]} 
                                onChange={handleChange}>
                                </input>
                            </div>))
                    }
                    {/* TODO: FIX DROPDOWN! */}
                    {showDropdown && nameSuggestions.filter((item) => item.toLowerCase().startsWith(profileData.selectName.toLowerCase())).length != 0 && (
                        <ul className='bg-white rounded border-[0.3px] border-[#A6A6A6] absolute w-full top-[71px] list-none shadow-md pb-1'>
                            {nameSuggestions
                            .filter((item) => item.toLowerCase().startsWith(profileData.selectName.toLowerCase()))
                            .map((item, index) => (
                                (index < 3) && (
                                <li className='pl-3 py-1' key={item} onClick={() => handleSelected(item)}>
                                    {item}
                                </li>
                                )
                            ))
                            }
                        </ul>
                    )}
                <button className='md:w-[70%] md:h-12 h-10 w-full md:justify-self-end justify-self-center border-[1px] border-[#22555A] bg-white text-md text-[#22555A] font-bold rounded' type='reset'>Cancel</button>
                <button className='md:w-[70%] md:h-12 h-10 w-full md:justify-self-start justify-self-center bg-[#22555A] text-md text-white font-bold rounded' type='submit' >Save</button>
            </div>
        </form>

      </div>
    </section>
  )
}

export default AddProfileForm;