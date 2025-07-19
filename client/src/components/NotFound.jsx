import React from 'react'
import catGif from '../assets/404/cat.gif'

const NotFound = () => {
    return (
        <div
        className='w-full h-screen flex justify-center items-center bg-[#181818]'>
            {/* <DotLottieReact
            src="https://lottie.host/660a81b2-204d-45f1-a9f5-cc653f4ac000/1bo8FkAGnO.lottie"
            loop
            autoplay
            /> */}
            <div
            className='text-[#EDEDED]'>
                {/* <img src={catGif} alt="Loading animation" className="w-[450px] h-[450px]" /> */}
                <h1 className='text-[10vw] font-semibold'>404</h1>
                <p className='text-[2vw] text-center font-normal'>Page Not Found!</p>
            </div>
        </div>
    )
}

export default NotFound
