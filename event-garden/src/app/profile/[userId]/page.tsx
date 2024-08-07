"use client"

import React,{useState,useEffect, useContext} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaCamera } from "react-icons/fa6";
import Link from 'next/link';
import { MdEmail } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { isoToDateTime } from '../../../../utils';
import Cookies from 'js-cookie';
import { FormContext } from '@/app/assets/contextApi';
type pageProps = {
    
};

const page:React.FC<pageProps> = () => {

    const [url, setUrl] = useState(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1715968798/samples/logo.png`);
    const [userObject, setUserObject] = useState<any>();
    const { setTokenStatus} = useContext(FormContext);
    
    const pathname = usePathname();
    const userId = pathname.split('/')[2];

    const router = useRouter();

    const handleUpload = async (e:any) => {
        const data = new FormData()
        data.append("file",e.target.files[0])
        data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!)
        data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME!)

        try {fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!,{
            method: "POST",
            body: data
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.url) {
                setUrl(data.url);
                const user = {profilePic : data.url};
                try{
                    fetch(`${process.env.NEXT_PUBLIC_URL}/update/user/pic?id=${userId}`,{
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then(resp => resp.json())
            .then(data => {if (data) "successfull";})
                    } catch (e) {
                        e;
                    }
            }
        })}catch(err){
            err;
        }
    }

    

    
    useEffect(() => {    
        if (userId) {
          getEvent(userId)
        }
      }, [userId]);

    const getEvent =(eventId:string) => {
      try{
          fetch(`${process.env.NEXT_PUBLIC_URL}/profile/${userId}`, {
          method: "GET",
        //   credentials: 'include',
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              "token": `${Cookies.get('token')}`
          }
          })
          .then(resp => resp.json()).then(data => {
            if (data!=='error parsing jwt' && data){ 
                setUserObject(data);
                if(data.profilePic) setUrl(data.profilePic);
            }
            else router.push('/signin');
          })
      } catch(e) {
          console.error(e);
      }
  };

  const logOut = () => {
    Cookies.remove('token');
    setTokenStatus(false);
  }

    
    return (
        <div className='h-screen overflow-y-scroll bg-[rgb(21,22,24)]'>
            <div className='relative flex flex-col justify-start items-center p-4 bg-[rgb(21,22,24)]'>
                <div style={{backgroundImage: `url(${url})`}} className=" flex flex-col justify-center items-center bg-[div: var(backgroundImage)] h-[20vh] w-[20vh] bg-contain rounded-full mt-5 border-[rgb(233,186,0)] border-2 shadow-custom1 shadow-[rgb(233,186,0)]"></div>
                {/* <img src={file} className='max-h-[90%] max-w-[100%] mb-3'/> */}
                <form className='absolute mt-[17.5vh]  items-center'>
                    <div className='mt-[]'><label htmlFor="file-upload" className="text-3xl ">
                    <FaCamera style={{color:'yellow'}}/>
                    <input type="file" id="file-upload" placeholder='text'className='hidden' onChange={handleUpload}/></label></div>
                </form>
                <div className='flex justify-center w-[60vh] border-b-[0.5px] border-[rgb(65,66,66)]'><h1 className='text-white text-4xl mt-4 '>{userObject?.firstName + ' '+ userObject?.lastName}</h1></div>
                <div className='flex flex-col items-center w-[100%] border-b-[0.5px] border-[rgb(65,66,66)]'>
                    <div className='flex flex-col items-center border-b-[0.5px] border-[rgb(65,66,66)]'>
                        <Link href={`/orgs`}><button className='flex items-center p-2 bg-[rgb(240,242,249)] text-black mt-5 rounded-[50px]'>View Organizations</button></Link>
                        <Link href={`/signin`} className='w-[100%] '><button className='flex items-center justify-center p-2 bg-[rgb(240,242,249)] text-black mt-5 rounded-[50px] mb-5 w-[100%]' onClick={logOut}>Logout</button></Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-start w-[100%]'>
                    <p className='flex justify-star items-center text-white p-4'><MdEmail style={{color: 'white'}} className='flex items-center justify-center mr-2'/>{userObject?.email}</p>
            </div>
            <div className='flex justify-start w-[100%]'>
                    <p className='flex justify-star items-center text-white p-4'><FaCrown style={{color: 'white'}} className='flex items-center justify-center mr-2'/>Joined {isoToDateTime(userObject?.createdAt)}</p>
            </div>
        </div>)
}
export default page;