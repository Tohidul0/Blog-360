import { Table, TableBody, TableCell, TableRow } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function Allcomment(props) {
    const {currentUser} = useSelector(state => state.user)
    const [allcomment, setAllcomment] = useState(null)

    const apiUrl = process.env.REACT_APP_BACKEND_URL ;


    useEffect(() =>{
        const laodposts = async () =>{
            const accessToken = 'access_token';
              try{
                const res = await fetch(`${apiUrl}/api/comment/getAllComment`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include credentials (cookies) for cross-origin requests
                  });
              const data = await res.json()
              setAllcomment(data.comments); 
              console.log(data)
              } 
              catch (err){
                console.log(err);
              }
            
        }
        laodposts();
    }, [])

    return (
        <div className=' table-auto overflow-x-scroll md:mx-auto p-5'>
           {currentUser.isAdmin && allcomment? (
            <>
                <Table hoverable className='shadow-lg'>
                    <Table.Head>
                        <Table.HeadCell>
                            Updated Date
                        </Table.HeadCell>
                        <Table.HeadCell>
                            User Id
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Post Id
                        </Table.HeadCell>
                        <Table.HeadCell>
                           content
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Delete
                        </Table.HeadCell>
                        <Table.HeadCell>
                           Edit
                        </Table.HeadCell>
                    </Table.Head>
                     { 
                     allcomment.map((comment) => (
                        <TableBody key={comment._id}> 
                            <TableRow>
                                <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell>{comment.userId}</TableCell>
                                <TableCell>{comment.postId}</TableCell>
                                <TableCell>{comment.content}</TableCell>
                                
                                <TableCell><span className='text-red-600 hover:underline cursor-pointer'>Delete</span></TableCell>
                                <TableCell><span className='text-red-600 hover:underline cursor-pointer'>Edit</span></TableCell>
                            </TableRow>
                        </TableBody>
                     ))}
                       
                   
                </Table>
            </>
           ) : (

            <p> there is no User</p>
           )}
        </div>
    );
}

export default Allcomment;