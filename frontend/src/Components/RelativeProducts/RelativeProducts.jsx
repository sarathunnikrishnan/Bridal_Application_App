import React from 'react'
import './RelativeProduct.css'
import data_product from '../Assets/data'
import Items from '../Items/Items'
import { Container } from 'react-bootstrap'

const RelativeProducts = () => {
  return (
    <div className='relativeproducts'>
        <Container>
       <h1>RELATED PRODUCTS</h1>
       <hr/>
       <div className="relatedproduct-items">
           {
            data_product.map((item, index)=>{
                return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })
           }
       </div>
       </Container>
    </div>
  )
}

export default RelativeProducts
