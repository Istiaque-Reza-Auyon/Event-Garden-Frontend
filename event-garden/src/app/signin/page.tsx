"use client"

import React, { useState } from 'react';
import SignInForm from '../component/SignInForm';
import LottieLoader from '../component/LottieLoader';

// import background from '@/app/assets/logo.png'

type signInPageProps = {
    
};

const signInPage:React.FC<signInPageProps> = () => {  
    const [loader, setLoader]  = useState(false);
    return ( 
    <div className='h-screen overflow-y-scroll bg-black'>
        {loader?<LottieLoader/>:<SignInForm setLoader={setLoader}></SignInForm>}
    </div>
)}
export default signInPage;