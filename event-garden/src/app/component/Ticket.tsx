import React, {useState} from 'react';
import { FaPlus } from "react-icons/fa";
import { TicketType } from '../assets/interfaces';
import { FaMinus } from "react-icons/fa";

type TicketProps = {
    title: string,
    description: string,
    ticketPrice: number;
    ticket: TicketType;
    quantity: number|undefined;
    setPrice: (ticket: TicketType) => void;
    decreaseQuantity: (ticket: TicketType) => void;
};

const Ticket:React.FC<TicketProps> = ({title,description,setPrice,ticketPrice,ticket, quantity, decreaseQuantity}) => {
    
   const increaseQuantityHandler = () => {
   
    setPrice(ticket);

   }

   const decreaseQuantityHandler = () => {
    decreaseQuantity(ticket);
   }

   

    return (
        <div className='flex flex-col p-5 m-5 bg-[rgb(16,17,19)] border-yellow-400 border-2 rounded-[10px] shadow-3xl shadow-[rgb(233,186,0)]'>
            <div>
                <h2 className='text-[rgb(233,186,0)] my-2'>{title}</h2>
                <p className='text-[rgb(250,250,252)] my-2'>{ticketPrice}</p>
                <p className='text-[rgb(250,250,252)] my-2'>{description}</p>                
            </div>
            <div className='flex justify-evenly items-center my-3'>
                <button onClick={increaseQuantityHandler} ><FaPlus style={{color: 'rgb(233,186,0)'}}/></button>
                <p className='text-[rgb(250,250,252)] my-2'>{quantity}</p>
                <button onClick={decreaseQuantityHandler} ><FaMinus style={{color: 'rgb(233,186,0)'}}/></button>
            </div>
           
        </div>
    )
}
export default Ticket;