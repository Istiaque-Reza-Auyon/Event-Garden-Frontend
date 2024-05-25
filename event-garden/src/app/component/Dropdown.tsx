import React, { useState } from 'react';

type DropdownProps = {
    options: readonly string[] ;
    zone: any;
    setZone: (e:any) => void;
};



const Dropdown:React.FC<DropdownProps> = ({options, zone, setZone}) => {
    const [selectedOption, setSelectedOption] = useState(options[1]);

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target);
        setSelectedOption(event.target.value);
        if(event.target.value == 'New York City'||event.target.value == 'Miami'||event.target.value == 'Los Angeles')handleZone(event.target.value);
      };

      const handleZone = (event:string) => {
        setZone(event);
    }

    return (
    <div className='flex justify-center items-center bg-[rgb(16,17,19)]'>
        <select value={selectedOption} onChange={handleChange} className=" flex justify-center items-center border-b-2 border-[rgb(230,232,239)]  bg-[rgb(16,17,19)] text-[30px] text-[rgb(230,232,239)] hover:text-[rgb(0,204,255)] appearance-none">
            {options.map((option)=><>
                <option value={option} className='bg-[rgb(16,17,19)] text-[rgb(230,232,239)]'>{option}</option>
             </>)}
        </select>
    </div>
    )
}
export default Dropdown;