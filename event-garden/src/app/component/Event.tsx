import React from 'react';

type EventProps = {
    
};




const Event:React.FC<EventProps> = () => {
    
    return (
        <div className="relative bg-[url('https://posh-images-alts-production.s3.amazonaws.com/6632765b375a2d01d5c8aa31/1400x1749.webp')] bg-cover bg-no-repeat h-[400px] w-[354px] rounded-[20px] ">
            <div className='absolute flex flex-col justify-between  inset-0 bg-custom-gradient rounded-[20px]'>
                <img className='size-14 rounded-full ml-[15px] mt-[15px]' src="	https://images.posh.vip/images/061bee4b-7bc6-4d2e-af45-e4a3921cbd8b.jpg"/>
                <div className="EventCard-info flex items-center  pb-2 ml-3">
                    <div className="EventCard-date">
                        <div className="EventCard-dotw text-[rgb(255,255,255)] p-2 border-e-2 border-[rgb(119,119,119)] font-bold text-[20px]">Fri</div>
                    </div>
                    <div className='ml-5'>
                        <div className="EventCard-name text-[rgb(255,255,255)] font-semibold text-[16px]">Cafe Flora</div>
                        <div className="EventCard-location text-[rgb(255,255,255)] font-extralight text-[15px]">Stone Street Cafe</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Event;