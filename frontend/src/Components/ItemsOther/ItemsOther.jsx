import React from 'react'
import './ItemsOther.css'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const numberWithCommas = (number) => {
    return number.toLocaleString(); // This will format the number with commas
  }
  

const ItemsOther = (props) => {
    const formattedOldPrice = numberWithCommas(props.old_price);
    const formattedNewPrice = numberWithCommas(props.new_price);
  return (
    <div className='itemothers col-12 '>
      <Nav.Link as={Link} to={`/photographyitems/${props.id}`}>
        <img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Nav.Link>
      <p className='itemothers-name'>{props.name}</p>
      <p><i class="fa-solid fa-map-location-dot m-2"></i>{props.place}</p>
      
       <div className="itemothers-prices">
        <p>{props.category}</p>
        <div className="itemothers-price-old">
            <h5><del>M.R.P. ₹{formattedOldPrice}</del></h5>
        </div>
        <div className="itemothers-price-new">
            <h3>₹{formattedNewPrice}</h3>
        </div>
      </div>
    </div>
  )
}

export default ItemsOther
