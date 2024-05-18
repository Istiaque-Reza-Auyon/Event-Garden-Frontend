import React from 'react';
import { MdModeEdit } from "react-icons/md";

type TicketBankProps = {
    price: number;
    name: string;
    toggleMenu: () => void;
};

const TicketBank:React.FC<TicketBankProps> = ({price, toggleMenu, name}) => {
    
    return (
        <div className='flex flex-col justify-center items-center mt-5 p-10 pt-4 pl-0 pb-3 rounded-lg box-border shadow-custom1 shadow-[rgb(240,242,249)]'>
                    <h4 className='flex justify-center text-[rgb(240,242,249)] '>{name}</h4>
                    <p className='flex justify-center text-[rgb(240,242,249)] p-2'>{`$${price}`}</p>
                    <button className='flex justify-center p-2 bg-[rgb(240,242,249)] rounded-full w-auto h-auto' onClick={toggleMenu}><MdModeEdit style={{color: 'black'}}/></button>
                </div>
    )
}
export default TicketBank;