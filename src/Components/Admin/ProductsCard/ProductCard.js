// import React, { useState } from 'react'
// import './ProductCard.css'
// import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
// import ModalProducts from '../ModalProducts/ModalProducts';

// import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
// import { db } from '../../../Firebase';
// import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
// import { Table } from 'react-bootstrap';



// function ProductCard({ id, Name, Description, Category, timestamp, ImageUrl, Price }) {

//     const [modalValue, setModalValue] = useState(false);

//     // console.log(id, 'uid in card')
//     const handleClickEdit = (value) => {

//         console.log(value, 'clicking edit btn')
//         setModalValue(true);

//     }


//     const handleClickEditClose = (value) => {
//         setModalValue(value);


//     }

//     const handleDelete = async (id) => {

//         // console.log('detete fun run')
//         try {
//             await deleteDoc(doc(db, "Products", id))
//                 .then(() => {
//                     alert('Deleted succesfully')
//                 }).catch((err) => {
//                     alert(err, 'Failed to delete')
//                 })

//         } catch (err) {
//             alert(err, 'Deleting data')
//         }

//     }

//     return (
//         <div className='ProductCard'>





//             {/*<CCard className='card' style={{ maxWidth: '340px' }}>
//                 <CCardImage orientation="top" src={ImageUrl} />
//                 <CCardBody>
//                     <div className='card__name__price'>
//                         <CCardTitle>{Name}</CCardTitle>
//                         <CCardTitle>${""}{Price}</CCardTitle>

//                     </div>
//                     <CCardText>
//                         {Description}
//                     </CCardText>
//                     <div className='card__button'>
//                         <CButton href="#"
//                             onClick={handleClickEdit}
//                         >Edit</CButton>
//                         <CButton href="#" onClick={() => handleDelete(id)}>Delete</CButton>
//                     </div>

//                 </CCardBody>
//     </CCard>*/}
//             {/* <ModalProducts modalValue={modalValue} handleClickEditClose={handleClickEditClose} Name={Name} Description={Description} id={id} ImageUrl={ImageUrl} timestamp={timestamp} Category={Category} Price={Price} />*/}

//         </div>
//     )
// }

// export default ProductCard