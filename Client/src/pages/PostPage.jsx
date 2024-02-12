import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <div  className='justify-center flex'>
        {
            post ? (
                <div className='min-h-screen'>
                    <div className='justify-center'>
                        <h1 className='text-center text-5xl font-serif pt-5'>{post.title}</h1>
                        <Button pill className='text-center text-xs mt-3 mx-auto  '>{post.catagory}</Button>
                    </div>
                    <img className='w-3/5 mx-auto pt-5 rounded-lg overflow-hidden' src={post.image}></img>
                    <div className='  border-2 w-3/5 mx-auto rounded my-5 p-5'> 
                        <p className='text-2xl'>{post.content}</p>
                    </div>
                </div>
            ) : (
                <div className='min-h-screen justify-center'>
                     <Spinner className='size-1/6'></Spinner>
                 </div>
            )
        }
        </div>
    );
}

export default PostPage;