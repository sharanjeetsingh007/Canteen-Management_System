import React from 'react'
import './ContactUs.css'
import { CButton, CForm, CCol, CFormInput, CFormSelect, CFormCheck } from '@coreui/react';




function ContactUs() {
    return (
        <div className='ContactUs'>
            <div className='heading__components'>

                <h4>Contact Us</h4>
            </div>
            <div className='contactus__main'>



                <h2>Contact Us Today!</h2>


                <div className='contactus__form__layout'>

                    <img
                        src='https://icons-for-free.com/download-icon-app+email+emailing+galaxy+mobile+open+line+icon-1320183043200419856_512.png' alt="mail image" />

                    <div className='contactus__form'>
                        <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormInput className='form__input' type="email" id="inputEmail4" label="Email" />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput className='form__input' type="password" id="inputPassword4" label="Password" />
                            </CCol>
                            <CCol xs={12}>
                                <CFormInput className='form__input' id="inputAddress" label="Address" placeholder="1234 Main St" />
                            </CCol>
                            <CCol xs={12}>
                                <CFormInput className='form__input' id="inputAddress2" label="Address 2" placeholder="Apartment, studio, or floor" />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput className='form__input' id="inputCity" label="City" />
                            </CCol>
                            <CCol md={4}>
                                <CFormSelect id="inputState" label="State">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={2}>
                                <CFormInput id="inputZip" label="Zip" />
                            </CCol>
                            <CCol xs={12}>
                                <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
                            </CCol>
                            <CCol xs={12}>
                                <CButton style={{ width: '150px', margin: '0' }} type="submit">Submit</CButton>
                            </CCol>
                        </CForm>

                    </div>

                </div>








            </div>


        </div>
    )
}

export default ContactUs