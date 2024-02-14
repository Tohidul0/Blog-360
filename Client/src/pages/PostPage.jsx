import { Button, Spinner, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallCompo from '../components/CallCompo';
import { useSelector } from 'react-redux';

function PostPage(props) {
    const [comment, setComment] = useState({});
    const {currentUser} = useSelector(state => state.user)
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

    const goToComment = async(e) =>{
        e.preventDefault();
        setComment({
            [e.target.id] : e.target.value,
            postId : post._id,
            userId : currentUser._id,
        })
    }

    const saveComment = async (e) =>{
        e.preventDefault(); 
        if(!comment){
            return;
        }
        else{
            console.log(comment)
            const res = await fetch('http://localhost:3000/api/comment/create',{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify(comment)
                
            });
        }

    }



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
                    {currentUser ? (
                        <div className='md:w-3/5 sm:w-4/5 mx-auto mt-5'>
                            <p>Write a comment</p>
                            <form onSubmit={saveComment}>
                            <Textarea rows={3} id='content' placeholder='commet here' onBlur={goToComment}></Textarea>
                            <Button color='grey' type='submit'  className='border-2 mt-2 bg-fuchsia-600'>comment</Button>
                            </form>
                        </div>
                    ) : (<div>
                        <Link to='/LogIn'>
                        <h2 className='text-xs text-center mt-2'>Write a comment you have to <span className=' text-teal-700 font-bold'>Sign in</span></h2>
                        </Link>
                    </div>) }
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