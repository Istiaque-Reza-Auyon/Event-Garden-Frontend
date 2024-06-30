"use client"

import React, {useState, createContext} from 'react';
import CreateTicket from '../component/CreateTicket';
import { ICreateTicket } from '../assets/interfaces';
import CreateEvent from '../component/CreateEvent';
import { FormContext } from '../assets/contextApi';





type pageProps = {
};

const page:React.FC<pageProps> = () => {  
      const[isOpen, setIsOpen] = useState(false);
      const [formData, setFormData] = useState({
        token : false,
        name: '',
        startTime: '',
        saleStartTime: '',
        endTime: '',
        venue: '',
        address: '',
        category: '',
        description: '',
        url: 'https://s3.amazonaws.com/images.posh.vip/create-event-flyer-placeholders/Default_Flyer_Placeholder.webp',
        price: 10,
        ticketList: [{ name: 'Default Ticket', price: 10, quantity: null, startDate: null }],
      });

      

      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      const startDateVal = (e:any) => {
        setFormData((prev:any) => ({ ...prev, saleStartTime: e.target.value }))
      }

      const addTicket = (formEvent: any) => {
        setIsOpen(!isOpen);
        formEvent.preventDefault();
        const formData: any = new FormData(formEvent.target);
        const ticket: ICreateTicket = formData.get('ticketName').trim().length>0 ? {name: formData.get('ticketName'), startDate: formData.saleStartTime, quantity: formData.get('quantity'), price: formData.get('price'), description: formData.get('description')} : {name: "Default Ticket", startDate: null, quantity: null, price: 10,description:''} ;
        setFormData((prev:any) => ({ ...prev, ticketList: [...prev.ticketList, ticket] }));
    };



  const handleChange = async (e : any) => {
    const data = new FormData()

    data.append("file", e.target.files[0])
    data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!)
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME!)

    try {fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!,{
        method: "POST",
        body: data,      
    })
    .then(resp => resp.json())
    .then(data => {
        setFormData((prev:any) => ({ ...prev, url: data.url }));
        
    })}catch(err){
        ( console.log(err))
    }
}

      
      return (
        <>
          {!isOpen? <FormContext.Provider value={{ formData, setFormData, handleChange, toggleMenu }}><CreateEvent  /> </FormContext.Provider> :<FormContext.Provider value={{ addTicket,toggleMenu,startDateVal }}><CreateTicket/></FormContext.Provider>}
        </>
      )
}
export default page;