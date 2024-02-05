import { Sidebar, Label } from 'flowbite-react';
import React from 'react';
import {HiUser} from 'react-icons/hi'

function DashSidebar(props) {
    return (
       <Sidebar className='w-full md:w-56' >
        <Sidebar.Items >
            <Sidebar.ItemGroup>
                <Sidebar.Item active label={"User"} icon={HiUser} labelColor="dark">
                    profile
                </Sidebar.Item>
                <Sidebar.Item className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>

        </Sidebar.Items>
       </Sidebar>
    );
}

export default DashSidebar;