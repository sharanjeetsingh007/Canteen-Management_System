import React, { useEffect, useState } from 'react'
import './Users.css'
import { CSpinner, CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';






function Users() {

    // states
    const [users, setUsers] = useState([]);
    const [spinner, setSpinner] = useState(true);


    //  getting data from database
    useEffect(() => {
        const q = query(collection(db, 'Users'));
        onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map((doc) => (
                {
                    uid: doc.id,
                    data: doc.data(),

                }
            )))
            setSpinner(false);
        });


    }, [])

    return (
        <div className='Users'>
            <div className='heading__components'>
                <h4>Users</h4>
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
                    <div className='users__main'>
                        <div className='users__table'>
                            <CTable striped hover>
                                <CTableHead>
                                    <CTableRow>

                                        <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Photo</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" style={{ fontSize: '11px' }}>Role</CTableHeaderCell>



                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {users.map(({ uid, data: { displayName, email, photoUrl, role } }) => {


                                        return <CTableRow key={uid}>

                                            <CTableDataCell style={{ fontSize: '11px' }}>{displayName}</CTableDataCell>
                                            <CTableDataCell style={{ fontSize: '11px' }}>{email}</CTableDataCell>
                                            <CTableDataCell style={{ width: "100px" }} ><img style={{ width: '70px' }} src={photoUrl} /></CTableDataCell>
                                            <CTableDataCell style={{ width: "200px", fontSize: '11px' }}>

                                                {role}

                                            </CTableDataCell>


                                        </CTableRow>
                                    })}
                                </CTableBody>
                            </CTable>
                        </div>



                    </div>
                }
            </div>
        </div>
    )
}

export default Users