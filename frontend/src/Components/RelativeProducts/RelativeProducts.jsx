import React, { useEffect, useState } from 'react'
import './RelativeProduct.css'
import Items from '../Items/Items'
import { Container } from 'react-bootstrap'

const RelativeProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/product/relatedproducts?category=bridal')
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
