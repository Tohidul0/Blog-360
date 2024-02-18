import { Button } from 'flowbite-react';
import React from 'react';

function PostCard({onepost}) {

    const {image, title} = onepost
    return (
        <div className='border-2  rounded-s-xl  p-2 m-5 border-sky-800'>
           
            <img className='h-40 w-60 rounded-lg' src={image}></img>
            <div className=' flex-row items-center justify-center mx-auto mt-2'>
            <p className='text-center'>{title}</p>
            <Button className='mx-auto' outline >Read more</Button>
            </div>
        </div>
    );
}

export default PostCard;