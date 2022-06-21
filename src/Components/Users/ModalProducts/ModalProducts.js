import React, { useEffect, useState } from 'react'
import { Alert, CButton, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';
import './ModalProducts.css'
import { db } from '../../../Firebase';
import { async } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsToCart, addToCart, minusToCart, total } from '../../../Redux/cart';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";



const ModalProducts = React.memo(({ products, modalValue, handleClickEditClose, Price, Name, id, Category, ImageUrl, timestamp, Description }) => {


    // redux state for user
    const user = useSelector(state => state.user.value)



    //  state for the quantity
    const [quantity, setQuantity] = useState(1);





    const dispatch = useDispatch();




    //  giving value to the parent for closing modal

    const CloseModal = () => {
        handleClickEditClose(false)
        setQuantity(1);
    }




    //  function to set order to cart in redux 
    const handleOrder = async (id) => {

        if (quantity == 0) {
            alert('Need to have quantity')
        } else {

            dispatch(addProductsToCart([{
                UserId: user.uid,
                UserName: user.displayName,
                // timestamp: serverTime,
                Orders: [{
                    ProductId: id,
                    ProductName: Name,
                    Price: Price,
                    Quantity: quantity,
                    Total: quantity * Price,
                    ImageUrl: ImageUrl

                }]

            }]));

            handleClickEditClose(false);
        }

    }


    return (
        <div className='ModalProducts'>
            <CModal
                className='custom___modalproducts'
                alignment='center'
                id={id} style={{ opacity: '0px' }} backdrop={true} size="xl" visible={modalValue} onClose={CloseModal}>
                <CModalHeader>
                    <CModalTitle>Add to Cart</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <div className='modal__inner'>
                        <div className='modal__inner__center'>
                            <div className='modal__left'>
                                <img src={ImageUrl} />
                                <div className='name__price'>
                                    <h4 style={{ fontSize: '15px', marginTop: '5px' }}>{Name}</h4>
                                    <h4 style={{ fontSize: '14px' }}>${" "}{Price}</h4>
                                </div>
                                <h5 className='modal__left__descr' >{Description}</h5>

                            </div>

                            <div className='modal__right'>
                                <div className='modal__right__row1'>
                                    <h4 style={{ fontSize: '15px' }}>Price</h4>
                                    <h4 style={{ fontSize: '15px' }}>Quantity</h4>
                                    <h4 style={{ fontSize: '15px' }}>Total</h4>

                                </div>

                                <div className='modal__right__row1'>
                                    <h4 style={{ fontSize: '14px', margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>$ {' '}{Price}</h4>
                                    <div className='quantity__button'>
                                        <CButton
                                            color="dark"
                                            style={{ margin: '0', boxShadow: 'none', height: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}

                                            onClick={() => setQuantity(quantity + 1)}>+</CButton>
                                        <div className='quantity__change'>{quantity}</div>
                                        <CButton
                                            color="dark"
                                            onClick={() => { quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1) }}
                                            style={{ margin: '0', boxShadow: 'none', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >-</CButton>

                                    </div>
                                    <div className='price__total'>
                                        <h4 style={{ fontSize: '14px', margin: '0 0 0 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>${" "}{Price * quantity}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className='modal__button'
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', borderTop: '1px solid black' }}
                    >
                        <CButton
                            color="warning"
                            style={{ display: 'block', marginTop: '10px', marginBottom: '0', width: '160px', height: '35px', boxShadow: 'none', fontSize: '14px' }}
                            onClick={() => handleOrder(id)}
                        >Add to Cart</CButton>
                    </div>
                </CModalBody>
            </CModal>


        </div>
    )
})

export default ModalProducts