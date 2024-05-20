"use client"

import React, { useState, useEffect } from 'react';
import Org from '../component/Org';
import { IOrganization } from '../assets/interfaces';
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const[organizationList,setOrganizationList] = useState<IOrganization[]|[]>([]);

    useEffect(() => {
        
    //     if (eventId) {
    //       getEvents(eventId)
    //     }
    //   }, [eventId]);

        const getEvents = (() => {
        try{
            fetch(`http://localhost:5000/admin/organization/find/all`)
            .then(resp => resp.json()).then(data => {
                setOrganizationList(data);
            })
        } catch(e) {
            console.error(e);
        }
    }) ();
})
    
    return (
            <div className ="bg-[rgb(20,21,23)] h-screen overflow-y-scroll flex flex-col">
                <h1 className='text-white px-4 py-6 pt-10 text-3xl'>My Organizations</h1>
                <div className='flex flex-col justify-center items-center mt-6'>
                    {organizationList?.map(organization => <button><Link href={`/org/${organization.id}`}><Org organizationName={organization.name}></Org></Link></button>)}
                    <div className="bg-[rgb(35,35,37)] bg-cover bg-no-repeat h-[200px] w-[354px] rounded-[20px] mt-6 ">
                        <div className=' flex flex-col inset-0 bg-custom-gradient rounded-[20px] h-[100%] w-[100%] backdrop-blur-sm'>    
                            <div className='flex flex-col justify-between  mx-5 h-[90%] w-auto'>
                                <button className="EventCard-location flex justify-start mt-3 items-center text-[rgb(255,255,255)] font-extralight max-h-[100%] max-w-[100%] text-2xl "><FaPlus className='mr-2'/> New Organization</button>
                                <button className="EventCard-location flex justify-end items-center text-[rgb(255,255,255)] font-extralight max-h-[100%] max-w-[100%] text-xl ">Manage Organization<RiArrowRightDoubleFill className='ml-2'/></button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
    
    )
}

export default page;