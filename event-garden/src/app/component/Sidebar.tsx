"use client";

import { CiCircleRemove } from "react-icons/ci";
import Link from 'next/link';

type SidebarProps = {
    isOpen: boolean;
    toggleMenu: () => void;
};

const Sidebar:React.FC<SidebarProps> = ({isOpen, toggleMenu}) => {

    
    
    return (
    <div className={`fixed inset-0 z-50 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className='flex justify-start bg-white rounded-full mt-5 ml-5' onClick={toggleMenu}><CiCircleRemove size={24}/></button>
        <div className='flex justify-end'><button className='flex justify-end  p-10 text-white'>Explore Events</button></div>
        <div className='flex justify-end'><Link href="/signin" className='text-[rgb(233,186,0)] p-10 font-[DM Sans]'>Sign in</Link></div>
        <div className='flex justify-end'><button className='flex justify-end  p-10 text-white'>Launch An Event</button></div>
    </div>
    )
}
export default Sidebar;