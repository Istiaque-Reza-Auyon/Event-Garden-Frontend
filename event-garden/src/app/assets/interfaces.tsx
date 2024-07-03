type ITicket = {"id"?: number,
"name": string,
"price": number,
"quantity": number,
"startTime": string|null,
"eventId": number,
"description": string}


type IOrganization = {
    "id"?: number,
    "name": string,
    "adminId": any,
    "country": string,
    "bioGraphy": any,
    "instaUsername": any,
    "twitterUsername": any,
    "linkedInUrl": any,
    "websiteUrl": any,
    "customLinks": any,
    events?: IEvent[]
}

type IEvent = {
    "id"?: number,
    "name": string,
    "organizationId": string,
    "startDate": any,
    "endDate": any,
    "venue": string,
    "poster": any,
    "zone": string,
    "latitude": any,
    "longitude": any,
    "live": any,
    "description": any,
    attendees?: any,
    totalRevenue?: number,
    totalTicketsSold?: number,
    users?: any,
    date: string,
    attendeeCount: number
}

type ICreateTicket = {
    name: any;
    quantity: any;
    price: any;
    startDate: any;
    description:string;
  };


interface IFormContext {
    formData: {
        file: string;
        image: any;
        url: string;
        price: number;
        ticketList: ICreateTicket[];
    };
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

type IUser = {
    orderId: string;
    profilePic: string;
}

export type {ITicket, IOrganization, IEvent, ICreateTicket,IFormContext, IUser}