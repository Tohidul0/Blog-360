import React, { useState } from 'react';
import {  Link, useNavigate, } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

function Register(props) {
    const [formData, setFormData] = useState({});
    const [errormessage, setErrormessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate('');
    const hendleChange =(e) =>{
        setFormData({...formData, [e.target.id] : e.target.value.trim() })
        
    }
    const hendleSubmit = async (e) =>{
        e.preventDefault(); 
        console.log(formData)
        console.log('clickeeddd')
        if(!formData.username || !formData.email || !formData.passwoard){
          return   setErrormessage('all field required');
        }
        try{
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/signUp',{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
                
            });
           
            const data = await res.json();
            if(data.success === "false"){
                setLoading(false);
                
                return setErrormessage(data.maessage);
                
                
            }
            if(res.ok){
                setLoading(false);
                navigate('/signIn');
            }
        }
        catch(err){
            setLoading(false);
            return setErrormessage(err.message);
        }
    }


    return (
        <div className='mt-20 min-h-screen md:mx-auto sm:px-7  flex justify-center flex-col md:flex-row   max-w-3xl '>
            <div className=' flex-1  my-20 '>
                    <Link to='/' className='white-space: nowrap   text-3xl font-bold'>
                        <span className='text-red-600 cursor-pointer'>Blog</span>
                        360
                    </Link>
                    <p className='py-5'>you can register with your email & passworad</p>
            </div>
            <div className='flex-1 '>
            <form  onSubmit={hendleSubmit}>
                <Label value='Your User Name'/>
                <TextInput
                    type='text'
                    placeholder='Username'
                    id='username'
                    onBlur={hendleChange}
                    />
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
                <Button type="submit" className='mt-5' disabled={loading} >
                    {
                      loading ? (
                        <>
                        <Spinner className='text-sm'/> loading.....
                        </>
                        
                      )
                      :
                        "Sign Up"
                    }
                </Button>

            </form>
            <p className='text-sm mt-2'>Already have an account?
            <Link to='/login'>
            <span className='text-cyan-500 font-semibold'>Sign in</span>
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

export default Register;