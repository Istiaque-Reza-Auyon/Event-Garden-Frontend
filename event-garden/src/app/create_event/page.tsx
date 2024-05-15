import React from 'react';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return (
        <div className='flex flex-col h-auto overflow-y-scroll bg-[rgb(5,6,6)] p-5 '>
            <div className="flex flex-col justify-center items-center bg-[url(https://s3.amazonaws.com/images.posh.vip/create-event-flyer-placeholders/Default_Flyer_Placeholder.webp)] h-[30rem] bg-cover rounded-lg mt-10 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]">
                    <div className=' flex flex-col justify-center items-center'>
                        <h3 className='flex flex-col justify-center items-center text-[34px] text-[rgb(240,242,249)] pb-5 pt-0 pl-24'>DESIGN YOUR EVENT PAGE</h3>
                        <div className=' flex justify-center items-center pl-24 w-[100%]'><input type="file" placeholder='text'/></div>
                    </div>
                </div>
        </div>
    )
}
export default page;