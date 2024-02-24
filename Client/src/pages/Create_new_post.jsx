import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from './../firebase/firebase.init';


import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from 'firebase/storage';

function Create_new_post(props) {
   
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [clientiamge, setClientimage] = useState(null)
  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000' ;

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        alert('Please select an image');
        return;
      }
      if (file) {
        const imagecl= URL.createObjectURL(file);
        setClientimage(imagecl)
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
            console.log(formData);
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const hendleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const res = await fetch(`${apiUrl}/api/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
    
    return (
        <div className='min-h-screen pt-10'>
            <h1 className='text-3xl mx-auto text-center'>Create A post</h1>
            <form onSubmit={hendleSubmit}>
            <div className='border border-dotted sm:w-full md:w-3/5 mx-auto mt-5 h-48 flex justify-center  items-center'>
            <input type='file' id="image" name='image'  accept='image/*' onChange={(e) => setFile(e.target.files[0])} ></input>
            <Button type='button' className=' h-12 p-4 rounded' onClick={handleUpdloadImage} >
                Upload Image
            </Button>  
            </div>
             { clientiamge &&(
                <div className='sm:w-full  md:w-3/5 mx-auto mt-5 h-80 overflow-auto'>
                    <img className='h-80  mx-auto' src={clientiamge}></img>
                </div>
            )} 
            <TextInput type='text'id="title"  placeholder='Title' className='sm:w-full md:w-3/5 mx-auto mt-5' onBlur={(e) => setFormData({...formData,[e.target.id] : e.target.value})}></TextInput>
            <Select id="catagory"  className='sm:w-full md:w-3/5 mx-auto mt-5' onBlur={(e) => setFormData({...formData,[e.target.id] : e.target.value})}>
                <option type="uncategorized">Choose a catagory</option>
                <option value="javascript">javascript</option>
                <option value="React">React</option>
                <option value="Redux">Redux</option>
                <option value="NodeJs">NodeJs</option>
                <option value="Expressjs">Expressjs</option>
            </Select>
            <div className='sm:w-full md:w-3/5 mx-auto'>
            <textarea id="content" onBlur={(e) => setFormData({...formData,[e.target.id] : e.target.value})} placeholder='write about your post' name="comment" rows="4" className=" w-full mx-auto  border rounded-md  mt-5 bg-gray-700 text-white leading-tight"></textarea>
            </div>
            <Button type='submit' className='sm:w-full md:w-3/5 mx-auto mt-5 bg-gradient-to-r from-blue-500 to-green-500'>Post</Button>
            </form>
            
            
        </div>
    );
}

export default Create_new_post;