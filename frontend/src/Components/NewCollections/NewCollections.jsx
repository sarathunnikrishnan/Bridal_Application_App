import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Items from '../Items/Items'
import axios from 'axios'

const NewCollections = () => {

      const [new_collections, setNew_collection] = useState([]);

      // useEffect(()=>{
      //   fetch('http://localhost:4000/newcollections')
      //   .then((response)=>response.json())
      //   .then((data)=>setNew_collection(data))
      // },[]) 

      useEffect(()=>{
        axios.get('http://localhost:4000/product/newcollections')
        .then(response => {
          setNew_collection(response.data);
       })
    },[])

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        { 
          new_collections.map((item, index)=>{
            return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          })
        }
      </div>
    </div>
  )
}

export default NewCollections
