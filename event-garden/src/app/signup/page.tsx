"use client"

import React, {useState} from 'react';
import SignUpForm from '../component/SignUpForm';
import LottieLoader from '../component/LottieLoader';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [loader, setLoader]  = useState(false);
    
    return (
        <div className='flex flex-col bg-black h-screen'>
            {loader?<LottieLoader/>:<SignUpForm setLoader={setLoader}></SignUpForm>}
        </div>
    )
}
export default page;