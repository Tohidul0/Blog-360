import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../../redux/user/userSlice';

function DashProfile(props) {
    const {currentUser, error:errormessage} = useSelector(state => state.user)
    console.log(currentUser);
    const [imgUp, setImgUp] = useState(null);
    const [imgtourl, setImgtourl] =useState(null);
    const [formdata, setFormdata] = useState({});
    const dispatch = useDispatch()
    const hendleImgUp =(e) =>{
        const img =e.target.files[0]
       if(img){
        setImgUp(img);
        setImgtourl(URL.createObjectURL(img));
       }
    }
    console.log(imgUp)

    const hendleChange =(e) =>{
        setFormdata({...formdata, [e.target.id]: e.target.value})
    }
    
    const hendleSubmit =async (e) =>{
        

        e.preventDefault()
        if(!formdata) {
            return;
        }
        try{
            console.log(JSON.stringify(formdata));
            dispatch(updateStart())
            const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`,{
            method : 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify(formdata)
          });

          const data = await res.json();
          if(!res.ok){
            dispatch(updateFailure(data.maessage))
          }
          else{
            alert("update Successful")
            dispatch(updateSuccess(data));
          }
        }
        catch(err){
            dispatch(updateFailure(err.maessage))
        }

    }

    // window.confirm(
    //     function gootoDelete  (){
    //         console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyah")
    //     }
    // )
    const gotoDelete =  async () =>{
        // alert("are you sure delete Acount?");
        const yesDelete = window.confirm("are you sure delete Acount?");
        if(yesDelete){
            const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, { 
            method: "DELETE",
            headers: {'Content-Type' : 'application/json'},
            });

            const data = await res.json();
             if(!res.ok){
                dispatch(updateFailure(data.maessage))
             }
        //     else{
        //         alert("update Successful")
        //         dispatch(updateSuccess(data));
        //   }
        }
    }










    return (
        <div>
           <h1 className='text-center mt-20 text-3xl font-bold'> Profile</h1>
           <form onSubmit={hendleSubmit} className='md:w-3/6 md:mx-auto sm:w-full sm:mx-4 mt-10'>
                <input type='file' accept='image/*' onChange={hendleImgUp}></input>
                <div className='flex align-middle justify-center rounded-full '>
                    <img className='border-rounded rounded-xl w-20 h-20 overflow-hidden' src={imgtourl?imgtourl : currentUser.profilePicture} alt='User'></img>
                </div>
                <Label value='Your User Name'/>
                <TextInput
                    type='text'
                    placeholder='Username'
                    defaultValue={currentUser.username}
                    id='username'
                     onBlur={hendleChange}
                    />
                <Label className='mt-5' value='Your Email'/>
                <TextInput
                    type='text'
                    placeholder='your@gmail.com'
                    defaultValue={currentUser.email}
                    id='email'
                    onBlur={hendleChange}
                   
                    />
                <Label className='mt-5' value='Your Password'/>
                <TextInput
                    type='password'
                    placeholder='*************'
                    id='password'
                    onBlur={hendleChange}
                    
                    
                    />
                <Button type="submit" className='mt-5 mb-5 w-full' outline >
                    
                        Update
                    
                </Button>
                
                <div className='flex justify-between'>
                <h2 className='text-red-500 cursor-pointer' onClick={gotoDelete}>Delete Account</h2>
                <h2 className='text-red-500 cursor-pointer'>Sign Out</h2>
                </div>
                <div>
                {errormessage && (
                <Alert className='mt-5' color='failure'>{errormessage}</Alert>
            )
                
            }
                </div>
            </form>
            
        </div>
    );
}

export default DashProfile;