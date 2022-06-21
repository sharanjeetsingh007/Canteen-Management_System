import React from 'react'
import { CCarousel, CCarouselItem, CCarouselCaption, CImage, CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './CarsoulTodayMenu.css'



function CarsoulTodayMenu({ uid, Name, Description, ImageUrl }) {



    console.log(ImageUrl, 'ImageUrl')
    return (


        <div className='inner__carsoul__custom' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={ImageUrl} style={{ width: '40%', objectFit: 'cover', float: 'left', height: '300px' }} />
            <p className="legend" style={{
                width: '300px',
                // position: 'absolute',
                // right: '0',
                // top: '320px',
                // bottom: '40px'
            }}>{Name}</p>
        </div>





    )
}

export default CarsoulTodayMenu