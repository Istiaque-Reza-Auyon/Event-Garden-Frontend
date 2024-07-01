import React, { useState, useContext, useEffect } from 'react';
import TicketBank from './TicketBank';
import { FaCamera } from "react-icons/fa6";
import { IOrganization } from '../assets/interfaces';
import { FormContext } from '../assets/contextApi';
import SignInModal from '../component/SignInModal';
import { useRouter } from 'next/navigation';
import CreateOrgModal from './CreateOrgModal';
import Cookies from 'js-cookie';

type CreateEventProps = {
};


const CreateEvent: React.FC<CreateEventProps> = () => {

    const { formData, setFormData, handleChange, toggleMenu } = useContext(FormContext);
    const [orgList, setOrgList] = useState<IOrganization[]>([]);
    const [orgId, setOrgId] = useState('');
    const [tryAgain, setTryAgain] = useState(0);
    const [tokenStatus, setTokenStatus] = useState(true);
    const [show, setShow] = useState(false);

    const router = useRouter();

    const allocateOrg = (formEvent: any) => {
        formEvent.preventDefault();

        try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/admin/organization/find/all`, {
                method: "GET",
                // credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": `${Cookies.get('token')}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.length == 0) setShow(true);
                    if (data !== 'Error finding all organizations') {
                        setOrgList(data);
                    }
                    else {
                        setTokenStatus(false);
                        setShow(true);
                    }
                })
        } catch (e) {
            console.error(e);
        }
    }

    const authorize = (formEvent: any) => {
        formEvent.preventDefault();

        try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/find/id`, {
                method: "GET",
                // credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": `${Cookies.get('token')}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data !== 'error parsing jwt') {
                        if (orgId == '') {
                            allocateOrg(formEvent);
                            setTokenStatus(true);
                        }
                        else addEvent(formEvent);
                    }
                    else {
                        setTokenStatus(false);
                    }
                })
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    const toggleModal = () => {
        if (orgList.length == 1) setOrgId(String(orgList[0].id));
        if (!tokenStatus) setTokenStatus(true);
        if (orgList.length > 0) setOrgList([]);
    }


    const addEvent = async (formEvent: any) => {
        formEvent.preventDefault();

        const formdata: any = new FormData(formEvent.target);
        const event = formdata.get('name').trim().length > 0 && formdata.get('venue').trim().length > 0 ? { name: formdata.get('name'), startDate: formdata.get('startTime'), endDate: formdata.get('endTime'), zone: formdata.get('address'), venue: formdata.get('venue'), poster: formData.url, description: formdata.get('description') } : undefined;


        try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/admin/event/create/${Number(orgId)}`, {

                method: "POST",
                body: JSON.stringify(event),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(async (response) => {
                const data = await response.json();
                try {
                    fetch(`${process.env.NEXT_PUBLIC_URL}/admin/event/ticket/create/${data}`, {

                        method: "POST",
                        body: JSON.stringify(formData.ticketList),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }).then(async (response) => {
                        const resp = await response.json();
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

    const setOrg = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrgId(event.target.value);
    };

    const handleCreate = (event: any) => {
        event.preventDefault();
        setShow(false);

        const formData: any = new FormData(event.target as HTMLFormElement);

        const organization = { name: formData.get('name') };


        try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/admin/organization/create`, {

                method: "POST",
                body: JSON.stringify(organization),
                // credentials: 'include',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": `${Cookies.get('token')}`
                }
            }).then(async (response) => {
                const data = await response.json();
            })
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div className='flex flex-col h-auto w-screen overflow-y-scroll bg-[rgb(5,6,6)] p-5 pb-[7vh]'>
            <div className="relative">
                {!tokenStatus ? <SignInModal setTokenStatus={setTokenStatus} tokenStatus={tokenStatus} toggleMenu={toggleModal} /> : <></>}
                {orgList.length > 0 ?
                    <div className='flex flex-col justify-center items-center fixed z-10 bg-[rgb(16,17,19)] rounded-lg border-2 max-w-[100%] border-white mt-80 mx-4 py-10 shadow-2xl shadow-slate-100'>
                        <label className='text-2xl p-2 text-[rgb(233,186,0)]'>Select an Organization
                            <select value={orgId} onChange={setOrg} className=" flex justify-center items-center max-w-[100%]  bg-[rgb(16,17,19)] text-xl text-[rgb(230,232,239)] hover:text-[rgb(0,204,255)] ">
                                {orgList.map((option: IOrganization) => <>
                                    <option value={option.id} key={option.id} className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'>{option.name}</option>
                                </>)}
                            </select></label>
                        <button className='flex justify-center items-center p-2 bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px] px-10' onClick={toggleModal}>Create</button>
                    </div> : <></>}
                {show ? <CreateOrgModal show={show} handleCreate={handleCreate} /> : <></>}
                <form className='flex flex-col' onSubmit={authorize}>
                    <div style={{ backgroundImage: `url(${formData.url})` }} className="flex flex-col justify-end items-end pr-2 pb-2 overflow-y bg-[div: var(backgroundImage)] h-[30rem] bg-cover rounded-lg mt-5 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]">
                        <div className=' flex flex-col justify-end items-end max-h-[10%]'>
                            {formData.file == '' ? <h3 className='flex flex-col justify-center items-center text-xl text-[rgb(240,242,249)] pb-5 pt-0 px-10'>DESIGN YOUR EVENT PAGE</h3> : <></>}
                            <form className='absolute z-0 mt-[30%] justify-end items-end'>
                                <div className='mt-[90%] h-[100%] flex flex-col justify-end items-end'><label htmlFor="file-upload" className="text-5xl ">
                                    <FaCamera style={{ color: 'yellow' }} />
                                    <input type="file" id="file-upload" placeholder='text' className='hidden' onChange={handleChange} /></label></div>
                            </form>
                        </div>
                    </div>
                    <h3 className='text-[rgb(240,242,249)] py-2 mt-4 pl-1'>Event Details</h3>
                    <input className='p-3 pl-2 rounded-lg mb-4 bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[1.5rem] w-[100%] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="name" placeholder='My Event*' value={formData.name} onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))} required />
                    <div className='flex'>
                        <input className='p-3 pl-2 rounded-lg mb-4 mr-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="startTime" type="text" placeholder='Start time*' onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} value={formData.startTime} onChange={(e) => setFormData((prev: any) => ({ ...prev, startTime: e.target.value }))} required />
                        <input className='p-3 pl-2 rounded-lg mb-4 ml-1 w-[50%] bg-[rgb(43,44,44)] border-2 text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="endTime" type="text" placeholder='End time*' onFocus={(e) => (e.target.type = "datetime-local")} onBlur={(e) => (e.target.type = "text")} required value={formData.endTime} onChange={(e) => setFormData((prev: any) => ({ ...prev, endTime: e.target.value }))} />
                    </div>
                    <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="venue" placeholder='Venue*' value={formData.venue} onChange={(e) => setFormData((prev: any) => ({ ...prev, venue: e.target.value }))} required />
                    <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] border-2 text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] border-[rgb(233,186,0)] shadow-custom1 shadow-[rgb(233,186,0)]' name="address" placeholder='Address*' required value={formData.address} onChange={(e) => setFormData((prev: any) => ({ ...prev, address: e.target.value }))} />
                    <input className='p-3 pl-2 rounded-lg mb-4 w-[100%] bg-[rgb(43,44,44)] text-[rgb(240,242,249)] placeholder:text-[rgb(134,135,137)] text-[20px] ' name="category" placeholder='Enter a Category (optional)' value={formData.category} onChange={(e) => setFormData((prev: any) => ({ ...prev, category: e.target.value }))} />
                    <textarea name="description" placeholder='Show your attendees what they can expect.' className='bg-[rgb(43,44,44)] p-3 pl-2 rounded-lg mb-4 mr-1 w-[100%] text-[rgb(240,242,249)] text-[20px] h-80 placeholder:text-[rgb(134,135,137)] placeholder:text-[20px]' value={formData.description} onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}></textarea>
                    <div className='border-b-2 border-b-[rgb(134,135,137)]'><h2 className='text-[rgb(240,242,249)] py-2 mt-4 pl-2'>Tickets</h2></div>
                    {formData.ticketList.length > 0 ? formData.ticketList.map((ticket: any) => <TicketBank price={ticket.price} name={ticket.name} toggleMenu={toggleMenu} />) : <TicketBank price={formData.price} name={"Default Ticket"} toggleMenu={toggleMenu} />}
                    <button className='flex justify-center items-center p-2 bg-[rgb(240,242,249)] text-black mt-5 rounded-[50px]' type="submit">Create Event</button>
                </form>
                {tryAgain === 1 ? <p className='flex justify-center pt-7 text-[rgb(233,0,12)] text-xl'>Please,Try again!</p> : <></>}
            </div>
        </div>

    )
}
export default CreateEvent;
