import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

function DashProfile(props) {
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser)
    return (
        <div>
           <h1 className='text-center mt-20 text-3xl font-bold'> Profile</h1>
           <form  className='md:w-3/6 md:mx-auto sm:w-full sm:mx-4 mt-10'>
                <div className='flex align-middle justify-center rounded-full  '>
                    <img className='border-rounded rounded-xl' src={currentUser.profilePicture} alt='User'></img>
                </div>
                <Label value='Your User Name'/>
                <TextInput
                    type='text'
                    placeholder='Username'
                    defaultValue={currentUser.username}
                    id='username'
                    // onBlur={hendleChange}
                    />
                <Label className='mt-5' value='Your Email'/>
                <TextInput
                    type='text'
                    placeholder='your@gmail.com'
                    defaultValue={currentUser.email}
                    id='email'
                   
                    />
                <Label className='mt-5' value='Your Password'/>
                <TextInput
                    type='password'
                    placeholder='*************'
                    id='passwoard'
                    
                    
                    />
                <Button type="submit" className='mt-5 mb-5 w-full' outline >
                    
                        Update
                    
                </Button>
                
                <div className='flex justify-between'>
                <h2 className='text-red-500 cursor-pointer'>Delete Account</h2>
                <h2 className='text-red-500 cursor-pointer'>Sign Out</h2>
                </div>
            </form>
            
        </div>
    );
}

export default DashProfile;