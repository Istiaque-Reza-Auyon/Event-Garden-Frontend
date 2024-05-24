import React from 'react';
import Link from 'next/link';

type EventProps = {
    name: string;
    venue: string;
    poster: string;
    startDate: string;
    orgPoster : string;
    orgId : string;
};




const Event:React.FC<EventProps> = ({name,venue,poster,startDate, orgPoster, orgId}) => {

    const handleInnerLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.stopPropagation(); // Stop propagation only for the inner link
    };
    
    return (
        <div style={{backgroundImage: `url(${poster})`}} className="relative bg-[div: var(backgroundImage)] bg-cover bg-no-repeat h-[400px] w-[354px] rounded-[20px] ">
            <div className='absolute z-0 flex flex-col justify-between inset-0 bg-custom-gradient rounded-[20px]'>
                <div></div>
                <Link href={`/org/${orgId}`} className='absolute z-10' onClick={handleInnerLinkClick} ><button ><div style={{backgroundImage: `url(${orgPoster})`}} className='size-14 rounded-full ml-[15px] mt-[15px] bg-[div: var(backgroundImage)] bg-cover'></div></button></Link>
                <div className="EventCard-info flex items-center  pb-2 ml-3">
                    <div className="EventCard-date max-w-[30%]">
                        <div className="EventCard-dotw text-[rgb(119,119,119)] p-2 border-e-2 border-[rgb(119,119,119)] font-bold text-base">{startDate}</div>
                    </div>
                    <div className='ml-5'>
                        <div className="EventCard-name text-[rgb(255,255,255)] font-semibold text-2xl">{name}</div>
                        <div className="EventCard-location text-[rgb(255,255,255)] font-extralight text-[15px]">{venue}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Event;