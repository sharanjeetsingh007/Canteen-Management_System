import React, { useState } from 'react'
import { CCard, CRow, CCol, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import ModalProducts from '../ModalProducts/ModalProducts';
import './TodayMenu.css'




function CardTodayMenu({ uid, Name, Description, Category, ImageUrl, Price, Trending }) {

    // console.log(Trending, 'Trending')
    // modal state
    const [modalValue, setModalValue] = useState(false);


    // modal value
    const handleEdit = () => {
        setModalValue(true)
    }

    // getting from child
    const handleClickEditClose = (value) => {
        setModalValue(value);
    }


    return (<div className='CardTodayMenu'>

        <CCard className="w-75 card__todaymenu__start" style={{ marginBottom: "20px", maxWidth: '1200px', width: '100%', boxShadow: 'none' }}>
            <CRow className="g-0">
                <CCol>
                    <CCardImage
                        className='card__todaymenu__start__image'
                        style={{


                            width: '400px',
                            objectFit: 'cover',
                            float: 'left',
                            height: '300px'
                        }}
                        src={ImageUrl} />
                </CCol>
                <CCol>
                    <CCardBody>
                        <CCardTitle style={{ fontSize: '13px' }}>{Name}</CCardTitle>
                        <CCardText className='card__todaymenu__start__description'
                            style={{ fontSize: '11px', overflowY: 'scroll', width: '350px', height: '30px', marginBottom: '0px' }}>
                            {Description}
                        </CCardText>

                        {Trending == true &&
                            <CCardText style={{
                                fontSize: '11px',
                                marginTop: '15px'
                            }} >
                                <small className="text-medium-emphasis"

                                ><span className='card__trending__span'>Trending</span></small>
                            </CCardText>}

                        <CCardText style={{ fontSize: '11px', marginBottom: '0px' }}>
                            <small className="text-medium-emphasis">{Category}</small>
                        </CCardText>

                        <CButton
                            className='button__edit__custom'
                            style={{ marginTop: Trending == true ? '100px' : '140px', width: '130px', fontSize: '11px' }}
                            onClick={handleEdit}
                        >Edit</CButton>
                    </CCardBody>
                </CCol>
            </CRow>
        </CCard>

        <ModalProducts
            modalValue={modalValue}
            handleClickEditClose={handleClickEditClose}
            Name={Name}
            Description={Description}
            id={uid}
            ImageUrl={ImageUrl}
            Category={Category}
            Price={Price}
        />


    </div>
    )
}

export default CardTodayMenu