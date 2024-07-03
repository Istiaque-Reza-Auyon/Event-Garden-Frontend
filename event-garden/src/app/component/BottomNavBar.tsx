"use client"

import React, {useState, useEffect, useContext } from 'react';
import { MdOutlineTravelExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoOrganization } from "react-icons/go";
import { GoHome } from "react-icons/go";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FormContext } from '../assets/contextApi';





type BottomNavBarProps = {
    
};

const BottomNavBar:React.FC<BottomNavBarProps> = () => {

    const [userId, setUserId] = useState('err');
   
    const {tokenStatus, setTokenStatus} = useContext(FormContext);

    useEffect( () => {
        if (Cookies.get('token')) setTokenStatus(true);
    }, [])

    useEffect( () => {
        try{
            fetch(`${process.env.NEXT_PUBLIC_URL}/find/id`,{
                method: "GET",
                // credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": `${Cookies.get('token')}`
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
    }, [tokenStatus]);
   
    
    return (
    <div className='flex bg-transparent justify-evenly fixed bottom-0 w-screen h-[7vh] '>
        <button className='flex justify-start text-5xl'><Link href={'/'}><GoHome style={{color:'yellow'}} className='text-5xl'/></Link></button>
        {!tokenStatus ? <></>:<button className='flex justify-start text-5xl'><Link href={`/orgs`}><GoOrganization style={{color:'yellow'}} /></Link></button>}
        <button className='flex justify-start text-5xl'><Link href={'/explore'}><MdOutlineTravelExplore style={{color:'yellow'}} className='text-5xl'/></Link></button>       
        {!tokenStatus ? <></>:<button  className='flex justify-start text-5xl'><Link href={`/profile/${userId}`} ><CgProfile style={{color:'yellow'}} className=''/></Link></button>}
    </div>)
}
export default BottomNavBar;