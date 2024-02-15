import React, { useEffect, useState } from 'react';

function SingleComment(props) {
    const {content, userId} =props.singleCom;
    const [user, setUser] = useState({});

    useEffect(() =>{
        const getUser = async () =>{
            try{
                const res = await fetch(`http://localhost:3000/api/user/${userId}`)
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
        <div className='border shadow-2xl m-5'>
           
                {user && (<div className='flex align-middle items-center gap-2'>
                <img className='rounded-full w-8 h-8' src={user.profilePicture}></img>
                    <h className=' text-green-600 font-bold'>{user.email}</h>
                    
                    </div>)}
            
            <h1 className='ps-14'>{content}</h1>
        </div>
    );
}

export default SingleComment;