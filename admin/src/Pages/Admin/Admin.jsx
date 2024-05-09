// import React from 'react'
import { Container } from 'react-bootstrap'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import { Routes, Route } from 'react-router-dom'
import PhotoAddProduct from '../../Components/PhotoAddProducts/PhotoAddProduct'
import VenusAddProduct from '../../Components/VenusAddProduct/VenusAddProduct'
import PhotoListProduct from '../../Components/PhotoListProduct/PhotoListProduct'
import VenusListProduct from '../../Components/VenusListProduct/VenusListProduct'

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>
      <Container>
      <Routes>
        <Route path='/addbridalproduct' element={<AddProduct/>}></Route>
        <Route path='/listproductbridal' element={<ListProduct/>}></Route>
        <Route path='/addphotoproduct' element={<PhotoAddProduct/>}></Route>
        <Route path='/addvenusproduct' element={<VenusAddProduct/>}></Route>
        <Route path='/photolistproduct' element={<PhotoListProduct/>}></Route>
        <Route path='/venuslistproduct' element={<VenusListProduct/>}></Route>
      </Routes>
      </Container>
    </div>
  )
}

export default Admin
