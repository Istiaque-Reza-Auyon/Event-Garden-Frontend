import React from 'react';
import { MdModeEdit } from "react-icons/md";

type CreateEventProps = {
    price: number;
    toggleMenu: () => void;
};

const CreateEvent:React.FC<CreateEventProps> = ({price, toggleMenu}) => {
    
    return (
        <div className='flex flex-col h-auto w-screen overflow-y-scroll bg-[rgb(5,6,6)] p-5 '>
            <div className="flex flex-col justify-center items-center bg-[url(https://s3.amazonaws.com/images.posh.vip/create-event-flyer-placeholders/Default_Flyer_Placeholder.webp)] h-[30rem] bg-cover rounded-lg mt-10 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]">
                <div className=' flex flex-col justify-center items-center'>
                    <h3 className='flex flex-col justify-center items-center text-[34px] text-[rgb(240,242,249)] pb-5 pt-0 pl-24'>DESIGN YOUR EVENT PAGE</h3>
                    <div className=' flex justify-center items-center pl-24 w-[100%]'><input type="file" placeholder='text'/></div>
                </div>
            </div>
            <h3 className='text-[rgb(240,242,249)] py-2 mt-4 pl-2'>Event Details</h3>
            <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[34px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="myEvent" placeholder='My Event*' required />
            <div className='flex'>
                <input className='p-3 pl-2 rounded-lg mb-4 mr-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="startTime" type="text" placeholder='Start time*' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}   required />
                <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="endTime" type="text" placeholder='End time*' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required />
            </div>
            <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="venue" placeholder='Venue*' required />
            <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="address" placeholder='Address*' required />
            <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[25px] ' name="category" placeholder='Enter a Category (optional)' />
            <input className='p-2 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[25px] placeholder:text-[17px] w-[100%] max-w-[400px] box-border h-[30vh]' name="category" placeholder='Show your attendees what they can expect.' />
            <div className='border-b-2 border-b-[rgb(134,135,137)]'><h2 className='text-[rgb(240,242,249)] py-2 mt-4 pl-2'>Tickets</h2></div>
            <div className='flex flex-col justify-center items-center mt-5 p-10 pt-4 pl-0 pb-3 rounded-lg box-border shadow-custom1 shadow-[rgb(240,242,249)]'>
                <h4 className='flex justify-center text-[rgb(240,242,249)] '>Default Ticket</h4>
                <p className='flex justify-center text-[rgb(240,242,249)] p-2'>{`$${price}`}</p>
                <button className='flex justify-center p-2 bg-[rgb(240,242,249)] rounded-full w-auto h-auto' onClick={toggleMenu}><MdModeEdit style={{color: 'black'}}/></button>
            </div>
            <button className='flex justify-center items-center p-2 bg-[rgb(240,242,249)] text-black mt-5 rounded-[50px]'>Create Event</button>
        </div>
    )
}
export default CreateEvent;
