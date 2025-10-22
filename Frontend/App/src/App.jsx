import { useState } from 'react'
import {Route,Routes,Link} from 'react-router-dom'
import Signup from './Signup'
import SignupAsSeller from './SignupAsSeller'
import Signin from './Signin'
import LandingPage from './LandingPage'
import SigninAsSeller from './SigninAsSeller'
import Otp from './otp'
import Otpseller from './Otp-seller'
import Home from './Home'
import Homeseller from './HomeSeller'
import AddProduct from './AddProduct'
import YourProducts from './YourProducts'
import EditProduct from './EditProduct'
import ViewProduct from './ViewProduct'
import YourCart from './YourCart'
import Buy from './Buy'
import YourOrders from './YourOrders'

function App() {

  return (
    <>
   <div className='h-screen w-screen bg-white flex items-center justify-center'>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signupasseller' element={<SignupAsSeller/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/signin-seller' element={<SigninAsSeller/>}/>
      <Route path='/otp' element={<Otp/>}/>
      <Route path='/otp-seller' element={<Otpseller/>}></Route>
      <Route path='/home-seller' element={<Homeseller/>}></Route>
      <Route path='/Add-Product' element={<AddProduct/>}/>
      <Route path='/Your-Products' element={<YourProducts/>}></Route>
      <Route path='/Edit-Product' element={<EditProduct/>}/>
      <Route path='/viewproduct' element={<ViewProduct/>}/>
      <Route path='/yourcart' element={<YourCart/>}/>
      <Route path='/Buy' element={<Buy/>}/>
      <Route path='/YourOrders' element={<YourOrders/>}/>
    </Routes>

   </div>
    </>
  )
}

export default App
