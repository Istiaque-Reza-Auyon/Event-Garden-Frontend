"use client"

import React, {useState, useEffect} from 'react';
import { SiAwsorganizations } from "react-icons/si";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';




type BottomNavBarProps = {
    
};

const BottomNavBar:React.FC<BottomNavBarProps> = () => {

    const[userId, setUserId] = useState('err');

    useEffect(()=> {
        try{
            fetch("http://localhost:5000/find/id",{
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data !== 'error parsing jwt' && data!=='err') {
                   setUserId(data);      
                }
                else {
                    setUserId('err');
                }
            })
        } catch(e) {
            console.error(e);
        }
    }, [])

    const handleStatus =  () => {
        try{
            fetch("http://localhost:5000/find/id",{
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data !== 'error parsing jwt' && data!=='err') {
                   setUserId(data);      
                }
                else {
                    setUserId('err');
                }
            })
        } catch(e) {
            console.error(e);
        }
    }

   
    
    return (
    <div className='flex bg-transparent justify-evenly fixed bottom-0 w-screen h-[7vh] '>
        <Link href={'/'}><AiFillHome style={{color:'yellow'}} className='text-5xl'/></Link>
        {userId === 'err'?<button onClick={handleStatus}><Link href={`/signin`}><SiAwsorganizations style={{color:'yellow'}} className='text-5xl'/></Link></button>:<button><Link href={`/orgs`}><SiAwsorganizations style={{color:'yellow'}} className='text-5xl'/></Link></button>}
        <Link href={'/explore'}><MdOutlineTravelExplore style={{color:'yellow'}} className='text-5xl'/></Link>       
        {userId === 'err'?<Link href={`/signin`}><CgProfile style={{color:'yellow'}} className='text-5xl'/></Link>:<Link href={`/profile/${userId}`}><CgProfile style={{color:'yellow'}} className='text-5xl'/></Link>}
    </div>)
}
export default BottomNavBar;