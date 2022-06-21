import React from 'react'
import { useSelector } from 'react-redux';
import Layout from '../../Layout';
import Login from '../../Pages/Login';
import Register from '../../Pages/Register/Register';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


function ProtectedRoutesAdmin({ loginUser, booleanState }) {


    //  same as user but for admin

    const getRole = localStorage.getItem('role')

    const location = useLocation();

    return getRole == 'admin' ? <Outlet /> : <Navigate to='/' replace={true} state={{ path: location.pathname }} />


}

export default ProtectedRoutesAdmin