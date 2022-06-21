import React from 'react'
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';
import './LoadingSpinnerMain.css'



function LoadingSpinnerMain() {
    return (
        <div className='LoadingSpinner'>

            <CSpinner
                color="light"
                style={{ width: '70px', height: '70px', opacity: '4', color: '#321fdb' }}
            />


        </div>
    )
}

export default LoadingSpinnerMain