import React from 'react';
import Link from 'next/link';

type SignUpFormProps = {
    
};

const SignUpForm:React.FC<SignUpFormProps> = () => {
    
    return (
        <div className='flex flex-col pt-[40px] pb-[60px] px-[20px]'>
            <div className='flex justify-end pb-5'>
                <p className='flex justify-center items-center text-[rgb(212,213,215)] font-[DM Sans] mr-1'>Already have an account?</p>
                <div className='flex justify-center items-center'><Link href="/signin" className='text-[rgb(233,186,0)] font-[DM Sans]'>Sign In</Link></div>
            </div>
            <h1 className='text-[34px] my-[6px] text-[rgb(244,246,253)]'>Sign Up</h1>
            <div className='pt-[20px]'>
            <form id="formId" className='flex flex-col'>
                
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="firstName" placeholder='First Name' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="lastName" placeholder='Last Name' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="email" placeholder='Email' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="password" placeholder='Password' type='password' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="confirmPassword" placeholder='Confirm Password' type='password' required />
                <button type="submit" className='flex justify-center items-center p-2  bg-[rgb(255,255,255)] text-black mt-5 rounded-[50px]'>Join Event Garden</button>
            </form>
            </div>
        </div>
    )
}
export default SignUpForm;