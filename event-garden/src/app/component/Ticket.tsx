import React, {useState} from 'react';
import { FaPlus } from "react-icons/fa";

type TicketProps = {
    title: string,
    price: number,
    quantity: number,
    description: string,
    toggleMenu: () => void,
    setPrice: (price: number, quantity: number) => void;
};

const Ticket:React.FC<TicketProps> = ({title,price,description,setPrice,toggleMenu}) => {
    
   const[addedQuantity,setAddedQuantity] = useState(0);

   const checkOutHandler = () => {
    setAddedQuantity(addedQuantity+1);
    if(addedQuantity>0)
    setPrice(price*addedQuantity, addedQuantity);
    console.log(addedQuantity);
   }

    return (
        <div className='flex flex-col p-5 m-5 bg-[rgb(16,17,19)] border-yellow-400 border-2 rounded-[10px] shadow-3xl shadow-[rgb(233,186,0)]'>
            <div>
                <h2 className='text-[rgb(233,186,0)] my-2'>{title}</h2>
                <p className='text-[rgb(250,250,252)] my-2'>{price}</p>
                <p className='text-[rgb(250,250,252)] my-2'>{`x${addedQuantity}`}</p>
                <p className='text-[rgb(250,250,252)] my-2'>{description}</p>
            </div>
            <div className='flex justify-center items-center my-3'>
                <button onClick={checkOutHandler} className='bg-red-500'><FaPlus style={{color: 'rgb(233,186,0)'}}/></button>
            </div>
            <div className='flex justify-center items-center my-3'>
                <button onClick={toggleMenu}>Checkout</button>
            </div>
        </div>
    )
}
export default Ticket;