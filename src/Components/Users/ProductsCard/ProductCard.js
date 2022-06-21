import React, { useState } from 'react'
import './ProductCard.css'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import ModalProducts from '../ModalProducts/ModalProducts';

import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { Table } from 'react-bootstrap';



function ProductCard({ id, Name, Description, Category, timestamp, ImageUrl, Price }) {

    //  state for modal and ellipse description
    const [modalValue, setModalValue] = useState(false);
    const [ellipseShow, setEllipseShow] = useState(false);


    // function to open modal
    const handleClickModal = () => {

        setModalValue(true);

    }

    // Passing function as props to child for closing modal
    const handleClickEditClose = (value) => {
        setModalValue(value);


    }



    const handleEllipse = () => {
        setEllipseShow(!ellipseShow)
    }



    return (
        <div className='ProductCard'>

            <CCard className='card__product'
                style={{ padding: 'none', boxShadow: 'none' }}
            // style={{ padding: 'none', margin: 'none', boxShadow: 'none', width: '100%', maxWidth: '250px', height: '100%', maxHeight: '390px' }}
            >
                <CCardImage
                    className='card__product__image'
                    style={{ objectFit: 'cover', float: 'left', width: '282px', height: '230px' }}
                    orientation="top" src={ImageUrl} />
                <CCardBody className="card__body__custom">
                    <div className='card__name__price'>
                        <CCardTitle style={{ fontSize: '16px' }}>{Name}</CCardTitle>
                        <CCardTitle style={{ fontSize: '16px' }}>${""}{Price}</CCardTitle>

                    </div>
                    <CCardText
                        className='card__product__description'
                        onClick={handleEllipse}
                        style={{
                            // border: '2px solid red',
                            // display: 'flex',
                            // flexDirection: 'column',
                            marginTop: '5px',
                            cursor: 'pointer',
                            textOverflow: ellipseShow == true ? 'clip' : 'ellipsis',
                            overflow: ellipseShow == true ? 'scroll' : 'hidden',
                            width: '250px',
                            height: '40px',
                            whiteSpace: ellipseShow == true ? 'normal' : 'nowrap',
                            fontSize: '12px',
                            marginBottom: 'none'
                            // textOverflow: 'ellipsis',
                            // whiteSpace: 'nowrap',
                            // overflow: 'hidden'
                            // , width: '200px'
                        }}

                    >
                        {Description}
                    </CCardText>
                    <div className='productcard__card__button'>
                        <CButton
                            style={{
                                width: '170px',
                                fontSize: '12px'

                            }}
                            href="#"
                            onClick={handleClickModal}
                        >Add to Cart</CButton>

                    </div>

                </CCardBody>
            </CCard>
            <ModalProducts modalValue={modalValue} handleClickEditClose={handleClickEditClose} Name={Name} Description={Description} id={id} ImageUrl={ImageUrl} timestamp={timestamp} Category={Category} Price={Price} />

        </div >
    )
}

export default ProductCard