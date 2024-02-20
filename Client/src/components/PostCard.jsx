import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({onepost}) {

    const {image, title,slug} = onepost
    return (
        <div className='border-2 sm:mx-auto rounded-xl p-2 m-5   border-sky-800 '>
           
            <img className='h-40 w-60 rounded-lg' src={image}></img>
            <div className=' flex-row items-center justify-center mx-auto mt-2rounded p-3'>
            <p className='text-center'>{title}</p>
            <Link  to={`/post/${slug}`}>
            <button className='mx-auto border-2 hover:opacity-80 ms-16 mt-2 items-center border-rose-200 rounded-md p-1 bg-indigo-500 '   >Read more</button>
            </Link>
            </div>
        </div>
    );
}

export default PostCard;