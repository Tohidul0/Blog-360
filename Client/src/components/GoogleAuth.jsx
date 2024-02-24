import { Button } from 'flowbite-react';
import React from 'react';
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import app from '../firebase/firebase.init';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
function GoogleAuth(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const apiUrl = process.env.REACT_APP_BACKEND_URL ;
    const hendleGoogle = async () =>{
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt : 'select_account'})
        try{
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch(`${apiUrl}/api/google`,{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email : resultFromGoogle.user.email,
                    photoUrl : resultFromGoogle.user.photoURL
                })
                
            });
            const data = await res.json();
            console.log(resultFromGoogle.user.photoURL)
            console.log(data)
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/')
            }
            
        }
        catch(err){
            dispatch(signInFailure(err.maessage))
        }
    }
    return (
        <Button type='button' outline  className='mt-5  w-full' onClick={hendleGoogle}>
           <AiFillGoogleCircle className='w-6 h-6'></AiFillGoogleCircle> 
           <span className='ml-5'>Log In with Google</span>
        </Button>
    );
}

export default GoogleAuth;