import React, {useState, useContext, useEffect} from 'react';
import TicketBank from './TicketBank';
import { FaCamera } from "react-icons/fa6";
import { IOrganization } from '../assets/interfaces';
import { FormContext } from '../create_event/page';
import { isoToDateTimeAmPm } from '../../../utils';
import SignInModal from '../component/SignInModal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { TicketType } from '../assets/interfaces';


type CreateEventProps = {
    ticketList : TicketType[]; 
};


const CreateEvent:React.FC<CreateEventProps> = () => {

    const { formData, setFormData, handleChange, toggleMenu } = useContext(FormContext);
    const [orgList,setOrgList] = useState<IOrganization[]>([]);
    const [orgId, setOrgId] = useState('');
    const [tryAgain, setTryAgain] = useState(0);
    const [tokenStatus, setTokenStatus] = useState(true);
    const [selectedOrg, setSelectedOrg] = useState('');

    const router = useRouter();

    const allocateOrg = (formEvent: any) => {
        formEvent.preventDefault();

        try{
            console.log(Cookies.get('token'));
            fetch("http://localhost:5000/admin/organization/find/all",{
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log('here', data)
                if(data !== 'Error finding all organizations') {
                    setOrgList(data);         
                }
                else {
                    setTokenStatus(false);}   
            })
        } catch(e) {
            console.error(e);
        }
    }

    const authorize = (formEvent: any) => {
        formEvent.preventDefault();

        try{
            fetch("http://localhost:5000/find/id",{
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if(data !== 'error parsing jwt') {
                    if(orgId == '') {allocateOrg(formEvent);
                    setTokenStatus(true);   }
                    else addEvent(formEvent);      
                }
                else {
                    setTokenStatus(false);}   
            })
        } catch(e) {
            console.error(e);
        }
        return false;
    }

    const toggleModal = () => {
       if(!tokenStatus) setTokenStatus(true);
       if(orgList.length>0) setOrgList([]);
    }


    const addEvent = async (formEvent: any) => {
        formEvent.preventDefault();

        const formdata: any = new FormData(formEvent.target);
        const event = formdata.get('name').trim().length>0 && formdata.get('venue').trim().length>0 ? {name: formdata.get('name'), startDate: isoToDateTimeAmPm(formdata.get('startDate')), endDate: isoToDateTimeAmPm(formdata.get('endDate')), zone: formdata.get('address'), venue: formdata.get('venue'), poster: formData.url, description: formdata.get('description')} : undefined ;

         
        try {
            fetch(`http://localhost:5000/admin/event/create/${orgId}`, {

            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then(async (response) => {
                const data = await response.json();
                console.log(formData.ticketList);
                try {
                    fetch(`http://localhost:5000/admin/event/ticket/create/${data}`, {
        
                    method: "POST",
                    body: JSON.stringify(formData.ticketList),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    }).then(async (response) => {
                        const resp = await response.json();
                        resp ? console.log(`success adding tickets at id: ${data}`) : console.log('failed adding tickets');
                    })
                } catch (e) {
                    console.error(e);
                }
                data ? router.push(`/event/${data}`) : console.log('failed');
            })
        } catch (e) {
            console.error(e);
        }
    }

    const setOrg = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setOrgId(event.target.value);
      };

    console.log(orgId);


    return (
         <div className='flex flex-col h-auto w-screen overflow-y-scroll bg-[rgb(5,6,6)] p-5 pb-[7vh]'>      
            <div className="relative">
            {!tokenStatus? <SignInModal setTokenStatus={setTokenStatus} tokenStatus={tokenStatus} toggleMenu={toggleModal}/> : <></>}
            {orgList.length>0? 
            <div className='flex flex-col justify-center items-center fixed z-10 bg-[rgb(16,17,19)] rounded-lg border-2 max-w-[90%] border-red-500 mt-80 mx-10 py-10 '>
                <label className='text-2xl p-2 text-[rgb(233,186,0)]'>Select an Organization
                <select value={orgId} onChange={setOrg} className=" flex justify-center items-center  bg-[rgb(16,17,19)] text-5xl text-[rgb(230,232,239)] hover:text-[rgb(0,204,255)] ">
                    {orgList.map((option: IOrganization)=><>
                        <option value={option.id} className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'>{option.name}</option>
                    </>)}
                </select></label>
                <button className='flex justify-center items-center p-2 bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px] px-10' onClick={toggleModal}>Create</button>
            </div> : <></> }
                <form className='flex flex-col' onSubmit={authorize}>   
                    <div style={{backgroundImage: `url(${formData.file})`}} className="flex flex-col justify-end items-end pr-2 pb-2 overflow-y bg-[div: var(backgroundImage)] h-[30rem] bg-cover rounded-lg mt-5 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]">                
                        <div className=' flex flex-col justify-end items-end max-h-[10%]'>
                            {formData.file == '' ? <h3 className='flex flex-col justify-center items-center text-xl text-[rgb(240,242,249)] pb-5 pt-0 px-10'>DESIGN YOUR EVENT PAGE</h3> : <></>}
                            <form className='absolute z-0 mt-[30%] justify-end items-end'>
                        <div className='mt-[90%] h-[100%] flex flex-col justify-end items-end'><label htmlFor="file-upload" className="text-5xl ">
                        <FaCamera style={{color:'yellow'}}/>
                        <input type="file" id="file-upload" placeholder='text'className='hidden' onChange={handleChange}/></label></div>
                    </form>
                        </div>
                    </div>
                    <h3 className='text-[rgb(240,242,249)] py-2 mt-4 pl-1'>Event Details</h3>
                    <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[1.5rem] w-[100%] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="name" placeholder='My Event*' value={formData.name} onChange={(e) => setFormData((prev:any) => ({ ...prev, name: e.target.value }))} required />
                    <div className='flex'>
                        <input className='p-3 pl-2 rounded-lg mb-4 mr-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="startTime" type="text" placeholder='Start time*' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} value={formData.startDate} onChange={(e) => setFormData((prev:any) => ({ ...prev, startDate: e.target.value }))}   required/>
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="endTime" type="text" placeholder='End time*' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} required value={formData.endDate} onChange={(e) => setFormData((prev:any) => ({ ...prev, endDate: e.target.value }))}/>
                    </div>
                    <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="venue" placeholder='Venue*' value={formData.venue} onChange={(e) => setFormData((prev:any) => ({ ...prev, venue: e.target.value }))} required />
                    <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="address" placeholder='Address*' required value={formData.address} onChange={(e) => setFormData((prev:any) => ({ ...prev, address: e.target.value }))}/>
                    <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] ' name="category" placeholder='Enter a Category (optional)' value={formData.category} onChange={(e) => setFormData((prev:any) => ({ ...prev, category: e.target.value }))}/>
                    <textarea name="description" placeholder='Show your attendees what they can expect.' className='bg-[rgb(43,44,44)] p-3 pl-2 rounded-lg mb-4 mr-1 w-[100%] text-[rgb(240,242,249)] text-[20px] h-80 placeholder:text-[rgb(134,135,137)] placeholder:text-[20px]' value={formData.description} onChange={(e) => setFormData((prev:any) => ({ ...prev, description: e.target.value }))}></textarea>
                    <div className='border-b-2 border-b-[rgb(134,135,137)]'><h2 className='text-[rgb(240,242,249)] py-2 mt-4 pl-2'>Tickets</h2></div>
                    {formData.ticketList.length>0 ? formData.ticketList.map((ticket:any) => <TicketBank price={ticket.price} name={ticket.name} toggleMenu={toggleMenu}/>) : <TicketBank price={formData.price} name={"Default Ticket"} toggleMenu={toggleMenu}/> }
                    <button className='flex justify-center items-center p-2 bg-[rgb(240,242,249)] text-black mt-5 rounded-[50px]' type="submit">Create Event</button>
                </form>
            </div>
    </div> 
       
    )
}
export default CreateEvent;
