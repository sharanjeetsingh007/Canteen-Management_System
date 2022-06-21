import React, { useState } from 'react'
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import ModalWallets from './ModalWallets/ModalWallets';

function Practice({ Email, Name, Role, Balance, id, serial }) {

    const [modalValue, setModalValue] = useState(false);

    // modal value true
    const handleAddRemove = () => {
        console.log('modal wallets true')
        setModalValue(true)

    }

    // giving to child
    const handleClickEditClose = (value) => {

        setModalValue(value)

    }


    return (
        <CTableRow>
            <CTableHeaderCell scope="row" style={{ fontSize: '11px' }}>{serial}</CTableHeaderCell>
            <CTableDataCell style={{ fontSize: '11px' }}>{Name}</CTableDataCell>
            <CTableDataCell style={{ fontSize: '11px' }}>{Email}</CTableDataCell>
            <CTableDataCell style={{ fontSize: '11px' }}>{Role}</CTableDataCell>
            <CTableDataCell style={{ fontSize: '11px' }}>${" "}{Balance}</CTableDataCell>
            <CTableDataCell style={{ fontSize: '11px' }}>
                <CButton
                    style={{ fontSize: '11px', margin: "0" }}
                    onClick={handleAddRemove}
                >
                    Change Amount
                </CButton>

            </CTableDataCell>
            <CTableDataCell
                style={{ display: 'none' }}
            >
                <ModalWallets
                    modalValue={modalValue}
                    handleClickEditClose={handleClickEditClose}
                    Email={Email}
                    Role={Role}
                    Balance={Balance}
                    Name={Name}
                    id={id}
                    key={id}
                />
            </CTableDataCell>
        </CTableRow>




    )
}

export default Practice