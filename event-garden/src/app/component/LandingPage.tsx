"use client";

import React from 'react';
import  { useState }  from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Link from 'next/link';

type LandingPageProps = {
};

const LandingPage:React.FC<LandingPageProps> = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className='px-[30px] py-[15px]'>
    {isOpen === false ? (
    <>
      <NavBar toggleMenu={toggleMenu} />
      <div className='flex flex-col'>
        <h1 className='flex items-center text-white text-[35px] leading-[1.1] font-[DM Sans] '>Scale your brand with </h1>
        <span className='flex items-center text-[35px] bg-clip-text text-transparent bg-gradient-to-r from-[#FFCC00] to-[#FF007A] font-[DM Sans]'>experiences</span>
      </div>
      <div className='flex flex-row items-center mt-2'>
        <img className='size-14 rounded-full mr-[-12px]' src="https://posh-b1.s3.us-east-2.amazonaws.com/attendee-avi/60a5d1c78001910015ed1eeb.jpg"/>
        <img className='size-14 rounded-full mr-[-12px]' src="https://posh-b1.s3.us-east-2.amazonaws.com/attendee-avi/60ad7b631fc9310015a13168.jpg"/>
        <img className='size-14 rounded-full' src="https://posh-b1.s3.us-east-2.amazonaws.com/attendee-avi/60b1250e75673d001517dd7c.jpg"></img>
        <p className='text-white ml-4 font-[DM Sans] text-[18px]'>Join <b>event-goers</b>,<b>creators</b> and <b>organizers</b> in an advanced live event ecosystem on web.</p>
      </div>
      <div className='flex flex-col'>
        <button className='bg-[rgb(255,204,0)] px-[14px] py-[14px] mt-4 rounded-[15px]'><Link href="/create_event">Launch An Event</Link></button>
        <button className='bg-transparent text-[rgb(255,204,0)] px-[14px] py-[14px] mt-4 rounded-[15px] border-[rgb(255,204,0)] border-2'><Link href="/explore">Explore Events</Link></button>
      </div>
    </>
) :  <Sidebar isOpen={isOpen} toggleMenu={toggleMenu}/>}
</div>)
}
export default LandingPage;