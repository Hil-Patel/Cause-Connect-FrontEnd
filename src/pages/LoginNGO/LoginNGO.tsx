import React from 'react'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import LoginNGOForm from './components/LoginNGOForm'

const LoginNGO = () => {
  return (
    <div className=''>
        <Navbar/>
        <LoginNGOForm/>
        <Footer/>
    </div>
  )
}

export default LoginNGO