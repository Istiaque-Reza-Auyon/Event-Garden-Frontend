"use client";

import React, {useEffect, useState} from 'react';
import Event from '../component/Event';
import { IoStar } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import Dropdown from '../component/Dropdown';
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from 'next/link';
import BottomNavBar from '../component/BottomNavBar';
import { isoToDateTimeAmPm } from '../../../utils';


type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const[eventList, setEventList] = useState([]);
    const [zone, setZone] = useState('');

    useEffect (() => {
        try{
            fetch(`${process.env.NEXT_PUBLIC_URL}/explore`)
            .then(resp => resp.json()).then(data => setEventList(data))
        } catch(e) {
            console.error(e);
        }
    },[])

    useEffect (() => {
        try{
            fetch(`${process.env.NEXT_PUBLIC_URL}/explore?zone=${zone}`)
            .then(resp => resp.json()).then(data => setEventList(data))
        } catch(e) {
            console.error(e);
        }
    },[zone])

    
    
    return ( 
                <div className='flex flex-col bg-[rgb(16,17,19)] h-screen overflow-y-scroll pb-[7vh]'>
                    <div className='flex bg-[rgb(16,17,19)] w-[100%] pb-5'>
                        <div className='flex justify-center items-center w-[50%] border-e-2 border-b-2 border-[rgb(119,119,119)] py-[12px]'>
                            <IoStar style={{ color: 'white' }} className='mr-2'/>
                            <div className='text-[15px] text-[rgb(255,255,255)]'>FEATURED</div>
                        </div>
                        <div className='flex justify-center items-center w-[50%]  border-b-2 border-[rgb(119,119,119)]'>
                            <FaFilter style={{ color: 'white' }} className='mr-2'/>
                            <div className='text-[15px] text-[rgb(255,255,255)]'>FILTER</div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex justify-center items-center bg-[rgb(16,17,19)] pb-4 w-[50%]'>
                            <Dropdown options= {['Trending', 'Largest', 'Newest']} zone={zone} setZone={setZone}></Dropdown>
                            <RiArrowDropDownLine style={{ color: 'black' }}/>
                        </div>
                        <div className='flex justify-center items-center bg-[rgb(16,17,19)] pb-4 w-[50%]'>
                            <Dropdown options= {['This Week', 'Today', 'This Month', 'Right Now']} zone={zone} setZone={setZone}></Dropdown>
                            <RiArrowDropDownLine style={{ color: 'black'}}/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center bg-[rgb(16,17,19)] pb-6 w-[100%]'>
                        <p className='text-white pr-3'>in</p>
                        <Dropdown options= {['New York City', 'Miami', 'Los Angeles']} zone={zone} setZone={setZone}></Dropdown>
                        <RiArrowDropDownLine style={{ color: 'black'}}/>
                    </div>
                    <div className='flex flex-col items-center px-10  bg-[rgb(16,17,19)]'>
                            {eventList?.map((event: any) => <button className='mb-6 relative'> <Link href={`/event/${event["event.id"]}`} > <Event name = {event["event.name"]} venue={event["event.venue"]} poster={event["event.poster"]} startDate={isoToDateTimeAmPm(event["event.startDate"])} orgPoster={event["event.organization.poster"]} orgId={event["event.organization.id"]}></Event></Link></button> )}                       
                    </div>
                    <BottomNavBar/>
                </div>
            
    )
}
export default page;