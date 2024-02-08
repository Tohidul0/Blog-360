import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminPrivateRoute(props) {
    const {currentUser} = useSelector(state => state.user)
    return  currentUser.isAdmin ? <Outlet/> : <Navigate to="/LogIn"></Navigate>
}

export default AdminPrivateRoute;