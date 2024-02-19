import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TbUsersGroup } from "react-icons/tb";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { AiOutlineComment } from "react-icons/ai";
import PostCard from '../PostCard';
import Oneuser from '../Oneuser';

function MainDash(props) {
    const {currentUser} = useSelector(state => state.user)
    const [users, setUsers] = useState({})
    const [userposts, setUserposts] = useState({})
    const [allcomment, setAllcomment] = useState(null)
    const [morepost, setMorepost] = useState(null);



    useEffect(() =>{
        const laodposts = async () =>{
            const accessToken = 'access_token';
              try{
                const res = await fetch('http://localhost:3000/api/user/alluser', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials (cookies) for cross-origin requests
                  });
              const data = await res.json()
              setUsers(data); 
              //console.log(data.users)
              console.log(data)
              } 
              catch (err){
                console.log(err);
              }
            
        }
        laodposts();
    }, [])




    
    useEffect(() =>{
        const laodposts = async () =>{
              try{
                const res = await fetch('http://localhost:3000/api/post/allposts')
              const data = await res.json()
              setUserposts(data); 
              //console.log(userposts)
              //console.log(data)
              } 
              catch (err){
                console.log(err);
              }
            
        }
        laodposts();
    }, [])





    
    useEffect(() =>{
        const laodposts = async () =>{
            const accessToken = 'access_token';
              try{
                const res = await fetch('http://localhost:3000/api/comment/getAllComment', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials (cookies) for cross-origin requests
                  });
              const data = await res.json()
              setAllcomment(data); 
              console.log(data)
              } 
              catch (err){
                console.log(err);
              }
            
        }
        laodposts();
    }, [])




    useEffect(() =>{
      const laodposts = async () =>{
            try{
              const res = await fetch('http://localhost:3000/api/post/allposts?limit=3')
            const data = await res.json()
            setMorepost(data.posts); 
            console.log(data.posts)
            } 
            catch (err){
              console.log(err);
            }
          
      }
      laodposts();
  }, [])

    return (
        <div className='mt-5'>
            <div className=' sm:flex-row sm:gap-4 md:flex   md:gap-5 justify-center items-center'>
                <div className='border-2 bg-blue-400 rounded-2xl p-5 m-3'>
                    <TbUsersGroup className='w-10 h-10 mx-auto mb-2'/>
                    <h1>Total Users : {users.totaluser}</h1>
                    <h1>Last Month Users : {users.lastMonthUser}</h1>
                </div>
                <div className='border-2 bg-violet-400 rounded-2xl p-5 m-3'>
                    <BsFillFileEarmarkPostFill className='w-10 h-10 mx-auto mb-2'/>
                    <h1>Total Post : {userposts.totalpost}</h1>
                    <h1>Last Month Post : {userposts.lastMonthPost}</h1>
                </div>
                {allcomment && (
                <div className='border-2 bg-slate-500 rounded-2xl p-5 m-3'>
                    <AiOutlineComment className='w-10 h-10 mx-auto mb-2'/>
                    <h1>Total Comments : {allcomment.totalcomment}</h1>
                    <h1>Last Month Comments : {allcomment.lastMonthComment}</h1>
                </div>
                )}
                
            </div>


            <div className='mt-20'>
                    <h1 className='text-3xl text-center'>Recent Post</h1>
                    <div className=' sm:w-full sm:flex-row md:w-4/5 mx-auto md:flex  gap-2'>
                        {morepost && morepost.map(onepost => <PostCard onepost={onepost} key={onepost._id}></PostCard>)}
                    </div>
            </div>


            {users.users && (
              <div className='my-20 '>
              <h1 className='text-3xl text-center font-serif'>Some User</h1>
              <div className='flex sm:flex-row   gap-3 flex-wrap mt-10 mx-5'>
              {users.users.map(one => <Oneuser one={one} key={one._id}></Oneuser>)}
              </div>
              </div>
            )}

        </div>
    );
}

export default MainDash;