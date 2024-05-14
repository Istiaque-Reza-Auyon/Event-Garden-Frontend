"use client";

import React from 'react';
import  { useState }  from 'react';
import Sidebar from './Sidebar';

type NavBarProps = {
};

const NavBar:React.FC<NavBarProps> = () => {

    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
    {isOpen === false ? (
    <div className='flex flex-row justify-between  bg-black p-2'>
        <span className='text-[rgb(255,204,0)] text-2xl mt-3 ml-5 font-serif'>Event Garden</span>
        <button className='' onClick={toggleMenu} >
        <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"/></svg>
        </button>
    </div>
) :  <Sidebar isOpen={isOpen} toggleMenu={toggleMenu}/>}
</>)
}
export default NavBar;