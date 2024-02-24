import { Label, Sidebar, Spinner, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useLocation } from 'react-router-dom';

function Search(props) {
    const [serchFormData , setSearchFormData] = useState({
        searchTerm : '',
        category : 'uncategorized',
        sort : 'desc'
    });
    const location = useLocation('')
    const [posts , setPosts] = useState([])
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(true);
        const urlParams = new URLSearchParams(location.search)
        //console.log(urlParams);
        const searchurlParams = urlParams.get('searchTerm');
        const sortParams = urlParams.get('sort');
        const categorylParams = urlParams.get('category');

        const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000' ;

        //console.log(searchurlParams);
        if(searchurlParams || sortParams|| categorylParams ){
            setSearchFormData( {...searchurlParams,
                searchTerm : searchurlParams,
                category:categorylParams,
                sort: sortParams  });
            
        }
        const loadPost = async() =>{
            const searchBox = urlParams.toString();
            const res= await fetch(`${apiUrl}/api/post/allposts?${searchBox}`)
            const data = await res.json()
            console.log(data)
            if(res.ok){
                setPosts(data.posts);
                setLoading(false);
            }
        }

        loadPost()
    }, [location.search])



    console.log(serchFormData)
    console.log(location.search)


    return (
        <div className='min-h-screen md:flex sm:flex-row '>
            <div className='h-full mt-20 ms-10'>
                <form>
                    <Label>Search Term:</Label>
                    <TextInput
                    id='searchTerm'
                    placeholder='Search... 
                    '></TextInput>
                    
                </form>
            </div>
            <div className='grow m-10'>
                <h1 className='text-center text-3xl font-serif font-bold '>Search Result</h1>
                {
                    loading ? (
                        <div className='flex items-center justify-center mt-20 '>
                            <Spinner className='mx-auto  size-10'></Spinner>
                        </div>
                    ) : (
                        <div className=' sm:w-full md:w-4/5 mx-auto flex flex-wrap gap-5'>
                            {posts.length>0 ? (posts.map(onepost => <PostCard onepost={onepost} key={onepost._id}></PostCard>)):(
                            <div className='mx-auto mt-40'>
                                <h1 className='text-center text-red-600 text-2xl'>Result Not Found</h1>
                            </div>)}
                </div>
                    )
                }
                
            </div>
        </div>
    );
}

export default Search;