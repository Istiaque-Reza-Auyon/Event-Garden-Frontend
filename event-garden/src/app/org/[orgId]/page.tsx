"use client"

import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { IOrganization } from '@/app/assets/interfaces';
import { IEvent } from '@/app/assets/interfaces';
import Event from '@/app/component/Event';


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
          fetch(`http://localhost:5000/admin/organization/find/all/${orgId}`)
          .then(resp => resp.json()).then(data => {
            setOrgObject(data);
            setEventList(data.events);
            setAttendeeCount(data.events.reduce(((total:number, currEvent:IEvent)=> total+currEvent.attendees.length),0));
            setTotalRevenue(data.events.reduce(((total:number, currEvent:IEvent)=> total+currEvent.attendees.length),0));
          })
      } catch(e) {
          console.error(e);
      }
  };
    
    return (
    <div className='flex flex-col h-screen overflow-y-scroll bg-[rgb(18,19,21)] px-2 py-10'>
        <div className='flex justify-center my-5'><h1 className='text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFCC00] to-[rgb(106,110,117)] font-[DM Sans]'>{orgObject?.name}</h1></div>
        <Link href={'/create_event'}><button type="submit" className='flex justify-center items-center p-3 w-[100%] bg-[rgb(16,17,19)] text-xl  text-white my-8 rounded-[50px] border-[rgb(134,135,137)] border-2'>Create New Event+</button></Link>
        <div>
            {eventList?.map(event => <Link href={`/event/${event.id}`}>
                <div className='flex flex-col items-center py-2  bg-[rgb(16,17,19)]'>
                    <Event name={event.name} venue={event.venue} poster={event.poster} startDate={event.startDate}></Event>
                </div>
            </Link>)}
        </div>
        <div className='text-white'>{attendeeCount}</div>
        <div className='text-white'>{orgObject?.events?.length}</div>
    </div>
)
}
export default page;