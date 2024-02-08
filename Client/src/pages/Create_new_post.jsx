import { Button, Select, TextInput } from 'flowbite-react';
import React from 'react';

function Create_new_post(props) {
    return (
        <div className='min-h-screen pt-10'>
            <h1 className='text-3xl mx-auto text-center'>Create A post</h1>
            <form>
            <div className='border border-dotted sm:w-full md:w-3/5 mx-auto mt-5 h-48 flex justify-center  items-center'>
            <input type='file' accept='image/*' ></input>
            <div className='bg-green-400 h-12 flex items-center p-4 rounded'>
                <h2>Upload Image</h2>
            </div>
            </div>
            <TextInput type='text' placeholder='Title' className='sm:w-full md:w-3/5 mx-auto mt-5'></TextInput>
            <Select  className='sm:w-full md:w-3/5 mx-auto mt-5'>
                <option type="uncategorized">Choose a catagory</option>
                <option value="javascript">javascript</option>
                <option value="React">React</option>
                <option value="Redux">Redux</option>
                <option value="NodeJs">NodeJs</option>
                <option value="Expressjs">Expressjs</option>
            </Select>
            <div className='sm:w-full md:w-3/5 mx-auto'>
            <textarea id="comment" placeholder='write about your post' name="comment" rows="4" className=" w-full mx-auto  border rounded-md  mt-5 bg-gray-700 text-white leading-tight"></textarea>
            </div>
            <Button type='submit' className='sm:w-full md:w-3/5 mx-auto mt-5 bg-gradient-to-r from-blue-500 to-green-500'>Post</Button>
            </form>
            
            
        </div>
    );
}

export default Create_new_post;