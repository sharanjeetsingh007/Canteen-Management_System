import React, { useState } from 'react'
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { Alert, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';




function ModalDelete({ modalDeleteValue, handleDeleteModalProps, id }) {



    const handleDelete = async (id) => {

        // console.log('detete fun run')
        try {
            await deleteDoc(doc(db, "Products", id))
                .then(() => {
                    alert('Deleted succesfully')
                }).catch((err) => {
                    alert(err, 'Failed to delete')
                })

        } catch (err) {
            alert(err, 'Deleting data')
        }

    }

    return (
        <div>

            <CModal alignment="center" visible={modalDeleteValue} onClose={() => handleDeleteModalProps(false)}>
                <CModalHeader>
                    <CModalTitle>Delete Item</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure to delete the Product?
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => handleDeleteModalProps(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => handleDelete(id)}>Yes</CButton>
                </CModalFooter>
            </CModal>


        </div>
    )
}

export default ModalDelete