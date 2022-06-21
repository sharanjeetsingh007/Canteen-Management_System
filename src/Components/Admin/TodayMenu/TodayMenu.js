import React, { useEffect, useState } from 'react'
import './TodayMenu.css'
import { CSpinner, CCard, CRow, CCol, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import CardTodayMenu from './CardTodayMenu';
import CarsoulTodayMenu from './CarsoulTodayMenu';
import { uid, CCarousel, CCarouselItem, CCarouselCaption, CImage, CTable } from '@coreui/react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function TodayMenu() {

    const [products, setProducts] = useState([]);
    const [modalValue, setModalValue] = useState(false);
    const [spinner, setSpinner] = useState(true);



    const handleEdit = () => {
        setModalValue(true)
    }


    const handleClickEditClose = (value) => {
        setModalValue(value);


    }



    useEffect(() => {
        const q = query(collection(db, 'Products'));
        onSnapshot(q, (snapshot) => {
            setProducts(snapshot.docs.map((doc) => (
                // const data = doc.data();
                // console.log(doc.data().role, 'firestore gettting data 😈'),
                {
                    uid: doc.id,
                    data: doc.data(),

                }
            )))
            setSpinner(false);
        });


    }, [])


    return (
        <div className='TodayMenu'>

            <div className='heading__components'>
                <h4>Today Menu</h4>
            </div>
            <div
                style={{

                    display: spinner == true ? "flex" : "",
                    alignItems: spinner == true ? "center" : "none",
                    justifyContent: spinner == true ? "center" : "none",
                    height: '90vh'

                }}
            >
                {spinner == true ? <div className='spinner__insider'> <CSpinner /></div> :
                    <div className='todaymenu__main'
                        style={{

                            display: products.length !== 0 ? "" : 'flex',
                            alignItems: products.length !== 0 ? "" : 'center',
                            justifyContent: products.length !== 0 ? "" : 'center'



                        }}
                    >
                        {/*
                <div className='carsoul__all'>
                    <div className='carsoul__all__heading'>
                        <h5>Trending</h5>
                    </div>
                    <div className='carsoul__todaymenu'>
                        <Carousel
                            autoPlay={true}
                            infiniteLoop={true}
                            style={{ border: '3px solid black' }}>
                            {products && products.map(({ index, uid, data: { Name, Description, Category, Price, ImageUrl } }) => (

                                <CarsoulTodayMenu
                                    key={uid}
                                    uid={uid}
                                    Name={Name}
                                    Description={Description}
                                    Category={Category}
                                    Price={Price}
                                    ImageUrl={ImageUrl}
                                />

                            ))}

                        </Carousel>
                            </div>
                            </div>*/}
                        <div className='card__all'>

                            {products.length !== 0 ?
                                <div className='card__todaymenu'>

                                    {products && products.map(({ uid, data: { Name, Description, Category, Price, ImageUrl, Tranding } }) => {

                                        return <CardTodayMenu key={uid} uid={uid} Name={Name} Description={Description} Category={Category} Price={Price} ImageUrl={ImageUrl} Trending={Tranding} />

                                    })}


                                </div>
                                : <div className='no__products__data'><h2>There's no Menu</h2></div>}
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default TodayMenu