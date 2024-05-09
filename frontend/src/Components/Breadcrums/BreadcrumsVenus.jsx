import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Container } from 'react-bootstrap';

const BreadcrumsVenus = (props) => { 
    const {product} = props;
  return (
    <div className='breadcrum'>
        <Container>
      HOME <img src={arrow_icon} alt="" /> VENUS $ CATERING <img src={arrow_icon} alt="" /> {product.name}
      </Container>
    </div>
  )
}

export default BreadcrumsVenus
