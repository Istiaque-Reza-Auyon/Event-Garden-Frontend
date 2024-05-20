import React from 'react';
import { RiArrowRightDoubleFill } from "react-icons/ri";


type OrgProps = {
    organizationName:string;
};

const Org:React.FC<OrgProps> = ({organizationName}) => {
    const poster = 'https://images.posh.vip/images/b7ba76e0-7f2a-4191-87a0-cadb7ca4d062.jpg'
    
    return  (
        <div style={{backgroundImage: `url(${poster})`}} className=" bg-cover bg-no-repeat h-[200px] w-[354px] rounded-[20px] mt-4 ">
            <div className=' flex flex-col inset-0 bg-custom-gradient rounded-[20px] h-[100%] w-[100%] backdrop-blur-sm'>    
                <div className='flex flex-col justify-between  mx-5 h-[90%] w-auto'>
                    <h2 className="EventCard-name text-[rgb(255,255,255)] font-semibold text-2xl max-h-[100%] max-w-[100%] mt-5">{organizationName}</h2>
                    <button className="EventCard-location flex justify-end items-center text-[rgb(255,255,255)] font-extralight max-h-[100%] max-w-[100%] text-[10px] ">Manage Organization<RiArrowRightDoubleFill className='ml-2'/></button>
                </div> 
            </div>
        </div>
    )
}
export default Org;