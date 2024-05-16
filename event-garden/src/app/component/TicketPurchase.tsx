"use client"

import React from 'react';
import { RxCross1 } from "react-icons/rx";

type TicketPurchaseProps = {
    toggleMenu: () => void;
    price: number;
    quantity: number;
};

const TicketPurchase:React.FC<TicketPurchaseProps> = ({toggleMenu, price, quantity}) => {

    
    
    return (
        <div className='bg-[rgb(43,44,44)] px-10   py-5 h-screen'>
            <button className='p-3'><RxCross1 style={{color:'white'}} onClick={toggleMenu}/></button>
            <div className='bg-[rgb(16,17,19)] rounded-lg px-1 pb-10 mt-20 '>
                <h2 className='text-[rgb(250,250,252)] pt-5 pl-3'>Your Order</h2>
                <div className=''>
                    <div className='mt-4'>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-3'>General Admission</span>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-8'>{`$${price}`}</span>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-2'>{`x${quantity}`}</span>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-10'>{`$${quantity*price}`}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <span className='text-[rgb(250,250,252)]  pl-3'>Service Charge</span>
                        <span className='text-[rgb(250,250,252)] pr-6'>{`$${0.15*quantity*price}`}</span>
                    </div>
                    <div className='flex justify-between mt-2 border-b-2 border-b-[rgb(134,135,137)] pb-4'>
                        <span className='text-[rgb(250,250,252)]  pl-3'>Processing Fee</span>
                        <span className='text-[rgb(250,250,252)] pr-6'>{`$${0.10*quantity*price}`}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <span className='text-[rgb(250,250,252)]  pl-3'>Total</span>
                        <span className='text-[rgb(250,250,252)] pr-6'>{`$${quantity*price+0.15*quantity*price+0.10*quantity*price}`}</span>
                    </div>
                </div>
                
                <div className='flex flex-col p-4 pb-0'>
                    <label className='p-4 pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Billing Address Line 1</label>
                    <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[10px] ' name="quantity" type="text" placeholder='221b, Baker Street' required />
                </div>

                <div className='flex flex-col p-4 pt-0'>
                    <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Line 2</label>
                    <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[10px] ' name="quantity" type="text" placeholder='221b, Baker Street' required />
                </div>

                <div className='flex flex-col p-4 pt-0 pb-0'>
                    <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Card Number</label>
                    <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[10px] ' name="quantity" type="text" placeholder='' required />
                </div>

                <div className='flex '>
                    <div className='flex flex-col p-4 pt-0 pr-1 w-[50%]'>
                        <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Expiration</label>
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[10px] ' name="quantity" type="text" placeholder='' required />
                    </div>
                    <div className='flex flex-col p-4 pt-0 pl-1 w-[50%]'>
                        <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>CVC</label>
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[10px] ' name="quantity" type="text" placeholder='' required />
                    </div>
                </div>
                <button className='flex justify-center items-center p-2 bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px] w-[100%] '>Checkout</button>
            </div>
        </div>
    )
}
export default TicketPurchase;