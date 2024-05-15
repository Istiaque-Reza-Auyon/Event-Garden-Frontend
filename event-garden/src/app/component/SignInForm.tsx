import React from 'react';
import Link from 'next/link';

type SignInFormProps = {
    
};

const SignInForm:React.FC<SignInFormProps> = () => {
    
    return (
    <div className='flex flex-col p-10'>
        <h2 className='flex justify-center items-center  text-[rgb(233,186,0)] p-10 text-[40px] font-[DM Sans]'>Sign In</h2>
        <div className='flex flex-col p-5 pt-0'>
            <form className='flex flex-col'>
                {/* <label className='p-4 pl-0 pb-1 text-[rgb(233,186,0)] font-[DM Sans]'>Email</label> */}
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="email" placeholder='Enter email' required />
                {/* <label className='p-4 pl-0 pb-1 text-[rgb(233,186,0)] font-[DM Sans]'>Password</label> */}
                <input className='p-2 pl-6 rounded-[50px] bg-transparent border-2 text-[rgb(224,225,227)]' name="password" placeholder='Enter password' type="password" required />
                <button type="submit" className='flex justify-center items-center p-2  bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px]'>Continue</button>
            </form>
            <p className='flex justify-center items-center text-[rgb(212,213,215)] mt-[10px] font-[DM Sans]'>Don't have an account?</p>
            <div className='flex justify-center items-center'><Link href="/signup" className='underline text-[rgb(233,186,0)] pt-2 font-[DM Sans] underline-offset-4 '>Sign Up</Link></div>
            <div className='flex justify-center items-center'><Link href="/signup" className='underline text-[rgb(233,186,0)] pt-4 font-[DM Sans] underline-offset-4 '>Forgot Password</Link></div>
        </div>
    </div>
)
}
export default SignInForm;