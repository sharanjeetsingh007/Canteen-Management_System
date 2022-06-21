import React from 'react'
import './OrdersButton.css'
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';




function OrdersButton({ userName, uid, Orders }) {

    // finding the current id of the row button clicked
    let idAssign = null;
    if (Orders) {
        const selectdId = Orders.find((item) => item.uid == uid)
        idAssign = selectdId.uid;
    }

    //  handling accept
    const handleAccept = async (id) => {
        const updateQuery = await doc(db, 'Orders', id);
        try {
            await updateDoc(updateQuery, {
                Status: "Accepted",

            }).then((response) => {
                alert('Accepted succesfully')
            })
                .catch((err) => {
                    alert(err, 'err')
                })
        }
        catch (err) {
            alert(err, 'Error')
        }

    }

    // handling reject
    const handleRefect = async (id) => {

        const updateQuery = doc(db, 'Orders', id);
        try {
            await updateDoc(updateQuery, {
                Status: "Rejected",

            })
                .then((response) => {
                    alert('Rejected Succefully')
                })

                .catch((err) => {
                    alert(err, 'Error')
                })
        }
        catch (err) {
            alert(err, 'Error')
        }

    }

    return (<>

        {uid ? <>
            <div className='OrdersButton'>
                <div className='ccard__button'>
                    <CButton
                        style={{ width: '80px', margin: '8px 0 0 0', fontSize: '11px' }}
                        id={uid}
                        href="#"
                        onClick={() => handleAccept(idAssign)}
                    >Accept</CButton>
                    <CButton
                        style={{ width: '80px', margin: '8px 0 8px 0', fontSize: '11px' }}
                        id={uid}
                        href="#"
                        onClick={() => handleRefect(idAssign)}
                    >Reject</CButton>
                </div>
            </div>
        </>
            : <></>
        }
    </>
    )
}

export default OrdersButton