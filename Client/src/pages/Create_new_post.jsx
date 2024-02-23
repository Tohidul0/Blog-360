import { Button, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';





function Create_new_post(props) {
   
    
    const [catagory, setCatagory] = useState('');
    const [title, setTitle] = useState('');
    const [image , setImage] = useState(null);
    const [content,setContent] =useState('');
   // console.log(title, catagory,image,content  );
    const navigate = useNavigate(null);
    
    const hendleSubmit = async (e) =>{
        console.log("kgfkuygjug")
        e.preventDefault();
        const reader = new FileReader();
        console.log(reader)
        reader.onload = async () =>{
        const imageData = reader.result.split(',')[1];
        console.log(imageData)
        
        const formdata = {
            title: title,
            catagory : catagory,
            content : content,
            image : imageData
        }
        console.log(formdata)

        try{
               
                const res = await fetch('http://localhost:3000/api/post/create',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                
                body : JSON.stringify(formdata )
                })


                const data = await res.json();
                if(!res.ok){
            //   
                    console.log( err);
                    console.log("aaaaaaaaaaaaaaah");
                }
                else{
                console.log(data)
                setCatagory('')
                setContent('');
                setTitle('');
                setImage(null)
                navigate(`/post/${data.slug}`)
                }


            }
        catch(err){
                console.log( err);
            }
        };
        if(image){
            reader.readAsDataURL(image);
        }
    }
    
    
    return (
        <div className='min-h-screen pt-10'>
            <h1 className='text-3xl mx-auto text-center'>Create A post</h1>
            <form onSubmit={hendleSubmit}>
            <div className='border border-dotted sm:w-full md:w-3/5 mx-auto mt-5 h-48 flex justify-center  items-center'>
            <input type='file' id="image" name='image'  accept='image/*' onChange={(e) => setImage(e.target.files[0])} ></input>
            <Button type='button' className=' h-12 p-4 rounded' >
                Upload Image
            </Button>  
            </div>
            {/* {formData.image &&(
                <div className='sm:w-full  md:w-3/5 mx-auto mt-5 h-80 overflow-auto'>
                    <img className='h-80  mx-auto' src={form.image.name}></img>
                </div>
            )} */}
            <TextInput type='text'id="title"  placeholder='Title' className='sm:w-full md:w-3/5 mx-auto mt-5' onBlur={(e) => setTitle(e.target.value)}></TextInput>
            <Select id="catagory"  className='sm:w-full md:w-3/5 mx-auto mt-5' onBlur={(e) => setCatagory(e.target.value)}>
                <option type="uncategorized">Choose a catagory</option>
                <option value="javascript">javascript</option>
                <option value="React">React</option>
                <option value="Redux">Redux</option>
                <option value="NodeJs">NodeJs</option>
                <option value="Expressjs">Expressjs</option>
            </Select>
            <div className='sm:w-full md:w-3/5 mx-auto'>
            <textarea id="content" onBlur={(e) => setContent(e.target.value)} placeholder='write about your post' name="comment" rows="4" className=" w-full mx-auto  border rounded-md  mt-5 bg-gray-700 text-white leading-tight"></textarea>
            </div>
            <Button type='submit' className='sm:w-full md:w-3/5 mx-auto mt-5 bg-gradient-to-r from-blue-500 to-green-500'>Post</Button>
            </form>
            
            
        </div>
    );
}

export default Create_new_post;