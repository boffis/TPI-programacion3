import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home/Home';
import NotFound from "./components/notFound/NotFound";
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import Store from './components/store/store';
import { ToastContainer } from "react-toastify";
import Account from './components/dashboards/account/Account';
import AddProduct from './components/addProduct/AddProduct';
import ProtectedLogin from './components/protected/unauthorized/ProtectedLogin';
import ProtectedStatus from './components/protected/forbidden/ProtectedStatus';
import ProductDetail from './components/productDetail/ProductDetail';
import SysAdmin from './components/dashboards/sysadmin/SysAdmin';
import Cart from './components/cart/Cart';
import User from './components/user/User';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element = {<ProtectedStatus statusNeeded={"Seller"}/>}>
            <Route path='newProduct' element={<AddProduct/>}/>
          </Route>
          <Route element = {<ProtectedStatus statusNeeded={"SysAdmin"}/>}>
            <Route path='/admin' element={<SysAdmin/>}/>
          </Route>
          <Route element={<ProtectedLogin/>}>
            <Route path='detail/:id' element={<ProductDetail/>}/>
            <Route path='user/:id' element={<User/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Route>
          <Route path='/' element={<Navigate to={"/home"}/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/store' element={<Store />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer/>
    </div>
  )
}

export default App
