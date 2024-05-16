import React from 'react';
import EventDescription from '../component/EventDescription';



type EventDetailsProps = {
    toggleMenu: () => void;
};

const EventDetails:React.FC<EventDetailsProps> = ({toggleMenu}) => {
    
    return (
        <div className='flex flex-col bg-[rgb(16,17,19)] h-auto overflow-y-scroll'>
            <div className=" h-[400px] w-auto ">
                <img src='https://posh-images-alts-production.s3.amazonaws.com/6632765b375a2d01d5c8aa31/1400x1749.webp' className="h-[100%] w-[100%] "/>
            </div>
            <div className='flex flex-col'>
                <EventDescription toggleMenu={toggleMenu} title='XERXES: 📣 REP YOUR FLAG FESTIVAL🚩' venue='Mehanata Bulgarian Bar' date='Sat, May 18 at 9:00 PM - 4:00 AM' location='113 Ludlow St, New York, NY 10002, USA' attendeeCount='24' description="XERXES MAFIA PRESENTS:

📣REP YOUR FLAG FESTIVAL 📣

WERE BRINGING TOGETHER THE WORLD ON THIS ONE 🌎

🚩Let your colors fly high at our REP YOUR FLAG event!🎉 Dive into a world of culture and endless fun! 🌎Celebrating where you come from, let's create unforgettable memories at XERXESMAFIA!💥 Secure your spot now and let's

LIVE PERFORMANCE BY: @somaryjane__ 🇵🇪

‼️LADIES FREE TIL 10PM WITH RSVP & FLYER REPOST (MUST REPOST BEFORE 5PM) ‼️

THIS SATURDAY MAY 18th 🪩🛸✨ WE’RE THROWING THE HOTTEST EVENT THIS SATURDAY 👽

SOUNDS BY : @djzoe777 🇨🇺 & @m.s.f.i.o.r.e.l.l.a 🇨🇴 & @DJflexonee me 🇯🇲+ MORE

TICKET LINK IN BIO 🎟️

!!! We look forward to see everyone there, repost and share let’s throw a banger

🙌EARLY ARRIVAL ENCOURAGED🙌

🇯🇵🇬🇧- LIVE MUSIC

🇮🇳 🇳🇴 - DJ’S

🇪🇸🇩🇴 -DRINKS

113 Ludlow St

New York, NY 10002

United States

#wearetheculture #seeyousoon #nyc #nycnightlife #nycclub 🪅🪩

COMMENT (🌎) to enter ticket giveaway"></EventDescription>
            </div>   
        </div>
    )
}
export default EventDetails;