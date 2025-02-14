import React, { useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer'
import LoginNGOForm from './components/LoginNGOForm'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'

const LoginNGO = () => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);


  return (
    <div >
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[9999]">
          <span className="loader"></span>
        </div>
      )}
      <LoginNGOForm />
    </div>
  )
}

export default LoginNGO