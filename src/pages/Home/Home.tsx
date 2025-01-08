import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Hero } from './components/Hero'
import { NGOCards } from './components/NGOCards'
import Footer from './components/Footer'

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className='h-[100vh] lg:h-[85vh]'>
        <Hero />
      </div>
      <NGOCards />
      <Footer/>
    </>
  )
}
