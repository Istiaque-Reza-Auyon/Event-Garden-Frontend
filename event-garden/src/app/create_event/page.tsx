"use client"

import React, {useState} from 'react';
import CreateEvent from '../component/CreateEvent';
import CreateTicket from '../component/CreateTicket';


type pageProps = {
    price: number;
};

const page:React.FC<pageProps> = () => {   

  type Ticket = {
    name: any;
    quantity: any;
    price: any;
    startDate: any;
  };

    const [price, setPrice] = useState(10);

    const [isOpen, setIsOpen] = useState(false);

    const [ticketList, setTicketList] = useState<Ticket[]>([{name: 'Default Ticket', price: 10, quantity: null, startDate: null}]);

    const addTicket = (formEvent: any) => {
      formEvent.preventDefault();

      const formData: any = new FormData(formEvent.target);
      const ticket: Ticket = formData.get('ticketName').trim().length>0 ? {name: formData.get('ticketName'), startDate: formData.get('startTime'), quantity: formData.get('quantity'), price: formData.get('price')} : {name: "Default Ticket", startDate: null, quantity: null, price: 10} ;
      setTicketList([...ticketList,ticket])
  }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    return (
        <>
          {!isOpen? <CreateEvent price={price} toggleMenu={toggleMenu} ticketList={ticketList}/> : <CreateTicket setPrice={setPrice} toggleMenu={toggleMenu} addTicket={addTicket} />}
        
        </>
    )
}
export default page;