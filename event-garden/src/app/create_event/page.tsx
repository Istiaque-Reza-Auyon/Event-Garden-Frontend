"use client"

import React, {useState, createContext} from 'react';
import CreateTicket from '../component/CreateTicket';
import { ICreateTicket } from '../assets/interfaces';
import CreateEvent from '../component/CreateEvent';




type pageProps = {
};

export const FormContext = createContext<any>(undefined);

const page:React.FC<pageProps> = () => {  
      const[isOpen, setIsOpen] = useState(false);
      const [formData, setFormData] = useState({
        file: 'https://s3.amazonaws.com/images.posh.vip/create-event-flyer-placeholders/Default_Flyer_Placeholder.webp',
        token : false,
        image: '',
        name: '',
        startTime: '',
        endTime: '',
        venue: '',
        address: '',
        category: '',
        description: '',
        url: '',
        price: 10,
        ticketList: [{ name: 'Default Ticket', price: 10, quantity: null, startDate: null }],
      });


      

      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

      const addTicket = (formEvent: any) => {
        setIsOpen(!isOpen);
        formEvent.preventDefault();
        const formData: any = new FormData(formEvent.target);
        const ticket: ICreateTicket = formData.get('ticketName').trim().length>0 ? {name: formData.get('ticketName'), startDate: formData.get('startTime'), quantity: formData.get('quantity'), price: formData.get('price'), description: formData.get('description')} : {name: "Default Ticket", startDate: null, quantity: null, price: 10,description:''} ;
        setFormData((prev:any) => ({ ...prev, ticketList: [...prev.ticketList, ticket] }));
    };

    const handleChange = async (e:any) => {
      setFormData((prev:any) => ({ ...prev, image: e.target.files[0] }));
      await uploadImage();
      if(formData.url) {
          setFormData((prev:any) => ({ ...prev, file: URL.createObjectURL(e.target.files[0]) }));
      }
  }

  const uploadImage = async () => {
    const data = new FormData()

    data.append("file", formData.image)
    data.append("upload_preset", "auyon98")
    data.append("cloud_name", "dvjmvqxsp")

    try {fetch("https://api.cloudinary.com/v1_1/dvjmvqxsp/image/upload",{
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
          {!isOpen? <FormContext.Provider value={{ formData, setFormData, handleChange, toggleMenu }}><CreateEvent  /> </FormContext.Provider> :<FormContext.Provider value={{ addTicket,toggleMenu }}><CreateTicket/></FormContext.Provider>}
        </>
      )
}
export default page;