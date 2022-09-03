import React, { useState, useEffect } from 'react'
import './MyOrders.css'
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { useSelector } from 'react-redux';




function MyOrders() {

    //  redux states
    const user = useSelector((state) => state.user.value)
    const sidebarValue = useSelector((state) => state.sidebar.value)

    //  states
    const [orders, setOrders] = useState([]);
    const [spinner, setSpinner] = useState(true);







    let u2 = null;


    //  filtering and showing current user orders
    if (orders.length !== 0) {

        const userOrder2 = orders.filter((item) => item.data.UserId == user.uid)
        u2 = userOrder2;

    }


    useEffect(() => {
        const q = query(collection(db, 'Orders'));
        onSnapshot(q, (snapshot) => {
            setOrders(snapshot.docs.map((doc) => (
                {
                    uid: doc.id,
                    data: doc.data(),

                }
            )))
            setSpinner(false);
        });


    }, [])

    return (
        <div className='MyOrders'>

            <div className='myorders__main'>

                <div className='heading__components'>
                    <h4>Orders</h4>
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
                        <div className='orders__main'
                            style={{
                                display: orders.length !== 0 && u2.length !== 0 ? "" : "flex",
                                alignItems: orders.length !== 0 && u2.length !== 0 ? "" : "center",
                                justifyContent: orders.length !== 0 && u2.length !== 0 ? "" : "center"
                            }}
                        >

                            {orders.length !== 0 && u2.length !== 0 ?
                                <div className='cards__row__myorders'>
                                    <CTable striped hover className='cards__row__myorders__table'
                                    >
                                        <CTableHead>
                                            <CTableRow >

                                                <CTableHeaderCell className='row__table__username__hardcode' scope="col" style={{ width: '250px', fontSize: '11px' }}>UserName</CTableHeaderCell>
                                                <CTableHeaderCell className='row__table__name__hardcode' style={{ width: '200px', marginLeft: '100px', fontSize: '11px' }} scope="col">Name</CTableHeaderCell>
                                                <CTableHeaderCell className='row__table__image__hardcode' style={{ width: '310px', marginLeft: '19px', fontSize: '11px' }} scope="col">Image</CTableHeaderCell>
                                                <CTableHeaderCell className='row__table__price__hardcode' style={{ width: '220px', fontSize: '11px' }} scope="col">Price</CTableHeaderCell>
                                                <CTableHeaderCell className='row__table__quantity__hardcode' style={{ width: '220px', fontSize: '11px' }} scope="col">Quantity</CTableHeaderCell>
                                                <CTableHeaderCell className='row__table__total__hardcode' style={{ width: '220px', fontSize: '11px' }} scope="col">Total</CTableHeaderCell>
                                                <CTableHeaderCell className='row__table__status__hardcode' style={{ width: '230px', fontSize: '11px' }} scope="col">Status</CTableHeaderCell>



                                            </CTableRow>
                                        </CTableHead>

                                        <CTableBody
                                        >
                                            {
                                                orders.length !== 0 ? u2.map((i) => i.data.Orders.map((item2) => {
                                                    return <CTableRow key={item2.ProductId}>
                                                        <CTableDataCell style={{ width: sidebarValue == false ? "170px" : "220px", fontSize: '11px' }} >{i.data.UserName}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == false ? '140px' : "165px", marginLeft: '93px', fontSize: '11px' }}>{item2.ProductName}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == false ? "210px" : "270px", fontSize: '11px' }} ><img style={{ objectFit: 'cover', float: 'left', width: '100px', height: '90px' }} src={item2.ImageUrl} /></CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == false ? '170px' : "200px", fontSize: '11px' }}>${" "}{item2.Price}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == false ? '140px' : "180px", fontSize: '11px' }}>{item2.Quantity}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == false ? '150px' : "180px", fontSize: '11px' }}>${" "}{item2.Total}</CTableDataCell>
                                                        <CTableDataCell style={{ fontSize: '11px' }}>{i.data.Status}</CTableDataCell>
                                                    </CTableRow>
                                                })) : <><h3>No orders map</h3></>}

                                        </CTableBody>
                                    </CTable>
                                </div>
                                : <><h3>No orders</h3></>}
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default MyOrders