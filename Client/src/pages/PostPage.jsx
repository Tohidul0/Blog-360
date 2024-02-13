import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CallCompo from '../components/CallCompo';

function PostPage(props) {
    const [err, setErr] = useState(null)
    const {postslug} = useParams();
    const [post, setPost] =useState(null)
    console.log(postslug)
    useEffect(() => {
        const loadPostSlug = async() =>{
            try{
                const res = await fetch(`http://localhost:3000/api/post/allposts?slug=${postslug}`)
                const data = await res.json();
                console.log(data.posts[0])
                setPost(data.posts[0])


            }
            catch(err){
                setErr(err);
            }
        }
        loadPostSlug();
    }, [postslug])
    return (
        <div  className='justify-center flex mb-10'>
        {
            post ? (
                <div className='min-h-screen'>
                    <div className='justify-center'>
                        <h1 className='text-center text-5xl font-serif pt-5'>{post.title}</h1>
                        <Button color='gray' pill className='text-center text-xs mt-3 mx-auto  '>{post.catagory}</Button>
                    </div>
                    <img className='md:w-3/5 sm:w-4/5 mx-auto pt-5 rounded-lg overflow-hidden' src={post.image}></img>
                    <div className=' border-y-2 md:w-3/5 sm:w-4/5 mx-auto rounded my-5 p-5'> 
                        <p className=''>{post.content}</p>
                    </div>
                    <CallCompo></CallCompo>
                </div>
            ) : (
                <div className='min-h-screen justify-center align-middle my-auto'>
                     <Spinner className='size-2xl'></Spinner>
                 </div>
            )
        }
        </div>
    );
}

export default PostPage;