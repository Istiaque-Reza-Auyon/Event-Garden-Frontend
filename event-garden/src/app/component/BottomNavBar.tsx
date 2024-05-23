import React from 'react';
import { SiAwsorganizations } from "react-icons/si";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';



type BottomNavBarProps = {
    
};

const BottomNavBar:React.FC<BottomNavBarProps> = () => {

   
    
    return (
    <div className='flex bg-transparent justify-evenly fixed bottom-0 w-screen h-[7vh] '>
        <Link href={'/'}><AiFillHome style={{color:'yellow'}} className='text-5xl'/></Link>
        <Link href={'/orgs'}><SiAwsorganizations style={{color:'yellow'}} className='text-5xl' /></Link>
        <Link href={'/explore'}><MdOutlineTravelExplore style={{color:'yellow'}} className='text-5xl'/></Link>       
        <Link href={`profile/1`}><CgProfile style={{color:'yellow'}} className='text-5xl'/></Link>
    </div>)
}
export default BottomNavBar;