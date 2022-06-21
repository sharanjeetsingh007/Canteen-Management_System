import React, { useEffect, useState } from 'react'
import { Alert, CButton, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';

import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import './ModalProducts.css'





const ModalProducts = React.memo(({ products, modalValue, handleClickEditClose, Price, Name, id, Category, ImageUrl, timestamp, Description }) => {

    // states
    const [nameState, setNameState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    const [categoryState, setCategoryState] = useState("");
    const [imageUrlState, setImageUrlState] = useState("");
    const [priceState, setPriceState] = useState(null);


    // handling edit
    const handleEdit = async (id) => {

        const updateQuery = doc(db, 'Products', id);

        try {
            await updateDoc(updateQuery, {
                Name: nameState,
                Description: descriptionState,
                Category: categoryState,
                ImageUrl: imageUrlState,
                Price: priceState,
                timestamp: serverTimestamp(),


            }).then((response) => {
                alert('Updated succesfully')


            }).then((response) => {
                handleClickEditClose(false)
            })

                .catch((err) => {
                    alert(err, 'err adding')
                })
        }
        catch (err) {
            alert(err, 'Error updating data')
        }

    }



    // setting initial state to database data

    useEffect(() => {
        setNameState(Name);
        setDescriptionState(Description);
        setCategoryState(Category);
        setImageUrlState(ImageUrl);
        setPriceState(Price);
        // setTimestampState(timestamp);
    }, [])




    return (
        <div className='ModalProducts'>
            <CModal
                className='modal__admin__edit'
                style={{ opacity: '0px' }} alignment='center' backdrop={true} size="xl" visible={modalValue} onClose={() => handleClickEditClose(false)}>
                <CModalHeader>
                    <CModalTitle>Edit</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <div className='modal__body__custom'>
                        <h4
                            style={{ marginTop: '12px' }}

                        >Name</h4>
                        <input
                            style={{ marginTop: '12px' }}
                            type='text'
                            value={nameState}
                            onChange={e => setNameState(e.target.value)}
                        />
                        <h4 style={{ marginTop: '10px' }}>
                            Description</h4>
                        <input
                            style={{ marginTop: '12px' }}
                            value={descriptionState}
                            type='text'
                            onChange={e => setDescriptionState(e.target.value)}

                        />
                        <h4 style={{ marginTop: '10px' }}>
                            Category</h4>
                        <input
                            style={{ marginTop: '12px' }}
                            value={categoryState}
                            type='text'
                            onChange={e => setCategoryState(e.target.value)}

                        />
                        <h4 style={{ marginTop: '10px' }}>
                            ImageUrl</h4>
                        <input
                            style={{ marginTop: '12px' }}
                            value={imageUrlState}
                            type='text'
                            onChange={e => setImageUrlState(e.target.value)}

                        />
                        <h4 style={{ marginTop: '10px' }}>
                            Price {" "} $</h4>
                        <input
                            style={{ marginTop: '12px' }}
                            value={priceState}
                            type='number'
                            onChange={e => setPriceState(e.target.value)}

                        />


                    </div>
                    <div className='modal__footer' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CButton color='warning' style={{ fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none', width: '110px', height: '30px' }} onClick={() => handleEdit(id)}>Edit</CButton>
                    </div>
                </CModalBody>
            </CModal>


        </div>
    )
})

export default ModalProducts