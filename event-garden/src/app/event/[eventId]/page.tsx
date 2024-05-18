"use client"

import React, {useState, useEffect } from 'react';
import EventDetails from '../../component/EventDetails';
import TicketPurchase from '../../component/TicketPurchase';
import { useRouter, useSearchParams } from 'next/navigation';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    type Event = { name: string;
      venue: string;
      date: string;
      location: string;
      attendeeCount: string;
      description:string;}

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const[price, setPrice] = useState(10);
    const[quantity, setQuantity] = useState(0);
    const[event, setEventObject] = useState<Event>({ name: '', venue: '', date: '', location: '', attendeeCount: '', description: ''});

    const searchParams = useSearchParams()
    const eventId  = searchParams.get('eventId')

    console.log(eventId)

    const priceHandler = (price:number, quantity:number) => {
      setPrice(price);
      setQuantity(quantity);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      useEffect(() => {
        if (eventId) {
          getEvents(eventId)
        }
      }, [eventId]);

    const getEvents =(eventId:string) => {
      try{
          fetch(`http://localhost:5000/event/${eventId}`)
          .then(resp => resp.json()).then(data => {
            console.log(data);
            setEventObject(data);
          })
      } catch(e) {
          console.error(e);
      }
  }
    
    return (
        <>
        {!isOpen? <EventDetails toggleMenu={toggleMenu} title={event.name}  venue={event.venue} date={event.date} location={event.location} price={price} quantity={quantity} attendeeCount={event.attendeeCount} description={event.description} setPrice={priceHandler} /> : <TicketPurchase toggleMenu={toggleMenu} price={price} quantity={quantity}/>}
        </>)
}
export default page;