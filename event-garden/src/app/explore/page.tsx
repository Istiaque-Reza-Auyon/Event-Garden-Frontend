import React from 'react';
import Event from '../component/Event';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return (
        <div className='flex flex-col items-center p-10 bg-[rgb(16,17,19)] h-screen'>
            <p className='text-white'>Explore Events</p>
            <Event></Event>
        </div>
    )
}
export default page;