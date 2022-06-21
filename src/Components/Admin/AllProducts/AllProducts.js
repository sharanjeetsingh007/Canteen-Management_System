import React, { useEffect, useState } from 'react'
import './AllProducts.css'
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import ModalProducts from '../ModalProducts/ModalProducts';
import ProductCard from '../ProductsCard/ProductCard';
import { CSpinner, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { async } from '@firebase/util';
import ModalAllProducts from './ModalAllProducts';


function AllProducts() {
    // modal state
    const [modalValue, setModalValue] = useState(false);

    // states
    const [products, setProducts] = useState([]);
    const [spinner, setSpinner] = useState(true);




    //  sending to child component
    const handleClickEditClose = (value) => {
        setModalValue(value);

    }


    //    trending products remove
    const handleRemoveTrending = async (id) => {
        // console.log('tranding fun run')


        const updateQuery = doc(db, 'Products', id);
        try {
            await updateDoc(updateQuery, {
                Tranding: false,

            }).then((response) => {
                alert('Removed Succefully')


            })

                .catch((err) => {
                    alert(err, 'Error removing from Trending')
                })
        }
        catch (err) {
            alert(err, 'Error rmoving from Trending')
        }


    }


    // set state from database of products
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
        <div className='AllProducts'>

            <div className='heading__components'>
                <h4>Products</h4>
            </div>

            <div
                style={{

                    display: spinner == true ? "flex" : "",
                    alignItems: spinner == true ? "center" : "none",
                    justifyContent: spinner == true ? "center" : "none",
                    height: '90vh'

                }}
            >
                {spinner == true ? <div className='spinner__insider'> <CSpinner /></div> : <>

                    <div className='allproducts__main'>
                        {products.length !== 0 ?
                            <div className='allproducts__main__inner'>
                                <div className='cards__row__left'>
                                    <div className='AllProducts__table'>
                                        <h4>All Products</h4>

                                    </div>
                                    <div className='table__allproducts__left' style={{ width: '100%', height: '100%', maxHeight: 'calc(100vh - 190px)' }}>
                                        <CTable striped hover
                                        // style={{ width: '100px', maxWidth: '200px' }}
                                        >
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Name</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Description</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Category</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Price</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Image</CTableHeaderCell>
                                                    <CTableHeaderCell style={{ textAlign: "center", fontSize: '11px' }} scope="col">Action</CTableHeaderCell>


                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {products.map(({ uid, data: { Name, Description, Category, ImageUrl, timestamp, Price, Tranding } }) => {


                                                    return <ModalAllProducts key={uid} id={uid} Name={Name} Description={Description} Category={Category} ImageUrl={ImageUrl} timestamp={timestamp} Price={Price} Tranding={Tranding} />
                                                })}
                                            </CTableBody>
                                        </CTable>
                                    </div>



                                </div>

                                <div className='cards__row__right'>

                                    <div className='tranding__table'>
                                        <h4>Tranding Products</h4>

                                    </div>
                                    <div className='table__row__right'
                                        style={{ height: '100%', maxHeight: 'calc(100vh - 190px)' }}

                                    >

                                        <CTable striped hover>
                                            <CTableHead>
                                                <CTableRow>

                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }} >Name</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Description</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Category</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Price</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Image</CTableHeaderCell>
                                                    <CTableHeaderCell style={{ textAlign: "center", fontSize: '11px' }} scope="col">Action</CTableHeaderCell>


                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {products.map(({ uid, data: { Name, Description, Category, ImageUrl, timestamp, Price, Tranding } }) => {


                                                    return Tranding == true ?
                                                        <CTableRow key={uid}>

                                                            <CTableDataCell style={{ fontSize: '11px' }}>{Name}</CTableDataCell>
                                                            <CTableDataCell
                                                                style={{
                                                                    width: '170px',
                                                                    maxWidth: '170px',
                                                                    overflow: 'scroll',
                                                                    textAlign: 'left',
                                                                    fontSize: '11px'
                                                                }}>
                                                                {Description}</CTableDataCell>
                                                            <CTableDataCell style={{ fontSize: '11px' }}>{Category}</CTableDataCell>
                                                            <CTableDataCell style={{ fontSize: '11px' }}>${" "}{Price}</CTableDataCell>
                                                            <CTableDataCell style={{ width: "140px", fontSize: '11px' }} ><img style={{ width: '100px', objectFit: 'cover', float: 'left', height: '100px' }} src={ImageUrl} /></CTableDataCell>
                                                            <CTableDataCell style={{ width: "200px", fontSize: '11px' }}>

                                                                <div className='card__button__allproducts'>
                                                                    <CButton className='notButton'
                                                                        key={uid}
                                                                        style={{ width: '80px', fontSize: '11px' }}
                                                                        href="#"
                                                                        onClick={() => handleRemoveTrending(uid)}>Remove</CButton>

                                                                </div>

                                                            </CTableDataCell>


                                                        </CTableRow>
                                                        : <></>
                                                })}
                                            </CTableBody>
                                        </CTable>
                                    </div>



                                </div>

                            </div>
                            : <div className='no__products__data'><h2>There's no Products</h2></div>}

                    </div>

                </>
                }
            </div>
            {products.map(({ uid, data: { Name, Description, Category, ImageUrl, timestamp, Price } }) => {

                return <ModalProducts key={uid} modalValue={modalValue} handleClickEditClose={handleClickEditClose} Name={Name} Description={Description} id={uid} ImageUrl={ImageUrl} timestamp={timestamp} Category={Category} Price={Price} />

            })}
        </div>
    )
}

export default AllProducts