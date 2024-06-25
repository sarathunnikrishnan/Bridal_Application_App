import React from 'react'
import { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

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
      <h1>Bridal Product List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {
  allproducts.map((product, index) => {
    if (product.category === 'women' || product.category === 'men' || product.category === 'kid'){
      return (
        <React.Fragment key={index}>
          <div className="listproduct-format-main listproduct-format"> 
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
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

export default ListProduct
