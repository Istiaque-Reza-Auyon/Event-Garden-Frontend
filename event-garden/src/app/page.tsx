import React from 'react';
import LandingPage from './component/LandingPage';

type pageProps = {
  
};

const page:React.FC<pageProps> = () => {
  
  return <div className='bg-black h-screen'>
    <LandingPage></LandingPage>
  </div>
}
export default page;