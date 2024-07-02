import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/loader.json';

type LottieLoaderProps = {

};

const LottieLoader: React.FC<LottieLoaderProps> = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className='bg-black h-screen overflow-y-scroll pt-[20vh]'>
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
        </div>
    );
}
export default LottieLoader;