import React from 'react';
import LandingPage from './component/LandingPage';
import Head from 'next/head';


type pageProps = {

};

const page: React.FC<pageProps> = () => {

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-black h-screen'>
        <LandingPage></LandingPage>
      </div>
    </>
  )
}
export default page;