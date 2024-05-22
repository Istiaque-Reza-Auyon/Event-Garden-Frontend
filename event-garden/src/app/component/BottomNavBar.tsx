import React from 'react';
import { SiAwsorganizations } from "react-icons/si";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";



type BottomNavBarProps = {
    
};

const BottomNavBar:React.FC<BottomNavBarProps> = () => {
    
    return (
    <div className='flex bg-transparent'>
        <SiAwsorganizations style={{color:'yellow'}} />
        <MdOutlineTravelExplore style={{color:'yellow'}} />
        <IoTicketSharp style={{color:'yellow'}} />
        <img/>
    </div>)
}
export default BottomNavBar;