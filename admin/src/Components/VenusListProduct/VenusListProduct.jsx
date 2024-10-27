import React from 'react'
import { useEffect, useState } from 'react'
import '../ListProduct/ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const VenusListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async()=>{
    await fetch('http://localhost:4000/product/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)})
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id) =>{
    await fetch('http://localhost:4000/product/removeproduct',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }
  return (
    <div className='list-product'>
      <h1>Venues Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Veg Price</p>
        <p>Non Price</p>
        <p>Person</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {
  allproducts.map((product, index) => {
    if (product.category === "Hall & Catering Service"){
      return (
        <React.Fragment key={index}>
          <div className="listproduct-format-main listproduct-format listproduct-format-venus"> 
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>₹{product.veg_price}</p>
            <p>₹{product.non_price}</p>
            <p>{product.person_min} - {product.person_max}</p>
            <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon listproduct-remove-icon-venus' src={cross_icon} alt="" />
          </div>
          <hr />
        </React.Fragment>
      )
    } else {
      return null; // If category is not 'women', don't render anything
    }
  })
}
      </div>
    </div>
  )
}

export default VenusListProduct
