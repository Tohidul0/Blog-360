import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import {useDispatch, useSelector} from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import GoogleAuth from '../components/GoogleAuth';

function LogIn(props) {
    const [formData, setFormData] = useState({});
   const {loading, error:errormessage} = useSelector(state => state.user)
    const navigate = useNavigate('');
    const dispatch = useDispatch();
    const apiUrl = process.env.REACT_APP_BACKEND_URL ;
    
    
    // hendleChane part----------------------------------------
    const hendleChange =(e) =>{
        setFormData({...formData, [e.target.id] : e.target.value.trim() })
        
    }




    // onsubmit part------------------------------------------
    const hendleSubmit = async (e) =>{
        e.preventDefault(); 
        console.log(formData)
        console.log('clickeeddd')
        if(!formData.email || !formData.passwoard || formData.email==='' || formData.passwoard === ''){
          dispatch(signInFailure("all field requred"))
        }
        try{
            dispatch(signInStart());
            const res = await fetch(`${apiUrl}/api/signIn`,{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify(formData)
                
            });
           
            const data = await res.json();
            if(data.success === "false"){
                
                
                dispatch(signInFailure(data.maessage))
                
            }
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        }
        catch(err){
            
            dispatch.signInFailure(err.meassage);
        }
    }


    return (
        <div className='mt-20  min-h-screen md:mx-auto sm:px-7  flex justify-center flex-col md:flex-row   max-w-3xl '>
            <div className=' flex-1  my-20 '>
                    <Link to='/' className='white-space: nowrap   text-3xl font-bold'>
                        <span className='text-red-600 cursor-pointer'>Blog</span>
                        360
                    </Link>
                    <p className='py-5'>You can LogIn with your email & passworad</p>
            </div>
            <div className='flex-1 '>
            <form  onSubmit={hendleSubmit}>
                
                <Label className='mt-5' value='Your Email'/>
                <TextInput
                    type='text'
                    placeholder='your@gmail.com'
                    id='email'
                    onBlur={hendleChange}
                    />
                <Label className='mt-5' value='Your Password'/>
                <TextInput
                    type='password'
                    placeholder='Password'
                    id='passwoard'
                    onBlur={hendleChange}
                    />
                <Button type="submit" className='mt-5 mb-5 w-full' disabled={loading} >
                    {
                      loading ? (
                        <>
                        <Spinner className='text-sm'/> loading.....
                        </>
                        
                      )
                      :
                        "Log In"
                    }
                </Button>
                <GoogleAuth></GoogleAuth>

            </form>
            <p className='text-sm mt-2'>don't have an account?
            <Link to='/register'>
            <span className='text-cyan-500 font-semibold'>Sign Up</span>
            </Link>
            </p>
            {errormessage && (
                <Alert className='mt-5' color='failure'>{errormessage}</Alert>
            )
                
            }
            </div>
            
            
            
        </div>
    );
}

export default LogIn;