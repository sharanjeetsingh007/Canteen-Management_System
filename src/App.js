import './App.css';
import Layout from './Layout';
import Login from './Pages/Login';
import Register from './Pages/Register/Register';
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import "./Pages/Register/Register.css";
import { useDispatch } from 'react-redux'
import { login, logout } from './Redux/slice'
import UserHome from './Components/Users/UserHome/UserHome'
import ContactUs from './Components/Users/ContactUs/ContactUs'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutesUser';
import AboutUs from './Components/Users/AboutUs/AboutUs';
import { changeBooleanTrue } from './Redux/userBoolen';
import MyOrders from './Components/Users/MyOrders/MyOrders';
import MyWallet from './Components/Users/MyWallet/MyWallet';
import AllProducts from './Components/Admin/AllProducts/AllProducts';
import AddProducts from './Components/Admin/AddProducts/AddProducts';
import TodayMenu from './Components/Admin/TodayMenu/TodayMenu';
import Wallets from './Components/Admin/Wallets/Wallets';
import Orders from './Components/Admin/Orders/Orders';
import Users from './Components/Admin/Users/Users';
import ProtectedRoutesAdmin from './Components/ProtectedRoutes/ProtectedRoutesAdmin';
import ProtectedRoutesUser from './Components/ProtectedRoutes/ProtectedRoutesUser';
import Content from './Pages/Content/Content';
import Cart from './Components/Users/Cart/Cart';


function App() {



  const dispatch = useDispatch();
  const auth = getAuth();


  // firbase on refresh get the logged in user back
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const roleLocal = localStorage.getItem('role');
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photo: null,
          role: roleLocal,
        }))
        dispatch(changeBooleanTrue());
      } else {
        dispatch(logout());
        // dispatch(changeBooleanFalse);
      }
    });
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Content />} />


          {/* ********* Protecting roles for User ********* */}
          <Route element={<ProtectedRoutesUser />}>
            <Route exact path='/home/user' element={<Layout />}>
              <Route path='/home/user/home' element={<UserHome />} />
              <Route path='/home/user/user-orders' element={<MyOrders />} />
              <Route path='/home/user/user-wallets' element={<MyWallet />} />
              <Route path='/home/user/aboutus' element={<AboutUs />} />
              <Route path='/home/user/user-contact-us' element={<ContactUs />} />
              <Route path='/home/user/cart' element={<Cart />} />
            </Route>
          </Route>

          {/* ********* Protecting roles for Admin ********* */}
          <Route element={<ProtectedRoutesAdmin />}>
            <Route path='/home/admin' element={<Layout />}>
              <Route path='/home/admin/home' element={<TodayMenu />} />
              <Route path='/home/admin/add-products' element={<AddProducts />} />
              <Route path='/home/admin/all-products' element={<AllProducts />} />
              <Route path='/home/admin/wallets' element={<Wallets />} />
              <Route path='/home/admin/orders' element={<Orders />} />
              <Route path='/home/admin/users' element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
