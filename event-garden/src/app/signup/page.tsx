import React from 'react';
import SignUpForm from '../component/SignUpForm';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return (
        <div className='flex flex-col bg-black h-screen'>
            <SignUpForm></SignUpForm>
        </div>
    )
}
export default page;