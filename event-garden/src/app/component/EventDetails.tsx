import React from 'react';
import EventDescription from '../component/EventDescription';
import { TicketType } from '../assets/interfaces';



type EventDetailsProps = {
    title: string;
    venue: string;
    date: string;
    location: string;
    attendeeCount: number;
    description:string;
    toggleMenu: () => void;
    eventId: string|null;
    ticketList: TicketType[] | [];
    cart: TicketType[] | [];
    poster: string;
    setPrice: (ticket: TicketType) => void;
    decreaseQuantity: (ticket: TicketType) => void;
};

const EventDetails:React.FC<EventDetailsProps> = ({toggleMenu, title, venue, date, location, attendeeCount, description, setPrice, eventId, ticketList, cart, poster, decreaseQuantity}) => {
    
    return (
        <div className='flex flex-col bg-[rgb(16,17,19)] h-auto overflow-y-scroll pb-[7vh]'>
            <div className=" h-[400px] w-auto ">
                <img src={poster} className="h-[100%] w-[100%] "/>
            </div>
            <div className='flex flex-col'>
                <EventDescription toggleMenu={toggleMenu} decreaseQuantity={decreaseQuantity} title={title}  cart={cart}  venue={venue} date={date} location={location} attendeeCount={attendeeCount} description={description} setPrice={setPrice} eventId={eventId} ticketList = {ticketList}></EventDescription>
            </div>   
        </div>
    )
}
export default EventDetails;