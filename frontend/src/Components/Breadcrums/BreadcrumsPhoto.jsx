import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Container } from 'react-bootstrap';

const BreadcrumsPhoto = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>

      <Container>
      HOME <img src={arrow_icon} alt="" /> PHOTOGRAPHY <img src={arrow_icon} alt="" /> {product.name}
      </Container>
    </div>
  )
}

export default BreadcrumsPhoto;