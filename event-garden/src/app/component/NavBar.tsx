import React from 'react';
// import logo from '@/app/assets/logo.png'

type NavBarProps = {
    toggleMenu: () => void;
};

const NavBar:React.FC<NavBarProps> = ({toggleMenu}) => {
    
    return (<div className='flex flex-row justify-between  bg-black p-[20px] pl-0'>
        {/* <Image className='size-14 rounded-full mr-[-12px] ' src={logo} alt='logo'/> */}
    <span className='text-[rgb(255,204,0)] text-2xl mt-1 font-[DM Sans]'>Event Garden</span>
    <button className='mb-10' onClick={toggleMenu} >
    <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"/></svg>
    </button>
</div>)
}
export default NavBar;