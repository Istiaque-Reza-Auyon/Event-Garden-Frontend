"use client"

import React, {useState} from 'react';
import CreateEvent from '../component/CreateEvent';
import CreateTicket from '../component/CreateTicket';


type pageProps = {
    price: number;
    
};

const page:React.FC<pageProps> = () => {   

    const [price, setPrice] = useState(10);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    return (
        <>
          {!isOpen? <CreateEvent price={price} toggleMenu={toggleMenu}/> : <CreateTicket price={price} toggleMenu={toggleMenu}/>}
        
        </>
    )
}
export default page;