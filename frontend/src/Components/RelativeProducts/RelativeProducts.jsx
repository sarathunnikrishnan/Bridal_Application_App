import React, { useEffect, useState } from 'react'
import { API_ENDPOINTS } from "../../utils/constants";
import './RelativeProduct.css'
import Items from '../Items/Items'
import { Container } from 'react-bootstrap'

const RelativeProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.RELATED_PRODUCTS}?category=bridal`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='relativeproducts'>
        <Container>
       <h1>RELATED PRODUCTS</h1>
       <hr/>
       <div className="relatedproduct-items">
           {
            relatedProducts.map((item, index)=>{
                return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })
           }
       </div>
       </Container>
    </div>
  )
}

export default RelativeProducts
