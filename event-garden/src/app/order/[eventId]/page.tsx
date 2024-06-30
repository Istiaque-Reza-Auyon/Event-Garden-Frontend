"use client"

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';
import { IEvent } from '@/app/assets/interfaces';
import { CiCircleRemove } from "react-icons/ci";
import Link from 'next/link';
import dotenv from "dotenv";

dotenv.config();

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [eventObject, setEventObject] = useState<IEvent>();

    const pathname = usePathname();
    const eventId = pathname.split('/')[2];

    useEffect(() => {
        
        if (eventId) {
          getEvent(eventId)
        }
      }, [eventId]);

    const getEvent =(orgId:string) => {
      try{
          fetch(`${process.env.URL}/event/${eventId}`)
          .then(resp => resp.json()).then(data => {
            setEventObject(data);
          })
      } catch(e) {
          console.error(e);
      }
  };

  const changeDateFormat = (dateStr:string) => {

    // Create a new Date object from the date string
    const date = new Date(dateStr);
    
    // Extract date components
    const year = date.getFullYear();
    const month = Number(String(date.getMonth()).padStart(2, '0'));
    const day = String(date.getDate()).padStart(2, '0');
    
    
    const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    return (`${day}th ${months[month]}`);
    }
    
    return (
     <div className='block h-screen overflow-y-scroll bg-[rgb(21,22,24)]'>
      <Link href={`/edit/event/${eventId}`}><button className='flex justify-start bg-white rounded-full mt-5 ml-5'><CiCircleRemove size={24}/></button></Link>
      <div className='flex justify-center text-[rgb(255,204,0)] text-4xl'>View all orders</div>
         
        <div className='flex flex-col items-center h-screen overflow-y-scroll p-10 px-5 bg-[rgb(21,22,24)]'>
          
          
        {eventObject?.users?.map((user:any) => <div className='flex flex-col items-center p-5 mx-4 w-[100%] max-h-[30%] border-2 bg-black border-black rounded-lg mb-2'>
            <div className='flex w-[100%] items-center justify-between h-[100%]'><h2 className='text-[rgb(255,204,0)] underline underline-offset-1 text-xl'>{user.name}</h2><div className='text-[rgb(136,130,121)] underline underline-offset-1 text-xs p-2'>Order #{user.orderId}</div></div>
            <div className='flex w-[100%] items-center justify-between'>
              <div className='text-white text-sm p2'>{changeDateFormat(user.createdAt)}</div>
              <div className='text-white text-4xl p2'>${user.price}</div>
            </div>
        </div>)}
        </div>
     </div>
    )
}
export default page;