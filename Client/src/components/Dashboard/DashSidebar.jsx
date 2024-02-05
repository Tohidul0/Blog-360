import { Sidebar, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';

function DashSidebar(props) {
    const location = useLocation();
    //console.log(location)
    const [tab, setTab] = useState('');
    useEffect(() =>{
        const urlPrams = new URLSearchParams(location.search);
        const urltabs = urlPrams.get('tab');
        //console.log(urltabs)
        setTab(urltabs)
    }, [location.search])
    return (
       <Sidebar className='w-full md:w-56' >
        <Sidebar.Items className='h-full' >
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile 'component="div" >
                <Sidebar.Item active={tab ==='profile'} label={"User"} icon={HiUser} labelColor="dark">
                    profile
                </Sidebar.Item>
                </Link >
                <Sidebar.Item className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
           

        </Sidebar.Items>
       </Sidebar>
    );
}

export default DashSidebar;