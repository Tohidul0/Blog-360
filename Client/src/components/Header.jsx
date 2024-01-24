import { Button, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import {  Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

function Header(props) {
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
                <Button className='lg:hidden sm:inline'>
                    <FaMoon/>
                </Button>
                <Link to="/Login">
                    <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded">Log In</button>
                </Link>
               
                <Navbar.Toggle/>
            </div>
            
        </Navbar>
    );
}

export default Header;