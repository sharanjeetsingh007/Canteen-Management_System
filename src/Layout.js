import React, { useState } from 'react'
import Header from './Components/Header/Header'
import './Layout.css'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar/Sidebar'
import { Outlet, Route, Router, Routes } from 'react-router-dom'
import LoadingSpinnerMain from './LoadingSpinner/LoadingSpinnerMain'


function Layout() {


    const user = useSelector((state) => state.user.value);





    return (

        <div className='layout'>
            <Header />
            <div className='layout__body'>
                <Sidebar />
                {user == null ? <LoadingSpinnerMain /> : user.role == 'user' ? <>
                    <Outlet />
                </> : <>
                    <Outlet />
                </>}
            </div>
        </div>


    )
}

export default Layout