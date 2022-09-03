import React, { useState, useEffect } from 'react'
import './MyWallet.css'
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';
import { useSelector } from 'react-redux';




function MyWallet() {

    // redux state
    const user = useSelector(state => state.user.value);


    //  states
    const [wallets, setWallets] = useState([]);
    const [spinner, setSpinner] = useState(true);



    let currentId = null



    //  filter the user and show current wallet
    if (wallets) {

        currentId = wallets.filter((item) => item.data.uid == user.uid);

    }


    // setting state from database wallets data
    useEffect(() => {
        const q = query(collection(db, 'Wallets'));
        onSnapshot(q, (snapshot) => {
            setWallets(snapshot.docs.map((doc) => (
                {
                    uid: doc.id,
                    data: doc.data(),

                }
            )))
            setSpinner(false);
        });
    }, [])


    return (
        <div className='MyWallet'>



            <div className='mywallet__main'>
                <div className='heading__components'>
                    <h4>My Wallet</h4>
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
                        <>
                            {
                                currentId.length !== 0 ?
                                    <div className='mywallet__card__table'>
                                        <CTable striped hover className='mywallet__main__table'>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell scope="col" style={{ width: '500px', fontSize: '11px' }}>Email</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ width: '400px', fontSize: '11px' }}>Role</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{ width: '400px', fontSize: '11px' }}>Balance</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                {currentId.length !== 0 && currentId.map((item) => {
                                                    return <CTableRow key={item.uid}>
                                                        <CTableDataCell style={{ fontSize: '11px' }}>{item.data.email}</CTableDataCell>
                                                        <CTableDataCell style={{ width: '400px', fontSize: '11px' }}>{item.data.role}</CTableDataCell>
                                                        <CTableDataCell style={{ width: '400px', fontSize: '11px' }}>{item.data.balance}</CTableDataCell>
                                                    </CTableRow>
                                                })}
                                            </CTableBody>
                                        </CTable>
                                    </div>
                                    : <div className='no__currentId'
                                        style={{
                                            display: currentId.length == 0 ? 'flex' : "",
                                            alignItems: currentId.length == 0 ? 'center' : "",
                                            justifyContent: currentId.length == 0 ? 'center' : "",
                                        }}
                                    ><h2>No Wallet</h2></div>
                            }
                        </>}
                </div>




            </div>


        </div >
    )
}

export default MyWallet