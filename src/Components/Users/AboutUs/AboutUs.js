import React from 'react'
import './AboutUs.css';
import { CButton, CForm, CCol, CFormInput, CFormSelect, CFormCheck } from '@coreui/react';
import '../ContactUs/ContactUs.css'
import { useNavigate } from 'react-router-dom'





function AboutUs() {

    const navigate = useNavigate()
    return (
        <div className='AboutUs ContactUs'>
            <div className='heading__components'>

                <h4>About Us</h4>
            </div>
            <div className='aboutus__main'>

                <div className='adoutcard'>
                    <h4
                        style={{ letterSpacing: '.4px', lineHeight: '40px', fontSize: '16px' }}
                    >
                        We are here to make food easier to reach out to you, <br />
                        by providing Canteen Management System with full functionality of CRUD operations and Role based Authorization.

                    </h4>

                    <CButton
                        onClick={() => navigate('/home/user/user-contact-us')}
                        style={{ margin: '29px 0 5px 0', width: '140px', fontSize: '11px' }}
                    >Contact Today</CButton>
                </div>
            </div>


        </div>
    )
}

export default AboutUs