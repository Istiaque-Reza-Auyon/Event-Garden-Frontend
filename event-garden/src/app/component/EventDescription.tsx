import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Ticket from './Ticket';

type EventDescriptionProps = {
    title: string;
    venue: string;
    date: string;
    location: string;
    attendeeCount: string;
    description:string;
    price: number;
    quantity: number;
    toggleMenu: () => void;
    setPrice: (price: number, quantity: number) => void;
};

const EventDescription:React.FC<EventDescriptionProps> = ({title,venue,date,location,attendeeCount,description,price, quantity, setPrice, toggleMenu}) => {
    
    return (
        <div className='flex flex-col  mx-5'>
            <h1 className=' text-[rgb(250,250,252)] text-[34px] my-2'>{title}</h1>
            <p className=' text-[rgb(233,186,0)] my-2'>{venue}</p>
            <p className=' text-[rgb(233,186,0)] my-2'>{date}</p>
            <div className='flex items-center '><FaLocationDot style={{ color: 'rgb(233,186,0)'}}/>  <p className=' text-[rgb(233,186,0)] my-2 mx-2'>{location}</p></div>
            <p className=' text-[rgb(233,186,0)] my-2'>{attendeeCount}+ people are going</p>
            <Ticket toggleMenu={toggleMenu} title='LADIES FREE RSVP' price={price} quantity={quantity} description={description} setPrice={setPrice} ></Ticket>
            <p className='text-white'>{description}</p>
        </div>
    )
}
export default EventDescription;