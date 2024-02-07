import React, { useEffect, useState } from 'react';
import {Route, useLocation} from 'react-router-dom'
import DashSidebar from '../components/Dashboard/DashSidebar';
import DashProfile from '../components/Dashboard/DashProfile';
import PrivateRoute from './../components/PrivateRoute';


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
        <div className='min-h-screen flex flex-col md:flex-row  ' >
           {/* left sidebar */}
           <div className='h-full '>
           <DashSidebar></DashSidebar>
           </div>


           {/* right side profile */}
          
           <div className=' w-full pl-2'>
           {tab ==='profile' && <DashProfile></DashProfile>}
           </div>
           
           
        </div>
    );
}

export default Dashborad;