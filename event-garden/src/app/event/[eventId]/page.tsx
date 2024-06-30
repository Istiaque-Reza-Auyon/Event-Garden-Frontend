"use client"

import React, {useState, useEffect } from 'react';
import EventDetails from '../../component/EventDetails';
import TicketPurchase from '../../component/TicketPurchase';
import { useRouter, usePathname } from 'next/navigation';
import { TicketType } from '@/app/assets/interfaces';
import dotenv from "dotenv";

dotenv.config();

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    type Event = { name: string;
      venue: string;
      date: string;
      zone: string;
      attendeeCount: number;
      description:string;
      poster: string;
      users:any;
  }

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const[price, setPrice] = useState(0);
    const[quantity, setQuantity] = useState(0);
    const[event, setEventObject] = useState<Event>({ name: '', venue: '', date: '', zone: '', attendeeCount: 0, description: '', poster: '', users:[]});
    const[ticketList, setTicketList] = useState<TicketType[]|[]>([]);

    const pathname = usePathname();
    const eventId = pathname.split('/')[2];
    
    const [cart, setCart] = useState<TicketType[]|[]>([]);

    const increaseQuantity = (ticket:TicketType) => {     
      if(cart.find((item) => item.id === ticket.id)) { 
        const newCart = cart.map((item) => {
          if(item.id===ticket.id){
            item.quantity++;
            return item;
          }
          return item;     
        })
        setCart(newCart)
      } else {
        ticket.quantity = 1;
        setCart((prev) => [...prev,ticket]);
      }  
    }

    const decreaseQuantity = (ticket:TicketType) => {
      if(cart.find(({ id }) => id === ticket.id)) {
        setCart((prev) => (
          prev.map((item) => {
            if(item.id === ticket.id && item.quantity>1) item.quantity = item.quantity-1;
            else if(item.id === ticket.id && item.quantity === 1) {
              const index = cart.findIndex(({ id }) => id === ticket.id);
              cart.splice(index,1);
            }
            return item;
          })
        ))
      }
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      useEffect(() => {
        
        if (eventId) {
          getEvent(eventId)
        }
      }, [eventId]);

    const getEvent =(eventId:string) => {
      try{
          fetch(`${process.env.URL}/event/${eventId}`)
          .then(resp => resp.json()).then(data => {
            setEventObject(data);
            try {
              fetch(`${process.env.URL}/admin/ticket/findAll/${eventId}`).then(async (response) => {
                  const ticketData = await response.json();            
                  data ? setTicketList(ticketData) : setTicketList([]);               
              })
          } catch (e) {
              console.error(e);
          }
          })
      } catch(e) {
          console.error(e);
      }
  };

  return (
      <>
      {!isOpen? <EventDetails poster={event.poster} toggleMenu={toggleMenu} cart={cart} decreaseQuantity={decreaseQuantity} title={event.name}  venue={event.venue} date={event.date} location={event.zone} attendeeCount={event.attendeeCount} description={event.description} setPrice={increaseQuantity} eventId={eventId} ticketList={ticketList} users={event.users}/> : <TicketPurchase toggleMenu={toggleMenu} price={price} quantity={quantity} cart={cart}/>}
      </>)
}
export default page;