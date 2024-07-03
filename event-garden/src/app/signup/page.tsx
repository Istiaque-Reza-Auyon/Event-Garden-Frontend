"use client"

import React, {useState} from 'react';
import SignUpForm from '../component/SignUpForm';
import LottieLoader from '../component/LottieLoader';
import toast, { Toaster } from 'react-hot-toast';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [loader, setLoader]  = useState(false);
    
    return (
        <div className='flex flex-col bg-black h-screen'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {loader?<LottieLoader/>:<SignUpForm toast={toast} setLoader={setLoader}></SignUpForm>}
        </div>
    )
}
export default page;