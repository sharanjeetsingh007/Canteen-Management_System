import React, { useState, useEffect } from 'react'
import './Wallets.css'
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';
import { useSelector } from 'react-redux';
import ModalWallets from '../ModalWallets/ModalWallets';
import Practice from '../Practice';



function Wallets() {

    // states
    const [wallets, setWallets] = useState([])
    const [spinner, setSpinner] = useState(true);



    // setting database wallets to state
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
        <div className='Wallets'>
            <div className='heading__components'>
                <h4>Wallets</h4>
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
                    <div className='wallets__main'>
                        {wallets.length == 0 ? <div className='no__wallet__data' style={{ display: spinner == true ? 'none' : 'flex' }}><h2>There's no Wallet</h2></div> :
                            <div className='wallets__table__admin'>
                                <CTable striped hover
                                >
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>No.</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Email</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Role</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Balance</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Action</CTableHeaderCell>

                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {wallets && wallets.map((item, index) => {
                                            item.serial = index + 1;

                                            return <Practice

                                                Email={item.data.email}
                                                Role={item.data.role}
                                                Balance={item.data.balance}
                                                Name={item.data.name}
                                                id={item.uid}
                                                key={item.uid}
                                                serial={item.serial}

                                            />
                                            {/*<CTableRow key={index}>
                                    <CTableHeaderCell scope="row">{item.serial}</CTableHeaderCell>
                                    <CTableDataCell>{item.data.name}</CTableDataCell>
                                    <CTableDataCell>{item.data.email}</CTableDataCell>
                                    <CTableDataCell>{item.data.role}</CTableDataCell>
                                    <CTableDataCell>${" "}{item.data.balance}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                            onClick={handleAddRemove}
                                        >
                                            Add Amount
                                        </CButton>

                                    </CTableDataCell>
                            </CTableRow>*/}
                                        })}
                                    </CTableBody>
                                </CTable>

                            </div>
                        }

                    </div>

                }
            </div>


        </div>
    )
}

export default Wallets