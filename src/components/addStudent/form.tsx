import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Student = {
  icon: Icon;
  firstName: string;
  lastName: string;
  seniorName: string;
  pronouns: string;
  classYear: string;
  email: string;
}

type Icon = {
  preview: string | null;
  raw: File | null;
}


const AddStudentForm = () => {
  const [studentData, setStudentData] = useState<Student>({
    icon: {
      preview: null,
      raw: null
    },
    firstName: '',
    lastName: '',
    seniorName: '',
    pronouns: '',
    classYear: '',
    email: '',
  });

  const [showDropdown, setShowDropdown] = useState(false);
  // sample names
  const [seniorSuggestions, setSeniorSuggestions] = useState(['John Doe', 'Jane Doe', 'James Doe', 'Jack Doe', 'Jake Doe']);
  const seniorRef = useRef<HTMLInputElement>(null);
  // const [errors, setErrors] = useState({});

  // const validate = (data) = {}
  // const getSeniors = async () => {}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setErrors(validate(studentData));

    // const data = JSON.stringify(studentData);
    // const endpoint = '/api/students';
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: data,
    // };
    // const response = await fetch(endpoint, options);
    // const result = await response.json();
    // console.log(result);
    
    // for now
    console.log(studentData);
  }

  const handleImageUploaded = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setStudentData({
        ...studentData,
        icon: {
          preview: URL.createObjectURL(event.target.files[0]!),
          raw: event.target.files[0]!
        }
      });
    }
  }

  const handleSelected = (item: string) => {
    setStudentData({
      ...studentData,
      seniorName: item
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
      seniorRef.current?.focus();
    } else {
      seniorRef.current?.blur();
    }
  }, [showDropdown]);

  type StudentFieldProps = {
    label: string,
    elemName: string,
    value: string,
    ref: Object,
    onFocus: Function,
    onBlur: Function
  }

    // React tries to re-render entire component
    const AddStudentField = ({label, elemName, value, placeholder, ref, dropdown,
                            onFocus, onBlur}: StudentFieldProps) => {

        const applyDropdown = (showDropdown && (dropdown != undefined) && 
                            dropdown.filter((item) => item.toLowerCase().startsWith(value.toLowerCase())).length != 0);
        return (
            <div className='flex flex-col w-full h-[26.6%]'>
                <label className='w-full h-[37%] text-[14px] font-normal'>{label}</label>
                <input className='w-full h-[71px] bg-[#F5F6FA] rounded border-[0.3px] border-[#A6A6A6] placeholder:text-[#A6A6A6] placeholder:font-normal placeholder:text-[14px] pl-[12px]'
                    name={elemName}
                    type='text'
                    value={value} 
                    placeholder={placeholder}
                    ref={ref}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}>
                </input>
            
            { applyDropdown && (
                <ul className='bg-white rounded border-[0.3px] border-[#A6A6A6] absolute w-full top-[71px] list-none shadow-md pb-1'>
                {dropdown
                    .filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
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
            </div>
        );
    }


  return (
    <section className='flex items-center justify-center bg-white m-auto w-[96%] rounded-xl h-[72%]'>
      <div className='flex flex-col w-[75%] h-[78%] justify-between items-center'>

        <div className='flex flex-col w-[15%] h-[26%] items-center'>
          <label className='rounded-full relative bg-[#F5F6FA] w-[5.5rem] h-[5.5rem] flex items-center cursor-pointer' htmlFor='upload-button'>
            {studentData.icon.preview
              ? <Image className='rounded-full'
                  src={studentData.icon.preview}
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

        <form className='flex flex-col w-full h-[70%] justify-between items-center' onSubmit={handleSubmit}>
          <div className='flex flex-row w-[98%] h-[75%] justify-between items-center'>
            <div className='flex flex-col w-[47%] h-full justify-between text-[#515151]'>
              <AddStudentField elemName={'firstName'} label={'First Name'} 
                               value={studentData.firstName}
                               placeholder={'Enter their first name'} />

              <AddStudentField elemName={'seniorName'} label={'Senior Name'}
                               value={studentData.seniorName} ref={seniorRef}
                               placeholder={'Enter their senior\'s name'}
                               onBlur={handleBlur} onFocus={handleFocus}
                               dropdown={seniorSuggestions}/>

              <AddStudentField elemName={'classYear'} label={'Class Year'} 
                               value={studentData.classYear}
                               placeholder={'Enter their first name'} />
            </div>

            <div className='flex flex-col w-[47%] h-full justify-between text-[#515151]'>
              <AddStudentField elemName={'lastName'} label={'Last Name'} 
                               value={studentData.lastName}
                               placeholder={'Enter their last name'} />
    
              <AddStudentField elemName={'pronouns'} label={'Pronouns'} 
                               value={studentData.pronouns}
                               placeholder={'Enter their pronouns'} />

              <AddStudentField elemName={'email'} label={'Email'} 
                               value={studentData.email}
                               placeholder={'Enter their email'} />
            </div>
          </div>

          <div className='flex flex-row w-[50%] h-[15%] justify-between'>
            <button className='w-[44%] h-full border-[1px] border-[#22555A] bg-white text-md text-[#22555A] font-bold rounded' type='reset'>Cancel</button>
            <button className='w-[44%] h-full bg-[#22555A] text-md text-white font-bold rounded' type='submit' >Save</button>
          </div>
        </form>

      </div>
    </section>
  )
}

export default AddStudentForm;