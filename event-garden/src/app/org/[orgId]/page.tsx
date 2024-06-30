"use client"

import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IOrganization } from '@/app/assets/interfaces';
import { IEvent } from '@/app/assets/interfaces';
import Event from '@/app/component/Event';
import { BiSolidEditAlt } from "react-icons/bi";
import { isoToDateTimeAmPm } from '../../../../utils';



type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    const[eventList, setEventList] = useState<IEvent[]|[]> ();
    const[orgObject, setOrgObject] = useState<IOrganization|null> ();
    const[attendeeCount,setAttendeeCount] = useState<number>(0);


    const pathname = usePathname();
    const orgId = pathname.split('/')[2];

    useEffect(() => {
        
        if (orgId) {
          getOrg(orgId)
        }
      }, [orgId]);

    const getOrg =(orgId:string) => {
      try{
          fetch(`${process.env.NEXT_PUBLIC_URL}/admin/organization/find/all/${orgId}`)
          .then(resp => resp.json()).then(data => {
            setOrgObject(data);
            setEventList(data.events);
            setAttendeeCount(data.events.reduce(((total:number, currEvent:IEvent)=> total+currEvent.attendees.length),0));
          })
      } catch(e) {
          console.error(e);
      }
  };
    
    return (
    <div className='flex flex-col h-screen items-center overflow-y-scroll bg-[rgb(18,19,21)] px-2 py-10 pb-[7vh]'>
        <div className='flex  my-5'><h1 className='text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFCC00] to-[rgb(106,110,117)] font-[DM Sans]'>{orgObject?.name}</h1></div>
        <Link href={'/create_event'} className='w-[100%]'><button type="submit" className='flex justify-center items-center p-3 w-[100%] bg-[rgb(16,17,19)] text-xl  text-white my-8 rounded-[50px] border-[rgb(134,135,137)] border-2'>Create New Event+</button></Link>
        <div className='flex flex-col items-center py-2 mx-4 w-[100%] border-2 shadow-3xl shadow-black border-black rounded-lg drop-shadow-xl my-10'>
            <h2 className='text-[rgb(235,239,245)] text-xs p-2'>TOTAL ATTENDEES</h2>
            <div className='text-white text-2xl p2'>{attendeeCount}</div>
        </div>
        <div className='flex flex-col items-center py-2 mx-4 w-[100%] border-2 shadow-3xl shadow-black border-black rounded-lg drop-shadow-xl mb-10'>
            <h2 className='text-[rgb(235,239,245)] text-xs p-2'>EVENTS</h2>
            <div className='text-white text-2xl p2'>{orgObject?.events?.length}</div>
        </div>
        <div>
            {eventList?.map(event => <Link href={`/event/${event.id}`}>
                <div className='relative flex flex-col items-center py-2  bg-[rgb(16,17,19)]'>
                    <Event name={event.name} venue={event.venue} poster={event.poster} startDate={isoToDateTimeAmPm(event.startDate)} orgId={event.organizationId} orgPoster=''></Event>
                    <Link href={`/edit/event/${event.id}`} className='absolute ml-[80%]'><button type="submit" className='flex justify-start items-start p-3 bg-[rgb(16,17,19)] text-xl  text-white mt-2 rounded-[50px] border-[rgb(134,135,137)] border-2'><BiSolidEditAlt /></button></Link>
                </div>
            </Link>)}
        </div>
    </div>
)
}
export default page;