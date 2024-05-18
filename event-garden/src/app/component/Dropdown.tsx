import React, { useState } from 'react';

type DropdownProps = {
    options: readonly string[] ;
};



const Dropdown:React.FC<DropdownProps> = ({options}) => {
    const [selectedOption, setSelectedOption] = useState(options[1]);

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
      };

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