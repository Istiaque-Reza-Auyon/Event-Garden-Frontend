"use client"

import React, {useEffect, useState} from 'react';
import { usePathname } from 'next/navigation';
import { IEvent } from '@/app/assets/interfaces';
import Link from 'next/link';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [eventObject, setEventObject] = useState<IEvent>();

    const pathname = usePathname();
    const eventId = pathname.split('/')[3];

    useEffect(() => {
        
        if (eventId) {
          getEvent(eventId)
        }
      }, [eventId]);

    const getEvent =(orgId:string) => {
      try{
          fetch(`http://localhost:5000/event/${eventId}`)
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
    <div className='flex flex-col justify-start items-center bg-[rgb(18,19,21)] h-screen overflow-y-scroll px-2 py-10'>
        <div className='flex  my-5'><h1 className='text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFCC00] to-[rgb(106,110,117)] font-[DM Sans]'>{eventObject?.name}</h1></div>
        <Link href={`/event/${eventId}`} className='w-[100%]'><button type="submit" className='flex justify-center items-center p-3 w-[100%] bg-[rgb(255,204,0)] text-xl  text-black my-8 rounded-[50px] '>View Event Page</button></Link>
       <div className='flex flex-col items-center py-2 mx-4 w-[100%] border-2 shadow-3xl shadow-black border-black rounded-lg drop-shadow-xl my-10'>
            <h2 className='text-[rgb(235,239,245)] text-xs p-2'>TOTAL REVENUE</h2>
            <div className='text-white text-2xl p2'>{eventObject?.totalRevenue}</div>
        </div>
        <div className='flex flex-col items-center py-2 mx-4 w-[100%] border-2 shadow-3xl shadow-black border-black rounded-lg drop-shadow-xl mb-10'>
            <h2 className='text-[rgb(235,239,245)] text-xs p-2'>TOTAL TICKETS SOLD</h2>
            <div className='text-white text-2xl p2'>{eventObject?.totalTicketsSold}</div>
        </div>
        <div className='flex justify-between'><h2 className='text-[rgb(235,239,245)] text-3xl p-2 max-w-[40%]'>Recent Orders</h2><Link href={`/order/${eventId}`} className='max-w-[40%]'><button type="submit" className='flex justify-center items-center p-3 w-[100%] bg-[rgb(255,204,0)] text-sm  text-black my-8 rounded-[50px] '>View All Orders</button></Link></div>
        <div className='flex flex-col items-center p-10 px-5 mx-4 w-[100%] border-2 shadow-3xl bg-[rgb(21,22,24)] border-black rounded-lg mb-2'>
        {eventObject?.users?.slice(0,4).map((user:any) => <div className='flex flex-col items-center p-5 mx-4 w-[100%] border-2 bg-black border-black rounded-lg mb-2'>
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