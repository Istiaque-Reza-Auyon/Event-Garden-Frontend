"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';


type SignUpFormProps = {
    
};

const SignUpForm:React.FC<SignUpFormProps> = () => {

    const[emailValid, setEmailValid] = useState(0);   
    

    const messageMap = {
        1: "User created",
        2: "email already exists!",
        3: "Password doesn't match!",
        4: "Password should be greater than 8 characters.",
        5: "First name & last name should be greater than 3 characters.",
        6: "email is not valid!"
    }

    function addUser(formEvent:any) {
        formEvent.preventDefault();
    
        const formData:any = new FormData(formEvent.target)
    
        let newUser;
    
        (formData.get("firstName").trim().length > 3 && formData.get("lastName").trim().length > 3 && formData.get("password").length > 8 && formData.get("password") === formData.get("confirmPassword") && formData.get("email").includes('@gmail.com') )? newUser = {firstName: formData.get("firstName"), lastName: formData.get("lastName"), email: formData.get("email"), password: formData.get("password"), gender: formData.get("gender"), userId: formData.get("firstName") + formData.get("lastName")}
        : formData.get("password") !== formData.get("confirmPassword") ? setEmailValid(3) 
        : formData.get("password").length <= 8 ? setEmailValid(4)
        : formData.get("firstName").trim().length < 3 || formData.get("lastName").trim().length < 3 ? setEmailValid(5)
        : !formData.get("email").includes('@gmail.com') ? setEmailValid(6)
        : setEmailValid(7)
        
       try {
            fetch("http://localhost:5000/sign-up", {
        
            // Adding method type
            method: "POST",
        
            // Adding body or contents to send
            body: JSON.stringify(newUser),
        
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(async (response) => {
            const data = await response.json()
            console.log(1);
            if (data !== 'error' && data !== 'email already exists') {
                setEmailValid(1);
                console.log(1);
                Cookies.set('token', data , {expires: 7});
            }
    else if(data === 'email already exists') {
        setEmailValid(2);
    };
        })
    } catch (e) {
        console.error(e);
    }
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
            {  emailValid === 1 ? <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[1]}</p> 
            :  emailValid === 2? <div><p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[2]}</p><p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>Try with another email.</p></div>
            :  emailValid === 3? <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[3]}</p>
            :  emailValid === 4? <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[4]}</p>
            :  emailValid === 5? <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[5]}</p>
            :  emailValid === 6? <p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[6]}</p>
            :  <></>}
            </div>
        </div>

        
    )
}
export default SignUpForm;