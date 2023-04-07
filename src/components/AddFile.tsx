import React, { useState } from 'react';

const AddFile = () => {
  const [visibility, setVisibility] = useState<boolean>(true)

  const handleCancel = () => {
    setVisibility(!visibility);
  }

  return (
    <div className={`w-full h-full backdrop-blur-[2px] backdrop-brightness-75 absolute ${visibility ? '' : 'hidden'}`}>
      <div className='bg-[#FFFFFF] w-[500px] h-[700px] top-0 bottom-0 left-0 right-0 m-auto absolute rounded-[10px] flex flex-col px-[31px]'>

        <span className='w-full h-[34px] mt-[41px] text-sm leading-[22px] text-dark-gray font-sans'>File name</span>
        <input className='mt-[15px] rounded w-full h-[46px] border-[#e6e6e6] border-solid border-[0.3px]' />

        <span className='w-full h-[34px] text-sm mt-[22px] leading-[22px] text-dark-gray'>Description</span>
        <textarea className='mt-[15px] p-[12px] rounded w-full h-[123px] border-[#e6e6e6] border-solid border-[0.3px] bg-[#F5F6FA] text-sm text-start' 
          placeholder='Write a detailed description' 
        />

        {/* not sure the correct tag to use for tag inputs... */}
        <span className='w-full h-[34px] mt-[22px] text-sm leading-[22px] text-dark-gray font-sans'>Tags</span>
        <input className='mt-[15px] rounded w-full h-[46px] border-[#e6e6e6] border-solid border-[0.3px]' />

        <div className='w-[300px] h-[54px] flex flex-row mt-[154px] m-auto gap-4'>
          <button className='w-full text-sm bg-off-white text-[#515151] font-normal rounded'
            onClick={handleCancel}>Cancel</button>
          <button className='w-full text-sm bg-dark-teal text-[#FFFFFF] font-normal rounded'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default AddFile;

