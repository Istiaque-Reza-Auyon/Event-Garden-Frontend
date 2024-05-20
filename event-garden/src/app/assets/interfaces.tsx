type TicketType = {"id"?: number,
"name": string,
"price": number,
"quantity": number,
"startTime": string|null,
"eventId": number}


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
    "organizationId": number,
    "startDate": any,
    "endDate": any,
    "venue": string,
    "poster": any,
    "zone": string,
    "latitude": any,
    "longitude": any,
    "live": any,
    "description": any,
    attendees?: any
}
export type {TicketType, IOrganization, IEvent}