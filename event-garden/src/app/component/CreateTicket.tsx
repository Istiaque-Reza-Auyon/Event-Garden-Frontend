import React, {useState} from 'react';
import { LuDollarSign } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

type CreateTicketProps = {
    setPrice: (a:number)=> void;
    toggleMenu: () => void;
    addTicket: (e: any) => void;
};

const CreateTicket:React.FC<CreateTicketProps> = ({setPrice, toggleMenu, addTicket}) => {

    

    const handleChange = (formEvent: any) => {
        formEvent.preventDefault();

        const formData: any = new FormData(formEvent.target);
        const price = formData.get('price');
        setPrice(price);
        addTicket(formEvent);
    }
    
    return (
        <div className='flex flex-col h-auto w-screen overflow-y-scroll bg-[rgb(5,6,6)] p-3'>
            <div className='flex justify-between'>
                <h3 className='text-[rgb(240,242,249)] py-2 mt-4 pl-2'>Edit Ticket</h3>
                <button className='p-3'><RxCross1 style={{color:'white'}} onClick={toggleMenu}/></button>
            </div>
            <form className='flex flex-col' onSubmit={handleChange}>
            <div className='border-b-2 border-b-[rgb(134,135,137)]'><h3 className='text-[rgb(134,135,137)] py-2 mt-4 pl-2'>Ticket Details</h3></div>
            <div className='flex mt-2'>
                <div className='flex flex-col w-[50%]'>
                    <label className='p-4 pl-0 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Name</label>
                    <input className='p-3 pl-2 rounded-lg mb-4 mr-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[20px] ' name="ticketName" type="text"  defaultValue="Default Ticket" required />
                </div>
                <div className='flex flex-col w-[50%] pr-2'>
                    <label className='p-4 pl-0 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Qty</label>
                    <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[100%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[20px] ' name="quantity" type="text" placeholder='Unlimited' required />
                </div>
            </div>
            <label className='p-4 pl-0 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Price</label>
            <div className='flex items-center p-3 pl-2 mb-4 mr-1 rounded-lg bg-[rgb(43,44,44)]'>
                <LuDollarSign style={{color: 'white'}}/>
                <input className=' pl-2 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] text-[20px] ' name="price" type="text"  defaultValue='10' required />
            </div>
            <label className='p-4 pl-0 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Sale Period</label>
            <div className='flex'>
                <input className='p-3 pl-2 rounded-lg mb-4 mr-1 w-[50%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[20px]' name="startTime" type="text" placeholder='Start time*' onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")}   required />
                <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[50%] bg-[rgb(43,44,44)] text-[rgb(134,135,137)] text-[20px]' name="endTime" type="text" placeholder='End time*' onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} required />
            </div>
            <label className='p-4 pl-0 pb-1 text-[rgb(240,242,249)] font-[DM Sans]'>Description</label>
            <textarea name="description" className='bg-[rgb(43,44,44)] p-3 pl-2 rounded-lg mb-4 mr-1 w-[100%] text-[rgb(240,242,249)] text-[20px] h-80 ' ></textarea>
            <button type='submit' className='flex justify-center items-center p-2 bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px]'>Create Ticket</button>
            </form>
        </div>
    )
}
export default CreateTicket;
