import React, {useState} from 'react';
import { MdModeEdit } from "react-icons/md";

type CreateEventProps = {
    price: number;
    toggleMenu: () => void;
};

const CreateEvent:React.FC<CreateEventProps> = ({price,toggleMenu}) => {

    const [file, setFile] = useState('');

    const handleChange = (e:any) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        console.log(file);
    }
    

    const addEvent = (formEvent: any) => {
        formEvent.preventDefault();

        const formData: any = new FormData(formEvent.target);
        const event = formData.get('name').trim().length>0 && formData.get('venue').trim().length>0 ? {name: formData.get('name'), startDate: formData.get('startDate'), endDate: formData.get('endDate'), zone: formData.get('address'), venue: formData.get('venue')} : undefined ;

        try {
            fetch("http://localhost:5000/admin/event/create/1", {

            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then(async (response) => {
                const data = await response.json();
                data ? console.log('success') : console.log('failed');
            })
        } catch (e) {
            console.error(e);
        }
    }
        
    
    
    return (
        <div className='flex flex-col h-auto w-screen overflow-y-scroll bg-[rgb(5,6,6)] p-5 '>
            <form className='flex flex-col' onSubmit={addEvent}>
                <div className="flex flex-col justify-center items-center bg-[url(https://s3.amazonaws.com/images.posh.vip/create-event-flyer-placeholders/Default_Flyer_Placeholder.webp)] h-[30rem] bg-cover rounded-lg mt-5 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]">
                <img src={file} className='max-h-[100%] max-w-[100%] mb-3'/>
                    <div className=' flex flex-col justify-center items-center'>
                        {file == '' ? <h3 className='flex flex-col justify-center items-center text-[34px] text-[rgb(240,242,249)] pb-5 pt-0 pl-24'>DESIGN YOUR EVENT PAGE</h3> : <></>}
                        <div className=' flex justify-center items-center pl-24 w-[100%]'><input type="file" placeholder='text' onChange={handleChange}/></div>
                    </div>
                </div>
                <h3 className='text-[rgb(240,242,249)] py-2 mt-4 pl-1'>Event Details</h3>
                <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[1.5rem] w-[100%] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="name" placeholder='My Event*' required />
                <div className='flex'>
                    <input className='p-3 pl-2 rounded-lg mb-4 mr-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="startTime" type="text" placeholder='Start time*' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}   required />
                    <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="endTime" type="text" placeholder='End time*' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required />
                </div>
                <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="venue" placeholder='Venue*' required />
                <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="address" placeholder='Address*' required />
                <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] ' name="category" placeholder='Enter a Category (optional)' />
                <textarea name="description" placeholder='Show your attendees what they can expect.' className='bg-[rgb(43,44,44)] p-3 pl-2 rounded-lg mb-4 mr-1 w-[100%] text-[rgb(240,242,249)] text-[20px] h-80 placeholder:text-[rgb(134,135,137)] placeholder:text-[20px]' ></textarea>
                <div className='border-b-2 border-b-[rgb(134,135,137)]'><h2 className='text-[rgb(240,242,249)] py-2 mt-4 pl-2'>Tickets</h2></div>
                <div className='flex flex-col justify-center items-center mt-5 p-10 pt-4 pl-0 pb-3 rounded-lg box-border shadow-custom1 shadow-[rgb(240,242,249)]'>
                    <h4 className='flex justify-center text-[rgb(240,242,249)] '>Default Ticket</h4>
                    <p className='flex justify-center text-[rgb(240,242,249)] p-2'>{`$${price}`}</p>
                    <button className='flex justify-center p-2 bg-[rgb(240,242,249)] rounded-full w-auto h-auto' onClick={toggleMenu}><MdModeEdit style={{color: 'black'}}/></button>
                </div>
                <button className='flex justify-center items-center p-2 bg-[rgb(240,242,249)] text-black mt-5 rounded-[50px]' type="submit">Create Event</button>
            </form>
        </div>
    )
}
export default CreateEvent;
