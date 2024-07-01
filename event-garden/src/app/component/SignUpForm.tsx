"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';



type SignUpFormProps = {
    
};

const SignUpForm:React.FC<SignUpFormProps> = () => {

    const[emailValid, setEmailValid] = useState(0);   
    

    const messageMap : {[key: number]: string} = {
        1: "User created",
        2: "Email already exists! Try with another email.",
        3: "Password doesn't match!",
        4: "Password should be greater than 8 characters.",
        5: "First name & last name should be greater than 3 characters.",
        6: "Email is not valid!",
        7: "There was a problem! Try later."
    }

    function addUser(formEvent:any) {
        formEvent.preventDefault();
    
        const formData:any = new FormData(formEvent.target);
        let newUser;
    
        (formData.get("firstName").trim().length > 3 && formData.get("lastName").trim().length > 3 && formData.get("password").length > 8 && formData.get("password") === formData.get("confirmPassword") && formData.get("email").includes('@gmail.com') )? newUser = {firstName: formData.get("firstName"), lastName: formData.get("lastName"), email: formData.get("email"), password: formData.get("password"), gender: formData.get("gender"), userId: formData.get("firstName") + formData.get("lastName")}
        : formData.get("password") !== formData.get("confirmPassword") ? setEmailValid(3) 
        : formData.get("password").length <= 8 ? setEmailValid(4)
        : formData.get("firstName").trim().length < 3 || formData.get("lastName").trim().length < 3 ? setEmailValid(5)
        : !formData.get("email").includes('@gmail.com') ? setEmailValid(6)
        : setEmailValid(7)
        
       if (newUser) { try {
        console.log(process.env.NEXT_PUBLIC_URL);
            fetch(`${process.env.NEXT_PUBLIC_URL}/sign-up`, {

            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then(async (response) => {
                const data = await response.json()
                if (data !== 'error' && data !== 'email already exists') {
                    setEmailValid(1);
                    // Cookies.set('token', data , {expires: 7});
                }
                else if(data === 'email already exists') {
                    setEmailValid(2);
                };
            })
        } catch (e) {
            setEmailValid(7)
            console.error(e);
        }}
    }
    
    
    return (
        <div className='flex flex-col pt-[40px] pb-[60px] px-[20px]'>
            <div className='flex justify-end pb-5'>
                <p className='flex justify-center items-center text-[rgb(212,213,215)] font-[DM Sans] mr-1'>Already have an account?</p>
                <div className='flex justify-center items-center'><Link href="/signin" className='text-[rgb(233,186,0)] font-[DM Sans]'>Sign In</Link></div>
            </div>
            <h1 className='text-[34px] my-[6px] text-[rgb(244,246,253)]'>Sign Up</h1>
            <div className='pt-[20px]'>
            <form id="formId" className='flex flex-col' onSubmit={addUser}>            
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="firstName" placeholder='First Name' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="lastName" placeholder='Last Name' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="email" placeholder='Email' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="password" placeholder='Password' type='password' required />
                <input className='p-2 pl-6 rounded-[50px] mb-4 bg-transparent border-2 text-[rgb(224,225,227)]' name="confirmPassword" placeholder='Confirm Password' type='password' required />
                <button type="submit" className='flex justify-center items-center p-2  bg-[rgb(255,255,255)] text-black mt-5 rounded-[50px]'>Join Event Garden</button>
            </form>
            {  emailValid === 0 ? <></> 
            : <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[emailValid]}</p> }
            </div>
        </div>        
    )
}
export default SignUpForm;