import React, { useEffect, useState } from 'react';

import { BiSolidLike } from "react-icons/bi";

function SingleComment(props) {
    const {content, userId, likes, numberOfLikes} =props.singleCom;
    const {hendleLikeComment} =props;
    const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000' ;
   // console.log(props.singleCom)
    const [user, setUser] = useState({});

    useEffect(() =>{
        const getUser = async () =>{
            try{
                const res = await fetch(`${apiUrl}/api/user/${userId}`)
                const data= await res.json();
                setUser(data);
                console.log(data);
            }
            catch(err){
                console.log(err);
            }
        }
        getUser();
    }, [userId])
    return (
        <div className='border-b shadow-2xl m-5 px-5 py-2 '>
           
                {user && (<div className='flex align-middle items-center gap-2'>
                <img className='rounded-full w-8 h-8' src={user.profilePicture}></img>
                    <h className=' text-green-600 font-bold'>{user.email}</h>
                    
                    </div>)}
            
            <h1 className='ps-14 opacity-70'>{content}</h1>
            < div className='ps-14 flex items-center gap-2  '>
                <BiSolidLike  onClick={hendleLikeComment} className={`text-grey hover:text-teal-600 cursor-pointer  ${
                    numberOfLikes > 0  && 'text-teal-600'
                }`}  />
                {likes.length > 0 &&(<p>{likes.length} like</p>)}
            </div>
        </div>
    );
}

export default SingleComment;