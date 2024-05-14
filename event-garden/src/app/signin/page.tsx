import React from 'react';
import SignInForm from '../component/SignInForm';
// import background from '@/app/assets/logo.png'

type signInPageProps = {
    
};

const signInPage:React.FC<signInPageProps> = () => {
    
    return ( 
    <div className='bg-black h-screen'>
        <SignInForm></SignInForm>
    </div>
)}
export default signInPage;