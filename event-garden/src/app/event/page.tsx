"use client"

import React, {useState} from 'react';
import EventDetails from '../component/EventDetails';
import TicketPurchase from '../component/TicketPurchase';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [isOpen, setIsOpen] = useState(false);
    const[price, setPrice] = useState(20);
    const[quantity, setQuantity] = useState(1)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    
    return (
        <>
        {!isOpen? <EventDetails toggleMenu={toggleMenu}/> : <TicketPurchase toggleMenu={toggleMenu} price={price} quantity={quantity}/>}
        </>)
}
export default page;