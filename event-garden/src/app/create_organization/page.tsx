"use client";

import React, {useState} from 'react';
import Link from 'next/link';

type pageProps = {

};

const page:React.FC<pageProps> = () => {
    const options = ['Unites States', 'Canada', 'Mexico']
    const [selectedOption, setSelectedOption] = useState(options[1]);

    const handleChange = (option:any) => {
        setSelectedOption(option);
      };

    return (
        <div className='bg-[rgb(16,17,19)] h-screen overflow-y-scroll py-5 px-4'>
            <div className='flex justify-end pb-5'>
                <p className='flex justify-center items-center text-[rgb(212,213,215)] font-[DM Sans] mr-1'>Already have an organization?</p>
                <div className='flex justify-center items-center'><Link href="/my_organization" className='text-[rgb(233,186,0)] font-[DM Sans]'>My Dashboard</Link></div>
            </div>
            <h1 className='text-[rgb(230,232,239)] text-[34px]'>Create Organization</h1>
            <p className='text-[rgb(230,232,239)] py-4 mt-5'>Where will you be selling tickets?</p>
            <select value={selectedOption} onChange={handleChange} className="border-2 border-[rgb(119,119,119)] rounded-lg w-[100%] bg-[rgb(16,17,19)] text-[15px] text-[rgb(230,232,239)] p-3 ">
            {options.map((option)=><>
                <option value="" className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'>{option}</option>
             </>)}
            </select>
            <p className='text-[rgb(230,232,239)] py-4 mt-5'>What is your organization called?</p>
            <input type="text" placeholder='Brand Name' className="border-2 border-[rgb(119,119,119)] rounded-lg w-[100%] bg-[rgb(16,17,19)] text-[15px] text-[rgb(230,232,239)] p-3 " />
            <p className='text-[rgb(230,232,239)] py-4 mt-5'>Add your brand's logo. (Square)</p>
            <div className=''><input type="file" placeholder='text'/></div>
            <button className='flex justify-center items-center w-[100%] bg-[rgb(255,255,255)] rounded-full p-3 my-5 text-black'>Continue</button>
        </div>
    )
}
export default page;