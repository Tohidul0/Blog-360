import { Avatar, Button, Dropdown, DropdownHeader, DropdownItem, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import {  Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon, FaSun} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/theme';

function Header(props) {
    const dispatch = useDispatch(state =>state.theme);
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state => state.theme);
    return (
        <Navbar className='border-b-2  px-6'>
            <Link to='/' className='white-space: nowrap text-sm sm:text-xl font-semibold'>
                <span className='text-red-600 cursor-pointer'>Blog</span>
                360
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
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
                        <Link to="/dashboard">Profile</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link className='font-semibold' to="/dashboard">Sign Out</Link>
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