import React, { useState } from 'react'
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import ModalProducts from '../ModalProducts/ModalProducts';
import ModalDelete from './ModalDelete';





function ModalAllProducts({ id, Name, Description, Category, Price, ImageUrl, Tranding, timestamp }) {

    // modal state
    const [modalValue, setModalValue] = useState(false);
    const [modalDeleteValue, setModalDeleteValue] = useState(false);




    // sending to parent
    const handleDeleteModal = () => {

        setModalDeleteValue(true);

    }


    // sending to child
    const handleDeleteModalProps = (value) => {
        setModalDeleteValue(value)
    }


    // modal to true
    const handleClickEdit = () => {

        setModalValue(true);

    }


    // sending to child
    const handleClickEditClose = (value) => {
        setModalValue(value);


    }

    // handling trending
    const handleTrending = async (id, Tranding) => {

        // console.log('tranding fun run')
        if (Tranding == true) {
            alert('already in trending')
        } else {

            const updateQuery = doc(db, 'Products', id);

            // console.log(updateQuery, 'updateQuery is run')
            try {
                await updateDoc(updateQuery, {
                    Tranding: true,

                }).then((response) => {
                    alert('Moved to Trending succesfully')


                })

                    .catch((err) => {
                        alert(err, 'err adding to Trending')
                    })
            }
            catch (err) {
                alert(err, 'Error adding to Trending')
            }

        }

    }




    return (
        <CTableRow>

            <CTableDataCell style={{ fontSize: '11px' }} >{Name}</CTableDataCell>
            <CTableDataCell
                style={{
                    width: '150px',
                    maxWidth: '150px',
                    overflowX: 'scroll',
                    overflowY: 'scroll',
                    height: '130px',
                    maxHeight: '130px',
                    textAlign: 'left',
                    fontSize: '11px'
                }}>


                {Description}
            </CTableDataCell>

            <CTableDataCell style={{ fontSize: '11px' }}>{Category}</CTableDataCell>
            <CTableDataCell style={{ fontSize: '11px' }}>${" "}{Price}</CTableDataCell>
            <CTableDataCell style={{ width: "140px" }} ><img style={{ width: '100px', objectFit: 'cover', float: 'left', height: '100px' }} src={ImageUrl} /></CTableDataCell>
            <CTableDataCell style={{ width: "100px" }}>

                <div className='card__button__allproducts'>
                    <CButton
                        style={{ width: '80px', margin: '0', fontSize: '11px' }} href="#"
                        onClick={() => handleClickEdit()}
                    >Edit</CButton>
                    <CButton
                        style={{
                            backgroundColor: 'rgba(224, 42, 18, 0.726)',
                            border: 'none',
                            width: '80px',
                            marginBottom: '5px',
                            marginTop: '5px',
                            fontSize: '11px'

                        }}
                        href="#" onClick={handleDeleteModal}>Delete</CButton>
                    <CButton color='light'
                        style={{ width: '80px', margin: '0', fontSize: '11px' }} href="#" onClick={() => handleTrending(id, Tranding)}>Trending</CButton>

                </div>

            </CTableDataCell>
            <CTableDataCell style={{ width: "140px" }} >

                <span className='not__know'
                    style={{ display: 'none' }}

                >
                    <ModalProducts
                        modalValue={modalValue}
                        handleClickEditClose={handleClickEditClose}
                        Name={Name}
                        Description={Description}
                        id={id}
                        ImageUrl={ImageUrl}
                        timestamp={timestamp}
                        Category={Category}
                        Price={Price}
                    />
                    <ModalDelete

                        id={id} handleDeleteModalProps={handleDeleteModalProps} modalDeleteValue={modalDeleteValue} />

                </span>
            </CTableDataCell>

        </CTableRow>


    )
}

export default ModalAllProducts