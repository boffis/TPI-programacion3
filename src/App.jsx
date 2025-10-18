import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home/Home';
import NotFound from "./components/notFound/NotFound";
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import Store from './components/store/store';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={"/home"}/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/store' element={<Store />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
