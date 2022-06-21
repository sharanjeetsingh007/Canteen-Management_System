import React, { useEffect, useState } from 'react'
import './CartCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductsToCart, updateProductsToCart } from '../../../Redux/cart';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';




function CartCard({ ProductName, Price, id, Quantity, Total, ImageUrl }) {

    // staet
    const [quantityState, setQuantityState] = useState(0);

    // user state
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch();


    // setting quantity  + 1
    const handleQuantity = () => {
        setQuantityState(quantityState + 1)

    }


    // setting quantity  -1 but not less than 1
    const handleQuantityMinus = () => {
        if (quantityState <= 1) {
            setQuantityState(1)
        } else {
            setQuantityState(quantityState - 1)

        }

    }


    // updating the cart for the quantity change
    const updateCart = () => {
        dispatch(updateProductsToCart([{
            UserId: user.uid,
            UserName: user.displayName,
            Orders: [{
                ProductId: id,
                ProductName: ProductName,
                Price: Price,
                Quantity: quantityState,
                Total: quantityState * Price,
                ImageUrl: ImageUrl
            }]
        }]));
    }


    //  handle delet item from cart
    const handleDelete = () => {
        dispatch(deleteProductsToCart([{
            UserId: user.uid,
            UserName: user.displayName,
            Orders: [{
                ProductId: id,
                ProductName: ProductName,
                Price: Price,
                Quantity: quantityState,
                Total: quantityState * Price,
                ImageUrl: ImageUrl
            }]

        }]))


    }

    // update cart whenever statechange
    useEffect(() => {
        updateCart();

    }, [quantityState])


    // setting redux quantity to initial state
    useEffect(() => {
        setQuantityState(Quantity)
    }, [])


    return (
        <div className='CartCard'>
            <img
                className='image__cartcard'
                // style={{ objectFit: 'cover', float: 'left', width: '240px', height: '200px' }}
                src={ImageUrl} alt="image products" />

            <div className='details__card'>
                <h2>Name{" "}: {ProductName}</h2>
                <h2>Price{" "}: {Price}</h2>

                <div className='quantity__cartcard'>
                    <h2>Quantity{" "}:</h2>
                    <div className='quantity__cartcard__inner'>
                        <CButton color="dark"
                            style={{
                                margin: '0', boxShadow: 'none', height: '23px', display: 'flex'
                                , alignItems: 'center', justifyContent: 'center'
                            }}
                            onClick={() => handleQuantity()}>+</CButton>


                        <div className='quantity__change'>
                            <h2>{quantityState}</h2>
                        </div>


                        <CButton color="dark"
                            style={{
                                margin: '0', boxShadow: 'none', height: '23px', display: 'flex'
                                , alignItems: 'center', justifyContent: 'center'
                            }}
                            onClick={() => handleQuantityMinus()}>-</CButton>
                    </div>
                </div>

                <h2>Total{" "}:{Total}</h2>

                <CButton color="danger"

                    style={{
                        fontSize: '13px', margin: '0',
                        marginTop: '55px', boxShadow: 'none', height: '25px',
                        width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}

                    onClick={() => handleDelete()}>Delete Item</CButton>

            </div>

        </div>
    )
}

export default CartCard