import React, { useEffect, useState } from 'react'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slice';
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { changeBooleanFalse } from '../../Redux/userBoolen';
import { addToCart, emptyCart } from '../../Redux/cart';
import { FiShoppingCart } from 'react-icons/fi';
import { CCarousel, CCarouselItem, CCarouselCaption, CImage, CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { FaBars } from 'react-icons/fa';
import Logo from '../../../src/Assets/images/cms.png'
import { toggle } from '../../Redux/sidebar';



function Header() {
    // redux dispatch
    const dispatch = useDispatch();
    // firebase ayth method
    const auth = getAuth();

    const navigate = useNavigate();

    // getting role from local storage
    const getRole = localStorage.getItem('role')

    // redux state for cart items and cart quantity
    const cart = useSelector(state => state.reducer.cart.cartItems)
    const cartQuantity = useSelector(state => state.reducer.cart.quantity)





    let sum = 0

    // conditons to add quantity in cart icon
    if (cart.length !== 0) {
        cart[0][0].Orders.forEach((item) => {
            sum += item.Quantity
        })

    }

    useEffect(() => {

        dispatch(addToCart(sum));

    }, [sum])

    // logout function
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(changeBooleanFalse());
        dispatch(emptyCart());
        localStorage.removeItem('role')
        await auth.signOut();

        navigate('/')
    }


    // cart funtion redirect to cart
    const handleCart = () => {

        navigate('/home/user/cart')


    }




    return (
        <div className='header'>

            <div className='header__sidebar'>

                <div className='icon_sidebar_custom'>
                    <FaBars
                        onClick={() => dispatch(toggle())}
                        style={{ fontSize: '20px', color: '#1a2231', cursor: 'pointer' }}
                    />
                </div>
                <div className='header__logo'>
                    <img src={Logo} alt='logo'
                    // style={{ border: '1px solid red', objectFit: 'contain' }}
                    />

                </div>
            </div>



            <div className='buttons__header'>

                {getRole == 'user' ? <div className='cart__icon__div' onClick={handleCart}>
                    <FiShoppingCart className='cart__icon' />
                    <span>   {cartQuantity}</span>
                </div> : <></>}



                <CButton
                    color="dark"
                    style={{
                        margin: '0',
                        backgroundColor: '#DB4C44'
                    }}
                    id='logout-btn' onClick={handleLogout}>Logout</CButton>
            </div>
        </div>
    )
}

export default Header