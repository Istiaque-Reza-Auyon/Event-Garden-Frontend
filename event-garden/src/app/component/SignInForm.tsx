"use client";

import React, {useContext, useState} from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormContext } from '../assets/contextApi';

type SignInFormProps = {
    setLoader: (status: boolean) => void;
};

const SignInForm:React.FC<SignInFormProps> = ({setLoader}) => {

    const[status, setStatus] = useState(0);

    const { setTokenStatus} = useContext(FormContext);
    const router = useRouter();

    const signInUser = (formEvent:any) => {
        formEvent.preventDefault();

        const formData:any = new FormData(formEvent.target);
        const user = formData.get("email") && formData.get("password") ? {email: formData.get("email"), password: formData.get("password")} : null;
        
        try {
            fetch(`${process.env.NEXT_PUBLIC_URL}/sign-in`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(async (response) => {
                const data = await response.json()
                if (data) {
                    setStatus(0);
                    Cookies.set('token', data , {expires: 7});
                    router.push('/orgs');
                    setLoader(true);
                    setTokenStatus(true);
                }
                else {
                    setStatus(1);
                };
            })
        } catch(e) {

        }
    }
    
    return (
    <div className='flex flex-col p-10'>
        <h2 className='flex justify-center items-center  text-[rgb(233,186,0)] p-10 text-[40px] font-[DM Sans]'>Sign In</h2>
        <div className='flex flex-col p-5 pt-0'>
            <form className='flex flex-col' onSubmit={signInUser}>
                {/* <label className='p-4 pl-0 pb-1 text-[rgb(233,186,0)] font-[DM Sans]'>Email</label> */}
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="email" placeholder='Enter email' required />
                {/* <label className='p-4 pl-0 pb-1 text-[rgb(233,186,0)] font-[DM Sans]'>Password</label> */}
                <input className='p-2 pl-6 rounded-[50px] bg-transparent border-2 text-[rgb(224,225,227)]' name="password" placeholder='Enter password' type="password" required />
                <button type="submit" className='flex justify-center items-center p-2  bg-[rgb(233,186,0)] text-black mt-5 rounded-[50px]'>Continue</button>
            </form>
            {status === 1? <p className='flex justify-center pt-7 text-[rgb(233,0,12)] text-xl'>Email or password didn't mactch! Try again.</p> : <></>}
            <p className='flex justify-center items-center text-[rgb(212,213,215)] mt-[10px] font-[DM Sans]'>Don't have an account?</p>
            <div className='flex justify-center items-center'><Link href="/signup" className='underline text-[rgb(233,186,0)] pt-2 font-[DM Sans] underline-offset-4 '>Sign Up</Link></div>
            <div className='flex justify-center items-center'><Link href="/signup" className='underline text-[rgb(233,186,0)] pt-4 font-[DM Sans] underline-offset-4 '>Forgot Password</Link></div>
        </div>        
    </div>
)}
export default SignInForm;