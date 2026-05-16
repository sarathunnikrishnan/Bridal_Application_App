import React, { useEffect, useState } from 'react'
import './Popular.css'
import Items from '../Items/Items'
import axios from 'axios'
import { API_ENDPOINTS } from '../../utils/constants'
const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

//   useEffect(()=>{
//     fetch('http://localhost:4000/popularinwomen')
//     .then((response)=>response.json())
//     .then((data)=> setPopularProducts(data))
//  },[])

   useEffect(()=>{
       axios.get(API_ENDPOINTS.POPULAR_IN_WOMEN)
       .then(response => {
        setPopularProducts(response.data);
      })
   },[])


  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {popularProducts.map((item, index)=>{
                return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular
