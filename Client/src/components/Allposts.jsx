import { Table, TableBody, TableCell, TableRow } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
    }, [])

    return (
        <div>
           {currentUser.isAdmin && userposts.length >0? (
            <>
                <Table hoverable className='shadow-md'>
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
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.catagory}</TableCell>
                                <TableCell>{post.image}</TableCell>
                                <TableCell>{post.content}</TableCell>
                            </TableRow>
                        </TableBody>
                     ))}
                       
                   
                </Table>
            </>
           ) : (

            <p> there is no post</p>
           )}
        </div>
    );
}

export default Allposts;