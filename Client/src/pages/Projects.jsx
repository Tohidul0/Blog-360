import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CallCompo from '../components/CallCompo';

function Projects(props) {

    const [morepost, setMorepost] = useState(null);
    const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000' ;

    useEffect(() =>{
        const laodposts = async () =>{
              try{
                const res = await fetch(`${apiUrl}/api/post/allposts`)
              const data = await res.json()
              setMorepost(data.posts); 
              //console.log(data.posts)
              } 
              catch (err){
                console.log(err);
              }
            
        }
        laodposts();
    }, [])




    return (
        <div className='min-h-screen mt-20'>
            <h1 className='text-center text-3xl font-serif '>Projects</h1>

            <div className=' sm:w-full md:w-4/5 sm:mx-auto flex flex-wrap gap-5 justify-center '>
                    {morepost && morepost.map(onepost => <PostCard onepost={onepost} key={onepost._id}></PostCard>)}
            </div>
            <CallCompo></CallCompo>   
        </div>
    );
}

export default Projects;