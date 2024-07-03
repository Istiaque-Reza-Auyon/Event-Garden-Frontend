"use client"

import React, { useState, useEffect } from 'react';
import EventDetails from '../../component/EventDetails';
import TicketPurchase from '../../component/TicketPurchase';
import { useRouter, usePathname } from 'next/navigation';
import { ITicket } from '@/app/assets/interfaces';
import LottieLoader from '@/app/component/LottieLoader';
import { IEvent } from '@/app/assets/interfaces';
import { initEvent } from '@/app/assets/services';

type pageProps = {

};

const page: React.FC<pageProps> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [event, setEventObject] = useState<IEvent>(initEvent);
  const [ticketList, setTicketList] = useState<ITicket[] | []>([]);
  const [cart, setCart] = useState<ITicket[] | []>([]);
  const [loader, setLoader] = useState(false);


  const router = useRouter();
  const pathname = usePathname();
  const eventId = pathname.split('/')[2];

  useEffect(() => {
    if (eventId) {
      getEvent(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    setLoader(false);
  }, [cart]);

  const increaseQuantity = (ticket: ITicket) => {
    if (cart.find((item) => item.id === ticket.id)) {
      const newCart = cart.map((item) => {
        if (item.id === ticket.id) {
          item.quantity++;
          return item;
        }
        return item;
      })
      setCart(newCart)
    } else {
      ticket.quantity = 1;
      setCart((prev) => [...prev, ticket]);
    }
  }

  const decreaseQuantity = (ticket: ITicket) => {
    if (cart.find(({ id }) => id === ticket.id)) {
      setCart((prev) => (
        prev.map((item) => {
          if (item.id === ticket.id && item.quantity > 1) item.quantity = item.quantity - 1;
          else if (item.id === ticket.id && item.quantity === 1) {
            const index = cart.findIndex(({ id }) => id === ticket.id);
            cart.splice(index, 1);
          }
          return item;
        })
      ))
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  const getEvent = (eventId: string) => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_URL}/event/${eventId}`)
        .then(resp => resp.json()).then(data => {
          setEventObject(data);
          try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/admin/ticket/findAll/${eventId}`).then(async (response) => {
              const ticketData = await response.json();
              data ? setTicketList(ticketData) : setTicketList([]);
            })
          } catch (e) {
            console.error(e);
          }
        })
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {
        loader ? <LottieLoader />
          : <>
            {
              !isOpen ?
                <EventDetails poster={event.poster} toggleMenu={toggleMenu} cart={cart} decreaseQuantity={decreaseQuantity} title={event.name} venue={event.venue} date={event.date} location={event.zone} attendeeCount={event.attendeeCount} description={event.description} setPrice={increaseQuantity} eventId={eventId} ticketList={ticketList} users={event.users} />
                : <TicketPurchase setLoader={setLoader} toggleMenu={toggleMenu} cart={cart} />
            }
          </>
      }
    </>)
}
export default page;