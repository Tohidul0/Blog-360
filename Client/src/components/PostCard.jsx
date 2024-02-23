import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({onepost}) {

    const {image, title,slug, catagory} = onepost
    return (
        <div className='max-w-sm p-6 mt-20 mb-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" '>
           
            <div className=' '>
                    <img className='h-40 mx-auto w-60 rounded-lg' src={image}></img>
            </div>


            



            

            <div className='flex justify-center' >
                <div>
                <a href="#">
                        <h5 className="mb-2 text-xl font-semibold text-center tracking-tight text-gray-900 dark:text-white truncate">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-center text-gray-700 dark:text-gray-400">{catagory}</p>
                <Link  to={`/post/${slug}`}>
                    <a href="#" as='div' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </a>
                </Link>
                </div>
            </div>

        </div>
    );
}

export default PostCard;