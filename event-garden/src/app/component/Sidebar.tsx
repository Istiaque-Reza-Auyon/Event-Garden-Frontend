"use client";

import { CiCircleRemove } from "react-icons/ci";
import { GiVineLeaf } from "react-icons/gi";
import Link from 'next/link';

type SidebarProps = {
    isOpen: boolean;
    toggleMenu: () => void;
};

const Sidebar:React.FC<SidebarProps> = ({isOpen, toggleMenu}) => {

    
    
    return (
    <div className={`fixed inset-0 z-50 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className='flex justify-start bg-white rounded-full mt-5 ml-5' onClick={toggleMenu}><CiCircleRemove size={24}/></button>
        <div className='flex justify-end p-10'><GiVineLeaf style={{color:'yellow'}} className="text-4xl mr-2 mt-1"/><button className='flex justify-end  text-[rgb(255,204,0)] text-4xl'>Event Garden</button></div>
        <div className='flex justify-end'><Link href="/explore" className='text-[rgb(233,186,0)] p-10 pb-2 font-[DM Sans] text-xl'>Explore Events</Link></div>
        <div className='flex justify-end'><Link href="/signin" className='text-[rgb(233,186,0)] p-10 pb-2 font-[DM Sans] text-xl'>Sign in</Link></div>
        <div className='flex justify-end'><Link href="/create_event" className='text-[rgb(233,186,0)] p-10 pb-2 font-[DM Sans] text-xl'>Launch An Event</Link></div>
    </div>
    )
}
export default Sidebar;