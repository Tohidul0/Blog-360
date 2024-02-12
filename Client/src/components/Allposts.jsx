import { Table, TableBody, TableCell, TableRow } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Allposts(props) {
    const {currentUser} = useSelector(state => state.user)
    const [userposts, setUserposts] = useState({})
    useEffect(() =>{
        const laodposts = async () =>{
              try{
                const res = await fetch('http://localhost:3000/api/post/allposts')
              const data = await res.json()
              setUserposts(data.posts); 
              console.log(userposts)
              console.log(data.posts)
              } 
              catch (err){
                console.log(err);
              }
            
        }
        laodposts();
    }, [currentUser._id])

    return (
        <div className=' table-auto overflow-x-scroll md:mx-auto p-5 '>
           {currentUser.isAdmin && userposts.length >0? (
           
                <Table hoverable className='shadow-md overflow-scroll'>
                    <Table.Head>
                        <Table.HeadCell>
                            Updated Date
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Post Title
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Post Category
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Post image
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Post content
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Delete
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Edit
                        </Table.HeadCell>
                    </Table.Head>
                     { 
                     userposts.map((post) => (
                        <TableBody key={post._id}> 
                            <TableRow>
                                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell className='w-12 h-10'>{post.title}</TableCell>
                                <TableCell className='w-12 h-10'>{post.catagory}</TableCell>
                                <TableCell>
                                    <Link to={`/post/${post.slug}`}>
                                        <img className='w-20 h-10' src={post.image}></img>
                                    </Link>
                                </TableCell>
                                <TableCell>{post.content}</TableCell>
                                <TableCell><span className='text-red-600 hover:underline cursor-pointer'>Delete</span></TableCell>
                                <TableCell><span className='text-red-600 hover:underline cursor-pointer'>Edit</span></TableCell>
                            </TableRow>
                        </TableBody>
                     ))}
                       
                   
                </Table>
           
           ) : (

            <p> there is no post</p>
           )}
        </div>
    );
}

export default Allposts;