import React from 'react';
import {  Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

function Register(props) {
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
            <form className=''>
                <Label value='Your User Name'/>
                <TextInput
                    type='text'
                    placeholder='Username'
                    id='username'
                    />
                <Label className='mt-5' value='Your Email'/>
                <TextInput
                    type='text'
                    placeholder='your@gmail.com'
                    id='email'
                    />
                <Label className='mt-5' value='Your Passwoard'/>
                <TextInput
                    type='password'
                    placeholder='passwoard'
                    id='passwoard'
                    />
                <Button className='mt-5'>Sign Up</Button>

               
        

        
            </form>
            <p className='text-sm mt-2'>Already have an account?
            <Link to='/login'>
            <span className='text-cyan-500 font-semibold'>Sign in</span>
            </Link>
            </p>
            </div>
        </div>
    );
}

export default Register;