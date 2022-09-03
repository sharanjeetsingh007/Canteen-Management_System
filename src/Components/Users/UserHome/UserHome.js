import React, { useState, useEffect } from 'react'
import './UserHome.css'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CSpinner } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import ModalProducts from '../ModalProducts/ModalProducts';
import ProductCard from '../ProductsCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import LoadingSpinnerMain from '../../../LoadingSpinner/LoadingSpinnerMain';
import { useSelector } from 'react-redux';



export default function UserHome() {

    // states
    const [products, setProducts] = useState([]);
    const [spinner, setSpinner] = useState(true);

    //  sidebar toggle
    const sidebarValue = useSelector(state => state.sidebar.value);





    // setting state to database products
    useEffect(() => {
        const q = query(collection(db, 'Products'));
        onSnapshot(q, (snapshot) => {
            setProducts(snapshot.docs.map((doc) => (

                {
                    uid: doc.id,
                    data: doc.data(),

                }
            )))
            setSpinner(false)
        });


    }, [])




    return (
        <div className='userHome'>
            <div className='userhome__main'
                style={{ maxWidth: sidebarValue == true && '100vw' }}
            >
                <div className='heading__components'>
                    <h4>Trending</h4>
                </div>
                <div
                    style={{

                        display: spinner == true ? "flex" : "",
                        alignItems: spinner == true ? "center" : "none",
                        justifyContent: spinner == true ? "center" : "none",
                        height: '88vh'

                    }}
                >
                    {spinner == true ? <div className='spinner__insider'><CSpinner /></div> :
                        <div className='usehome__allproducts'>
                            <div className='usehome__allproducts__inner'>
                                {products.length !== 0 ? products.map(({ uid, data: { Name, ImageUrl, Description, Price, timestamp, Category } }) => {
                                    return <ProductCard
                                        id={uid}
                                        key={uid}
                                        Name={Name}
                                        ImageUrl={ImageUrl}
                                        Description={Description}
                                        timestamp={timestamp}
                                        Category={Category}
                                        Price={Price}

                                    />
                                }) : <div className='no__products__data'><h2>No products</h2></div>
                                }
                            </div>
                        </div>
                    }
                </div>

            </div>

        </div>
    )
}
