"use client"

import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { TicketType } from '../assets/interfaces';
import dotenv from "dotenv";

dotenv.config();

type TicketPurchaseProps = {
    toggleMenu: () => void;
    price: number;
    quantity: number;
    cart: TicketType[] | [];
};

const TicketPurchase:React.FC<TicketPurchaseProps> = ({toggleMenu, price, quantity, cart}) => {

    const[totalPrice, setTotalPrice] = useState(cart.reduce(((total,curr) => total + curr.price*curr.quantity),0));
    const[credentialValid, setCredentialValid] = useState(0);

    const messageMap : {[key: number]: string} = {
        1: "Please fill up the form with valid credentials.",
        2: "Ticket secured."}

    const checkOutHandler = (event:any) => {

        event.preventDefault();
    
        const formData:any = new FormData(event.target);
        const newRecord = formData.get('address1')&&formData.get('address2')&&formData.get('cardNumber').trim().length===16&&formData.get('expiration')&&formData.get('CVC')? cart:setCredentialValid(1);

       if(newRecord) {
        setCredentialValid(0);
        try {
            fetch(`${process.env.URL}/checkout`, {

            method: "POST",
            credentials: 'include',
            body: JSON.stringify(newRecord),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then(async (response) => {
                const data = await response.json();
                if(data) setCredentialValid(2);
            })
        } catch (e) {
           console.log(`failed because ${e}`);
        }
       } else (console.log('failed'))
    }

    
    return (
        <div className='bg-[rgb(43,44,44)] px-10   py-5 overflow-y-scroll h-screen'>
            <button className='p-3'><RxCross1 style={{color:'white'}} onClick={toggleMenu}/></button>
            <div className='bg-[rgb(16,17,19)] rounded-lg px-1 pb-10 mt-20 '>
            {  credentialValid === 0 ? <></> 
            : <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[credentialValid]}</p> }
                <h2 className='text-[rgb(250,250,252)] pt-5 pl-3'>Your Order</h2>
                <div className=''>
                    {cart?.map((ticket, index) => 
                    <div key = {index} className='flex justify-between mt-4'>
                        <div className='flex justify-between'><span className='text-[rgb(250,250,252)] pt-5 pl-3'>{ticket.name}</span>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-16'>{`$${ticket.price}`}</span></div>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-2'>{`x${ticket.quantity}`}</span>
                        <span className='text-[rgb(250,250,252)] pt-5 pl-10 pr-3'>{`$${ticket.price*ticket.quantity}`}</span>
                    </div>
                )}
                    <div className='flex justify-between mt-2'>
                        <span className='text-[rgb(250,250,252)]  pl-3'>Service Charge</span>
                        <span className='text-[rgb(250,250,252)] pr-3'>{`$${Math.round(0.15*totalPrice)}`}</span>
                    </div>
                    <div className='flex justify-between mt-2 border-b-2 border-b-[rgb(134,135,137)] pb-4'>
                        <span className='text-[rgb(250,250,252)]  pl-3'>Processing Fee</span>
                        <span className='text-[rgb(250,250,252)] pr-3'>{`$${Math.round(0.10*totalPrice)}`}</span>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <span className='text-[rgb(250,250,252)]  pl-3'>Total</span>
                        <span className='text-[rgb(250,250,252)] pr-3'>{`$${totalPrice + Math.round(0.15*totalPrice) + Math.round(0.10*totalPrice)}`}</span>
                    </div>
                </div>
                <form id="formId" className='flex flex-col' onSubmit={checkOutHandler}>
                    <div className='flex flex-col p-4 pb-0'>
                        <label className='p-4 pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Billing Address Line 1</label>
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[10px] ' name="address1" type="text" placeholder='221b, Baker Street' required />
                    </div>

                    <div className='flex flex-col p-4 pt-0'>
                        <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Line 2</label>
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[10px] ' name="address2" type="text" placeholder='221b, Baker Street' required />
                    </div>

                    <div className='flex flex-col p-4 pt-0 pb-0'>
                        <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Card Number</label>
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[10px] ' name="cardNumber" type="text" placeholder='' required />
                    </div>

                    <div className='flex '>
                        <div className='flex flex-col p-4 pt-0 pr-1 w-[50%]'>
                            <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Expiration</label>
                            <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[10px] ' name="expiration" type="text" placeholder='' required />
                        </div>
                        <div className='flex flex-col p-4 pt-0 pl-1 w-[50%]'>
                            <label className=' pl-2 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>CVC</label>
                            <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[10px] ' name="CVC" type="text" placeholder='' required />
                        </div>
                    </div>
                    <div className='w-[100%] px-3'><button className='flex justify-center items-center p-2 bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px] w-[100%] ' type='submit'>Checkout</button></div>
                </form>                
            </div>
        </div>
    )
}
export default TicketPurchase;