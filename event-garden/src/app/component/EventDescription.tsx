import React, {useEffect, useState} from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Ticket from './Ticket';
import { TicketType } from '../assets/interfaces';

type EventDescriptionProps = {
    title: string;
    venue: string;
    date: string;
    location: string;
    attendeeCount: string;
    description:string;
    eventId: string|null;
    ticketList: TicketType[]|[];
    cart: TicketType[]|[];
    toggleMenu: () => void;
    setPrice: (ticket: TicketType) => void;
    decreaseQuantity: (ticket: TicketType) => void;
};

const EventDescription:React.FC<EventDescriptionProps> = ({title,venue,date,location,attendeeCount,description, setPrice, toggleMenu, eventId, ticketList,decreaseQuantity, cart}) => {

    const quantity = (ticket: TicketType) => {
       const cartTicket = cart.find(cartTicket => ticket.id === cartTicket.id);
       return cartTicket?.quantity;
    } 

    return (
        <div className='relative flex flex-col  mx-5'>
            <h1 className=' text-[rgb(250,250,252)] text-[34px] my-2'>{title}</h1>
            <p className=' text-[rgb(233,186,0)] my-2'>{venue}</p>
            <p className=' text-[rgb(233,186,0)] my-2'>{date}</p>
            <div className='flex items-center '><FaLocationDot style={{ color: 'rgb(233,186,0)'}}/>  <p className=' text-[rgb(233,186,0)] my-2 mx-2'>{location}</p></div>
            <p className=' text-[rgb(233,186,0)] my-2'>{attendeeCount}+ people are going</p>
            {ticketList?.map( (ticket:TicketType, index:number) => <Ticket quantity={quantity(ticket)} ticket={ticket}  decreaseQuantity={decreaseQuantity}  title={ticket.name}  ticketPrice={ticket.price} description={description}  setPrice={setPrice} ></Ticket>)}
            <p className='text-white'>{description}</p>
            <div className='sticky flex justify-center items-center my-3 bg-[rgb(16,17,19)] border-yellow-400 border-2 w-[20rem] h-[5rem] rounded-full ml-7 shadow-3xl shadow-[rgb(233,235,145)] text-[rgb(250,250,252)] text-2xl'>
                <button onClick={toggleMenu}>Checkout</button>
            </div>
        </div>
       
    )
}
export default EventDescription;