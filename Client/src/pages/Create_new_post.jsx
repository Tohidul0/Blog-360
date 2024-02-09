import { Button, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create_new_post(props) {
    const [form, setForm] = useState({});
    const navigate = useNavigate(null);

    const hendleImg = (e) =>{
        let img = e.target.files[0];
        if(img){
           img= URL.createObjectURL(img);
           setForm({...form, [e.target.id] : img}) 
        }
    }

    const hendleform = (e) =>{
        setForm({...form, [e.target.id] : e.target.value })
        
    }

    const hendleSubmit = async (e) =>{
        e.preventDefault();
        if(!form){
            return;
        }
        if(!form.title){
            return;
        }
        else{
            try{
                const res = await fetch('http://localhost:3000/api/post/create',{
                method : 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body : JSON.stringify(form)
            })


            const data = await res.json();
            if(!res.ok){
            //   
            return "error";
            }
            else{
                console.log(data)
                navigate(`/post/${data.slug}`)
            }


            }
            catch(err){
                return err;
            }
        }
    }
    return (
        <div className='min-h-screen pt-10'>
            <h1 className='text-3xl mx-auto text-center'>Create A post</h1>
            <form onSubmit={hendleSubmit}>
            <div className='border border-dotted sm:w-full md:w-3/5 mx-auto mt-5 h-48 flex justify-center  items-center'>
            <input type='file' id="image" accept='image/*' onChange={hendleImg} ></input>
            <Button type='button' className=' h-12 p-4 rounded' >
                Upload Image
            </Button>
            </div>
            {form.image &&(
                <div className='sm:w-full  md:w-3/5 mx-auto mt-5 h-80 overflow-auto'>
                    <img className='h-80  mx-auto' src={form.image}></img>
                </div>
            )}
            <TextInput type='text'id="title"  placeholder='Title' className='sm:w-full md:w-3/5 mx-auto mt-5' onBlur={hendleform}></TextInput>
            <Select id="catagory"  className='sm:w-full md:w-3/5 mx-auto mt-5' onBlur={hendleform}>
                <option type="uncategorized">Choose a catagory</option>
                <option value="javascript">javascript</option>
                <option value="React">React</option>
                <option value="Redux">Redux</option>
                <option value="NodeJs">NodeJs</option>
                <option value="Expressjs">Expressjs</option>
            </Select>
            <div className='sm:w-full md:w-3/5 mx-auto'>
            <textarea id="content" onBlur={hendleform} placeholder='write about your post' name="comment" rows="4" className=" w-full mx-auto  border rounded-md  mt-5 bg-gray-700 text-white leading-tight"></textarea>
            </div>
            <Button type='submit' className='sm:w-full md:w-3/5 mx-auto mt-5 bg-gradient-to-r from-blue-500 to-green-500'>Post</Button>
            </form>
            
            
        </div>
    );
}

export default Create_new_post;