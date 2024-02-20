import { Avatar, Button, Dropdown, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/theme';
import { deleteSucces } from '../redux/user/userSlice';

function Header(props) {
    const dispatch = useDispatch(state =>state.theme);
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state => state.theme);


    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    //console.log(location)
    console.log(searchTerm)


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        //console.log(urlParams);
        const searchurlParams = urlParams.get('searchTerm')
        //console.log(searchurlParams);
        if(searchurlParams){
            setSearchTerm(searchurlParams);
            
        }
    }, [location.search])

    const hendleSubmit = async(e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search)
         urlParams.set('searchTerm', searchTerm)
         const searchBox = urlParams.toString();
         navigate(`/search?${searchBox}`);

    }



    const gotoSignOut =  async () =>{
       
        const yesDelete = window.confirm("are you sure SignOut?");
        if(yesDelete){
            const res = await fetch("http://localhost:3000/api/user/signOut", { 
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            });

            const data = await res.json();
             if(!res.ok){
                dispatch(updateFailure(data.maessage))
             }
            else{
                dispatch(deleteSucces());
          }

            
          }
        }
    return (
        <Navbar className='border-b-2  px-6'>
            <Link to='/' className='white-space: nowrap text-sm sm:text-xl font-semibold'>
                <span className='text-red-600 cursor-pointer'>Blog</span>
                360
            </Link>
            <form onSubmit={hendleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                     value={searchTerm}
                     onChange={(e)=>setSearchTerm(e.target.value)}
                />
            </form>
            <Button className='lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            <Navbar.Collapse>
                    <Navbar.Link  as={'div'}>
                        <Link to="/">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link as={'div'}>
                        <Link to="/projects">Projects</Link>
                    </Navbar.Link>
                    <Navbar.Link as={'div'}>
                        <Link to="/about">About</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
                
            <div className='flex gap-2'>
                <Button className='  sm:inline'  color='gray' pill  onClick={() => dispatch(toggleTheme())}>
                    { theme === 'light' ? <FaMoon/> : <FaSun/>}
                </Button>
                {
                   
                   currentUser ? (
                    <Dropdown inline
                    arrowIcon={false}
                    label={
                        <Avatar alt='User' img={currentUser.profilePicture} rounded />
                    }
                    >
                    <DropdownHeader>
                        <span className='block text-sm font-bold'>{currentUser.username}</span>
                        <span className='block text-medium font-semibold'>{currentUser.email}</span>
                    </DropdownHeader>
                    <DropdownItem>
                        <Link to="/dashboard?tab=dash">Profile</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link onClick={gotoSignOut} className='font-semibold' >Sign Out</Link>
                    </DropdownItem>
                    </Dropdown>
                    
                   ) : (
                    <> 
                    <Link to="/Login">
                        <button  className="bg-gradient-to-r hover:opacity-80 from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded">Log In</button>
                    </Link>
                    <Link to="/register">
                        <button  className="bg-gradient-to-r hover:opacity-80 from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                    </Link>
                    </>
                    )
                    
                }
               
                <Navbar.Toggle/>
            </div>
            
        </Navbar>
    );
}

export default Header;