import React, { useEffect, useState } from 'react'
import './Orders.css'
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { CSpinner, CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { async } from '@firebase/util';
import OrdersButton from '../OrdersButton/OrdersButton';
import { useSelector } from 'react-redux';




function Orders() {

    //  states
    const [orders, setOrders] = useState([]);
    const [productIdState, setProductIdState] = useState(null);
    const [spinner, setSpinner] = useState(true);

    const sidebarValue = useSelector(state => state.sidebar.value)


    // getting data from database
    useEffect(() => {

        const q = query(collection(db, 'Orders'));
        onSnapshot(q, (snapshot) => {
            setOrders(snapshot.docs.map((doc) => (
                {
                    uid: doc.id,
                    data: doc.data(),

                }
            )))
            setSpinner(false)
        });

    }, [])


    return (
        <div className='AdminOrders'>
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
                {spinner == true ? <div className='spinner__insider'> <CSpinner /></div> :
                    <div className='adminorders__main'

                        style={{
                            display: orders.length !== 0 ? "" : "flex",
                            alignItems: orders.length !== 0 ? "" : "center",
                            justifyContent: orders.length !== 0 ? "" : "center",

                        }}

                    >
                        {orders.length !== 0 ?
                            <div className='cards__row__table__orders'>

                                <CTable striped hover
                                >
                                    <CTableHead >
                                        <CTableRow>
                                            <CTableHeaderCell
                                                style={{ fontSize: '11px' }}
                                                scope="col" >UserName</CTableHeaderCell>
                                            <div className='row__table'>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '150px', fontSize: '11px' }} scope="col">Name</CTableHeaderCell>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '160px', fontSize: '11px' }} scope="col">Image</CTableHeaderCell>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '150px', fontSize: '11px' }} scope="col">Price</CTableHeaderCell>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '130px', fontSize: '11px' }} scope="col">Quantity</CTableHeaderCell>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '120px', fontSize: '11px' }} scope="col">Total</CTableHeaderCell>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '120px', fontSize: '11px' }} scope="col">Status</CTableHeaderCell>
                                                <CTableHeaderCell style={{ width: sidebarValue == true ? '300px' : '0px', fontSize: '11px' }} scope="col">Action</CTableHeaderCell>

                                            </div>


                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody

                                    // style={{ position: 'fixed', height: '100%', maxHeight: '82.5vh', width: '100%', maxWidth: '77.5vw', marginRight: '100px', overflow: 'scroll' }}
                                    >
                                        {orders.length !== 0 && orders.map((item) => {
                                            return <CTableRow key={item.uid}>
                                                <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '200px', fontSize: '11px' }}>{orders.length !== 0 && item.data.UserName}</CTableDataCell>

                                                {item.data.Orders.map((item2) => {
                                                    return <CTableRow key={item2.uid}
                                                    >
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '250px', fontSize: '11px' }} >{item2.ProductName}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '290px', fontSize: '11px' }}  ><img style={{ objectFit: 'cover', float: 'left', width: '100px', height: '90px' }} src={item2.ImageUrl} /></CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '290px', fontSize: '11px' }}>${" "}{item2.Price}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '260px', fontSize: '11px' }}>{item2.Quantity}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '200px', fontSize: '11px' }}>{item2.Total}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '170px', fontSize: '11px' }}>{item.data.Status}</CTableDataCell>
                                                        <CTableDataCell style={{ width: sidebarValue == true ? '300px' : '150px', fontSize: '11px' }}>

                                                            <OrdersButton userName={orders.length !== 0 && item.data.UserName} uid={orders.length !== 0 && item.uid} Orders={orders.length !== 0 && orders} />

                                                        </CTableDataCell>
                                                    </CTableRow>


                                                })}

                                            </CTableRow>


                                            // console.log(item2, 'item inside map')


                                        })}
                                    </CTableBody>
                                </CTable>



                            </div>
                            : <div className='no__products__data'><h2>There's no Orders</h2></div>}


                    </div>
                }
            </div>


        </div>
    )
}

export default Orders