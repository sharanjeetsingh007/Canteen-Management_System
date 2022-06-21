import React, { useEffect, useState } from 'react'
import './ModalWallets.css'
import { Alert, CButton, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';





function ModalWallets({ modalValue, handleClickEditClose, Email, Role, Balance, Name, id }) {




    const [balanceState, setBalanceState] = useState(0);


    const handleUpdate = async (id) => {

        const updateQuery = doc(db, 'Wallets', id);

        try {
            await updateDoc(updateQuery, {
                balance: balanceState,
            }).then((response) => {
                alert('Updated balance succesfully')
            }).then((response) => {
                handleClickEditClose(false)
            })
                .catch((err) => {
                    alert(err, 'err in balance')
                })
        }
        catch (err) {
            alert(err, 'Error updating balance')
        }
    }



    useEffect(() => {
        setBalanceState(Balance)

    }, [])


    return (
        <div className='ModalWallets'>
            <CModal
                className='ModalWallets__custom'
                style={{ opacity: '0px' }} alignment='center' backdrop={true} size="xl" visible={modalValue} onClose={() => handleClickEditClose(false)}>
                <CModalHeader>
                    <CModalTitle
                        style={{ fontSize: '17px' }}
                    >Add/Remove Balance</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className='body__modalwallet'>
                        <div className='body__col__left'>
                            <h2>Name</h2>
                            <h2>Email</h2>
                            <h2>{" "}Balance</h2>
                        </div>
                        <div className='body__col__left'>
                            <h2>{Name}</h2>
                            <h2>{Email}</h2>
                            ${" "}<input
                                id={id}
                                type='number'
                                value={balanceState}
                                onChange={e => setBalanceState(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='modal__button__wallet' style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                        <CButton style={{
                            fontSize: '12px', marginTop: '10px', marginBottom: '0px', width: '110px', height: '30px', boxShadow: 'none'
                            , display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                            onClick={() => handleUpdate(id)}
                        >Update</CButton>
                    </div>
                </CModalBody>
            </CModal>
        </div>
    )
}

export default ModalWallets