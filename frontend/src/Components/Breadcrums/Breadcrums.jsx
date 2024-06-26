import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { Container } from 'react-bootstrap';

const Breadcrums = (props) => {
    const {product} = props;
    // console.log(product)
  return (
    <div className='breadcrum'>
      <Container>
      HOME <img src={arrow_icon} alt="" /> BRIDAL <img src={arrow_icon} alt="" /> {product.name}
      </Container>
    </div>
  )
}

export default Breadcrums
