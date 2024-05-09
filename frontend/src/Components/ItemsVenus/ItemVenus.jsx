import React from 'react'
import '../ItemsOther/ItemsOther.css'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'


const ItemVenus = (props) => {
  return (
    <div className='itemothers col-12 '>
      <Nav.Link as={Link} to={`/venusitems/${props.id}`}>
        <img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Nav.Link>
      <p className='itemothers-name'>{props.name}</p>
      <p><i class="fa-solid fa-map-location-dot m-2"></i>{props.place}</p>
      
       <div className="itemothers-prices">
        <p>{props.category}</p>
        <div className="itemothers-price-new">
            <h3>Veg ₹{props.veg_price} </h3>
            <h6>per plate</h6>
        </div>
        <div className="itemothers-price-new">
            <h3>Non.Veg ₹{props.non_price}</h3>
            <h6>per plate</h6>
        </div>
        <div className="itemothers-price-old">
            <h5>{props.person_min} - {props.person_max}</h5>
            <h6>pax</h6>
        </div>
      </div>
    </div>
  )
}

export default ItemVenus
