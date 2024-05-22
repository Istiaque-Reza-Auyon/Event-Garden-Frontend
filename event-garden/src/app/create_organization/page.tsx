"use client";

import React, { useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCamera } from "react-icons/fa6";

type pageProps = {

};

const page:React.FC<pageProps> = () => {
    const options: readonly string[] = ['Unites States', 'Canada', 'Mexico']
    const [selectedOption, setSelectedOption] = useState(options[1]);
    const[brandNameValid, setBrandNameValid] = useState(0);
    const [file, setFile] = useState('https://res.cloudinary.com/dvjmvqxsp/image/upload/v1715968798/samples/logo.png');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const router = useRouter();

    const messageMap: {[key:number] : string} = {
        1: "Brand name should be greater than 3 characters.",
        2: "Please, try again!"
    }

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
      };

    const addOrganization = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData:any = new FormData(event.target as HTMLFormElement);
        const organization = formData.get('brandName').trim().length > 3 ? {name: formData.get('brandName'), country: formData.get('country')} : setBrandNameValid(1);

        try {
            fetch("http://localhost:5000/admin/organization/create", {

            method: "POST",
            body: JSON.stringify(organization),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then(async (response) => {
                const data = await response.json()
                data ? router.push('/organization_dashboard') : setBrandNameValid(2);
            })
        } catch (e) {
            console.error(e);
            setBrandNameValid(2);
        }
    }

    const uploadImage = async () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "auyon98")
        data.append("cloud_name", "dvjmvqxsp")

        try {fetch("https://api.cloudinary.com/v1_1/dvjmvqxsp/image/upload",{
            method: "POST",
            body: data
        })
        .then(resp => resp.json())
        .then(data => {
            setUrl(data.url)
            console.log(data.url);
        })}catch(err){
            ( console.log(err))
        }
    }

    const handleUpload = async (e:any) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
        await uploadImage();
    }

    return (
        <div className='bg-[rgb(16,17,19)] h-screen overflow-y-scroll py-5 px-4'>
            <div className='flex justify-end pb-5'>
                <p className='flex justify-center items-center text-[rgb(212,213,215)] font-[DM Sans] mr-1'>Already have an organization?</p>
                <div className='flex justify-center items-center'><Link href="/my_organization" className='text-[rgb(233,186,0)] font-[DM Sans]'>My Dashboard</Link></div>
            </div>
            <h1 className='text-[rgb(230,232,239)] text-[34px]'>Create Organization</h1>
            <form className='flex flex-col' onSubmit={addOrganization}>
                <p className='text-[rgb(230,232,239)] py-4 mt-5'>Where will you be selling tickets?</p>
                <select value={selectedOption} name="country" onChange={handleChange} className="border-2 border-[rgb(119,119,119)] rounded-lg w-[100%] bg-[rgb(16,17,19)] text-[15px] text-[rgb(230,232,239)] p-3 ">
                {options.map((option)=><>
                    <option value={option} className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'>{option}</option>
                </>)}
                </select>
                <p className='text-[rgb(230,232,239)] py-4 mt-5'>What is your organization called?</p>
                <input type="text" name='brandName' placeholder='Brand Name' className="border-2 border-[rgb(119,119,119)] rounded-lg w-[100%] bg-[rgb(16,17,19)] text-[15px] text-[rgb(230,232,239)] p-3 " required />
                <p className='text-[rgb(230,232,239)] py-2 mt-5'>Add your brand's logo. (Square)</p>
                   <div className='relative'>
                        
                            <div className='relative'>
                            
                            <div style={{backgroundImage: `url(${file})`}} className=" flex flex-col justify-center items-center absolute mb-10 bg-[div: var(backgroundImage)] h-[10rem] w-[10rem] bg-contain rounded-full mt-5 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]"></div>
                            <label htmlFor="file-upload" className="text-3xl absolute ml-16 mt-36">
                                <FaCamera style={{color:'yellow'}}/>
                                <input type="file" id="file-upload" placeholder='text'className='hidden' onChange={handleUpload} /></label>
                            
                        </div>
                        <button type="submit" className='flex justify-center items-center w-[100%] mt-72 bg-[rgb(255,255,255)] rounded-full p-3 my-5 text-black'>Continue</button>
                   </div>
            </form>
           { brandNameValid === 0 ? <></> :<p className='flex justify-center pt-7 text-[rgb(233,186,0)] text-xl '>{messageMap[brandNameValid]}</p>}
        </div>
    )
}
export default page;