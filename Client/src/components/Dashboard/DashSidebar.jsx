import { Sidebar, Label } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import {HiUser} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { deleteSucces } from '../../redux/user/userSlice';
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { TbUsersGroup } from "react-icons/tb";

function DashSidebar(props) {
    const {currentUser} = useSelector(state => state.user)
   const dispatch = useDispatch()
    const location = useLocation();
    //console.log(location)
    const [tab, setTab] = useState('');
    useEffect(() =>{
        const urlPrams = new URLSearchParams(location.search);
        const urltabs = urlPrams.get('tab');
        //console.log(urltabs)
        setTab(urltabs)
    }, [location.search])
    


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
       <Sidebar className='w-full md:w-56' >
        <Sidebar.Items className='h-full' >
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile ' >
                <Sidebar.Item active={tab ==='profile'} label={currentUser.isAdmin ?"Admin" :"User"} icon={HiUser} labelColor="dark" as='div'>
                    profile
                </Sidebar.Item>
                </Link >
               {
                currentUser.isAdmin && (
                    <>
                    <Link to='/dashboard?tab=posts ' >
                    <Sidebar.Item active={tab ==='posts'}  icon={ BsFillFileEarmarkPostFill} labelColor="dark" as='div'>
                      All posts  
                    </Sidebar.Item>
                    </Link >
                    <Link to='/dashboard?tab=users ' >
                    <Sidebar.Item active={tab ==='user'}  icon={TbUsersGroup} labelColor="dark" as='div'>
                      All User  
                    </Sidebar.Item>
                    </Link >
                    </>
                )
               }
                <Sidebar.Item onClick={gotoSignOut} className="cursor-pointer" icon={ LiaSignOutAltSolid }>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
           

        </Sidebar.Items>
       </Sidebar>
    );
}

export default DashSidebar;