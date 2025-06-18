import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ListingPage1 from './pages/ListingPage1.jsx'
import ListingPage2 from './pages/ListingPage2.jsx'
import ListingPage3 from './pages/ListingPage3.jsx'
import Payment from './pages/Payment.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import ListingDetail from './pages/ListingDetail.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Profile from './pages/Profile.jsx'
import HelpCenter from './pages/HelpCenter.jsx'
import Services from './pages/Service.jsx'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/listingpage1' element={<ListingPage1 />} />
      <Route path='/listingpage2' element={<ListingPage2 />} />
      <Route path='/listingpage3' element={<ListingPage3 />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/help-center' element={<HelpCenter/>} />
      <Route path='/services' element={<Services/>} />
    </Routes>

 
    </>
  )
}

export default App
