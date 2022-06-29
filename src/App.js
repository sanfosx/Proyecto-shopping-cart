import React from "react";
import { Route, Routes } from 'react-router-dom';
import CartProvider from "./contexts/CartContext";
import Home from "./components/home/Home";
import styled from "styled-components";
import Images from '../src/assets/images.jsx'
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Login from './components/home/Login'
import Register from './components/home/Register'
import { AuthProvider } from "./contexts/AuthContext";
import Product from "./components/product/Product";
import User from './components/user/User.jsx'
import Purchase from "./components/Purchase";

const App = () => (
  <CartProvider>
    <AuthProvider>
      <DivApp >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<ShoppingCart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/purchase' element={<Purchase/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/favorites' element={<User/>}/>
          <Route path='/orders' element={<User/>}/>
        </Routes>
      </DivApp>
    </AuthProvider>
  </CartProvider>
)
export default App;

const DivApp= styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: url(${Images.backgroundImg});
  background-repeat: no-repeat;
  background-size:100%;
  height:100vh;
  padding:20px;
  @media (max-width: 990px) {
    height:100%
  }
`;