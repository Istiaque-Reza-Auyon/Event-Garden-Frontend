import React from 'react';
import NavBar from './component/NavBar';

type pageProps = {
  
};

const page:React.FC<pageProps> = () => {
  
  return <div className='bg-black h-screen'>
    <NavBar></NavBar>
  </div>
}
export default page;