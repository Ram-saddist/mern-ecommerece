import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Signup from './Signup/Signup'
import Login from './Login/Login'
import Home from './Home/Home'
import AddProduct from './AddProduct/AddProduct'
import Cart from './Cart/Cart'
import Navigation from './Navigation/Navigation'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
