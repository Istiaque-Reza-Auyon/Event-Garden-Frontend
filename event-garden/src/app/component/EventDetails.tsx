import React from 'react';
import EventDescription from '../component/EventDescription';



type EventDetailsProps = {
    title: string;
    venue: string;
    date: string;
    location: string;
    attendeeCount: string;
    description:string;
    toggleMenu: () => void;
    price: number;
    quantity: number;
    setPrice: (price: number, quantity: number) => void;
};

const EventDetails:React.FC<EventDetailsProps> = ({toggleMenu, title, venue, date, location, attendeeCount, description, price, quantity, setPrice}) => {
    
    return (
        <div className='flex flex-col bg-[rgb(16,17,19)] h-auto overflow-y-scroll'>
            <div className=" h-[400px] w-auto ">
                <img src='https://posh-images-alts-production.s3.amazonaws.com/6632765b375a2d01d5c8aa31/1400x1749.webp' className="h-[100%] w-[100%] "/>
            </div>
            <div className='flex flex-col'>
                <EventDescription toggleMenu={toggleMenu} title={title}  venue={venue} date={date} location={location} price={price} quantity={quantity} attendeeCount={attendeeCount} description={description} setPrice={setPrice}></EventDescription>
            </div>   
        </div>
    )
}
export default EventDetails;