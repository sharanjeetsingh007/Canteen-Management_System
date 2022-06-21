import React, { useEffect, useState } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../CartCard/CartCard';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { emptyCart } from '../../../Redux/cart';
import ModalPayment from '../ModalPayment/ModalPayment';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';





function Cart() {

    // modal state
    const [modalValue, setModalValue] = useState(false);



    //  redux state
    const cart = useSelector(state => state.reducer.cart.cartItems)


    // const cart = useSelector(state => state.cart.cartItems)
    // const cartQuantity = useSelector(state => state.cart.quantity)


    // showing sum of the order
    let Total = null;
    if (cart.length !== 0) {

        const sum = cart[0][0].Orders.map((item) => item.Total)
        Total = sum.reduce((a, b) => a + b, 0)

    }


    const handleCloseModal = (value) => {
        setModalValue(value)
    }



    //  modal set true
    const handleCheckout = async () => {

        setModalValue(true);

    }


    // getting orders of specific user data
    let OrderState = null
    if (cart.length !== 0) {
        // console.log(cart[0][0].Orders.length, 'cart lengthhhhhhh')
        // console.log(cart[0][0].Orders, 'cartstatreeeeeeeeee')
        OrderState = cart[0][0].Orders;
        // console.log(cart[0].Orders, 'cartstatreeeeeeeeee')
    }



    return (
        <div className='Cart'>

            <div className='heading__components'>
                <h4>Cart</h4>
            </div>
            <div className='cart__main'
                style={{
                    display: cart.length !== 0 ? OrderState.length !== 0 && 'flex' : 'flex',
                    justifyContent: cart.length !== 0 ? OrderState.length !== 0 !== 0 && 'center' : 'center',

                }}
            >



                <div className='cart__main__inner'

                >
                    <div className='cart__main__inner__cart'>
                        {cart.length !== 0 && cart.map((item) => item.map((item2) => item2.Orders.map((item3) => {


                            // console.log(item3)

                            return <CartCard
                                Price={item3.Price}
                                id={item3.ProductId}
                                ProductName={item3.ProductName}
                                Quantity={item3.Quantity}
                                Total={item3.Total}
                                ImageUrl={item3.ImageUrl}
                            />


                        })))}

                    </div>


                    {cart.length !== 0 ? OrderState.length !== 0 ? <div className='cart__total'>

                        <div className='cart__total__col'>

                            <h3>Total</h3>
                            <h3>${Total}</h3>
                        </div>


                        <CButton color="warning" className='cart__total__button'
                            onClick={() => handleCheckout()}
                            style={{
                                margin: '0', boxShadow: 'none',

                                width: '135px', height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}

                        >Check Out</CButton>

                    </div> : <><h2 className='cart__data__empty'>Cart is Empty</h2> </> : <div className="empty__cart">
                        <h2 className='cart__data__empty'>Cart is Empty</h2>
                    </div>}

                </div>
            </div>

            <ModalPayment modalValue={modalValue} handleCloseModal={handleCloseModal} TotalCart={Total} />

        </div>
    )
}

export default Cart