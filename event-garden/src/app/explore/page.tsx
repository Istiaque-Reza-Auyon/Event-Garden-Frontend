"use client";

import React from 'react';
import Event from '../component/Event';
import { IoStar } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import Dropdown from '../component/Dropdown';
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from 'next/link';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return (
        <button> 
            <Link href="/event">
                <div className='flex flex-col bg-[rgb(16,17,19)] h-auto overflow-y-scroll'>
                    
                    <div className='flex bg-[rgb(16,17,19)] w-[100%] pb-5'>
                        <div className='flex justify-center items-center w-[50%] border-e-2 border-b-2 border-[rgb(119,119,119)] py-[12px]'>
                            <IoStar style={{ color: 'white' }} className='mr-2'/>
                            <div className='text-[15px] text-[rgb(255,255,255)]'>FEATURED</div>
                        </div>
                        <div className='flex justify-center items-center w-[50%]  border-b-2 border-[rgb(119,119,119)]'>
                            <FaFilter style={{ color: 'white' }} className='mr-2'/>
                            <div className='text-[15px] text-[rgb(255,255,255)]'>FILTER</div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex justify-center items-center bg-[rgb(16,17,19)] pb-4 w-[50%]'>
                            <Dropdown options= {['Trending', 'Largest', 'Newest']}></Dropdown>
                            <RiArrowDropDownLine style={{ color: 'black' }}/>
                        </div>
                        <div className='flex justify-center items-center bg-[rgb(16,17,19)] pb-4 w-[50%]'>
                            <Dropdown options= {['This Week', 'Today', 'This Month', 'Right Now']}></Dropdown>
                            <RiArrowDropDownLine style={{ color: 'black'}}/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center bg-[rgb(16,17,19)] pb-6 w-[100%]'>
                        <p className='text-white pr-3'>in</p>
                        <Dropdown options= {['New York City', 'Miami', 'Los Angeles']}></Dropdown>
                        <RiArrowDropDownLine style={{ color: 'black'}}/>
                    </div>
                    <div className='flex flex-col items-center px-10  bg-[rgb(16,17,19)] h-screen'>
                        <Event></Event>
                    </div>
                </div>
            </Link>
        </button>    
    )
}
export default page;