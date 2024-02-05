import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/Dashboard/DashSidebar';
import DashProfile from '../components/Dashboard/DashProfile';

function Dashborad(props) {
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
        <div className='min-h-screen flex flex-col md:flex-row w-full  bg-red-600' >
           {/* left sidebar */}
           <div className='h-full'>
           <DashSidebar></DashSidebar>
           </div>


           {/* right side profile */}
           <div className='md:w-56 pl-2'>
           {tab ==='profile' && <DashProfile></DashProfile>}
           </div>
        </div>
    );
}

export default Dashborad;