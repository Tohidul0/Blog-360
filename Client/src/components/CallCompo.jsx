import { Button } from 'flowbite-react';
import React from 'react';

function CallCompo(props) {
    return (
        <div className='md:w-3/5 sm:w-4/5 border-2 p-5 rounded-lg mx-auto md:flex md:h-60 sm:h-80 '>
            <div className='flex items-center justify-center flex-1 sm:h-40 md=h-full '>
                <div>
                <h1 className='text-3xl '>Learn React??</h1>
                <p className=' opacity-70 mt-2'>hwegldid.jdjkdhdi;</p>
                <Button color='green' className='mt-2' href='https://www.udemy.com/course/build-real-world-application-projects-using-react/'>Learn 100 React project</Button>
                </div>

            </div>
            <div className='md:w-1/2 sm:w-full   overflow-hidden ' >
                <img src ="https://www.zfort.com/images/blog/og/60984916adf01_cover-a1d5b40.png "></img>
            </div>
        </div>
    );
}

export default CallCompo;