import React from 'react'
import { Alert, CButton, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';
import Creditcard from '../Creditcard/Creditcard'
import './ModalPayment.css'

function ModalPayment({ modalValue, handleCloseModal, TotalCart }) {

    //  sending to parent
    const handleClose = () => {
        handleCloseModal(false);
    }

    return (
        <div className='ModalPayment'>


            <CModal className='payment__modal__custom'
                style={{ opacity: '0px' }} alignment='center' backdrop={true} size="xl" visible={modalValue} onClose={handleClose}>
                <CModalHeader>
                    <CModalTitle>Payment</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className='modalpayment__body'>
                        <div className='modalpayment__body__total'>
                            <h3>Total:</h3>
                            {" "}
                            <h3>${TotalCart}</h3>
                        </div>

                        <Creditcard handleCloseModal={handleCloseModal} TotalCart={TotalCart} />


                    </div>

                </CModalBody>
            </CModal>







        </div>
    )
}

export default ModalPayment