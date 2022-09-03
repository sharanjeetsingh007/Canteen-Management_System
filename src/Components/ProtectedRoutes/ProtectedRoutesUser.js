import React from 'react'
import { useSelector } from 'react-redux';
import Layout from '../../Layout';
import Login from '../../Pages/Login';
import Register from '../../Pages/Register/Register';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


function ProtectedRoutesUser({ loginUser, booleanState }) {

    // Getting role value from storage to protect and route to user
    const getRole = localStorage.getItem('role')

    const location = useLocation();

    return getRole == 'user' ? <Outlet /> : <Navigate to='/' replace={true} state={{ path: location.pathname }} />


}

export default ProtectedRoutesUser