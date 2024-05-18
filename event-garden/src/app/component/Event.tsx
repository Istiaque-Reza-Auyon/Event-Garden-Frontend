import React from 'react';

type EventProps = {
    name: string;
    venue: string;
    poster: string;
    startDate: string;
};




const Event:React.FC<EventProps> = ({name,venue,poster,startDate}) => {
    console.log(poster)
    
    return (
        <div style={{backgroundImage: `url(${poster})`}} className="relative bg-[div: var(backgroundImage)] bg-cover bg-no-repeat h-[400px] w-[354px] rounded-[20px] ">
            <div className='absolute flex flex-col justify-between  inset-0 bg-custom-gradient rounded-[20px]'>
                <img className='size-14 rounded-full ml-[15px] mt-[15px]' src="	https://images.posh.vip/images/061bee4b-7bc6-4d2e-af45-e4a3921cbd8b.jpg"/>
                <div className="EventCard-info flex items-center  pb-2 ml-3">
                    <div className="EventCard-date">
                        <div className="EventCard-dotw text-[rgb(255,255,255)] p-2 border-e-2 border-[rgb(119,119,119)] font-bold text-[20px]">{startDate}</div>
                    </div>
                    <div className='ml-5'>
                        <div className="EventCard-name text-[rgb(255,255,255)] font-semibold text-[16px]">{name}</div>
                        <div className="EventCard-location text-[rgb(255,255,255)] font-extralight text-[15px]">{venue}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Event;