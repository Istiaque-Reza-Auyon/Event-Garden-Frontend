"use client"

import React, { useState, useEffect } from 'react';
import Org from '../component/Org';
import { IOrganization } from '../assets/interfaces';
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import Cookies from 'js-cookie';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const[organizationList,setOrganizationList] = useState<IOrganization[]|[]>([]);

    useEffect(() => {
        const getOrgs = (() => {
        try{
            fetch(`${process.env.NEXT_PUBLIC_URL}/admin/organization/find/all`,{
                method: "GET",
                // credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": `${Cookies.get('token')}`
                }
            })
            .then(resp => resp.json()).then(data => {
                if (data !== 'error parsing jwt')setOrganizationList(data);
                else setOrganizationList([]);
            })
        } catch(e) {
            console.error(e);
        }
    }) ();
},[])
    
    return (
            <div className ="bg-[rgb(20,21,23)] h-screen overflow-y-scroll flex flex-col pb-[7vh]">
                <h1 className='text-white px-4 py-6 pt-10 text-3xl'>My Organizations</h1>
                <div className='flex flex-col justify-center items-center mt-6'>
                <div className="bg-[rgb(35,35,37)] bg-cover bg-no-repeat h-[200px] w-[354px] rounded-[20px] mt-6 ">
                        <div className=' flex flex-col inset-0 bg-custom-gradient rounded-[20px] h-[100%] w-[100%] backdrop-blur-sm'>    
                            <div className='flex flex-col justify-between  mx-5 h-[90%] w-auto'>
                                <Link href={`/create_organization`}><button className="EventCard-location flex justify-start mt-3 items-center text-[rgb(255,255,255)] font-extralight max-h-[100%] max-w-[100%] text-2xl" ><FaPlus className='mr-2'/> New Organization</button></Link>
                                <Link href={`/create_organization`} className="flex justify-end items-center text-[rgb(255,255,255)] font-extralight max-h-[100%] max-w-[100%] text-xl"><button >Manage Organization<RiArrowRightDoubleFill className='ml-2'/></button></Link>
                            </div> 
                        </div>
                    </div>
                    {organizationList?.map(organization => <button><Link href={`/org/${organization.id}`}><Org organizationName={organization.name}></Org></Link></button>)}                
                </div>
            </div>
    
    )
}

export default page;