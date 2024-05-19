"use client"

import React, {useState, useEffect } from 'react';
import EventDetails from '../../component/EventDetails';
import TicketPurchase from '../../component/TicketPurchase';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { TicketType } from '@/app/assets/interfaces';

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
    const[price, setPrice] = useState(0);
    const[quantity, setQuantity] = useState(0);
    const[event, setEventObject] = useState<Event>({ name: '', venue: '', date: '', location: '', attendeeCount: '', description: ''});
    const[ticketList, setTicketList] = useState<TicketType[]|[]>([]);

    const pathname = usePathname();
    const eventId = pathname.split('/')[2];
    
    const [cart, setCart] = useState<TicketType[]|[]>([]);

    console.log(cart);
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
          getEvents(eventId)
        }
      }, [eventId]);

    const getEvents =(eventId:string) => {
      try{
          fetch(`http://localhost:5000/event/${eventId}`)
          .then(resp => resp.json()).then(data => {
            setEventObject(data);
            try {
              fetch(`http://localhost:5000/admin/ticket/findAll/${eventId}`).then(async (response) => {
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
      {!isOpen? <EventDetails toggleMenu={toggleMenu} cart={cart} decreaseQuantity={decreaseQuantity} title={event.name}  venue={event.venue} date={event.date} location={event.location} attendeeCount={event.attendeeCount} description={event.description} setPrice={increaseQuantity} eventId={eventId} ticketList={ticketList} /> : <TicketPurchase toggleMenu={toggleMenu} price={price} quantity={quantity} cart={cart}/>}
      </>)
}
export default page;