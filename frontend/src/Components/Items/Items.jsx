import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const numberWithCommas = (number) => {
  return number.toLocaleString(); // This will format the number with commas
}


const Items = (props) => {
  const formattedOldPrice = numberWithCommas(props.old_price);
  const formattedNewPrice = numberWithCommas(props.new_price);
  return (
    <div className='item col-12'>
      <Nav.Link as={Link} to={`/bridalproduct/${props.id}`}>
        <img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Nav.Link>
      <p>{props.name}</p>
      
       <div className="item-prices">
        <div className="item-price-old">
            <h5><del>M.R.P. ₹{formattedOldPrice}</del></h5>
        </div>
        <div className="item-price-new">
            <h3>₹{formattedNewPrice}</h3>
        </div>
      </div>
    </div>
  )
}

export default Items
