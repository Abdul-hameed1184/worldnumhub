import React from 'react'
import Navbar from '../components/common/Navbar'
import Hero from '../components/homePage/Hero'
import Banner from '../components/homePage/Banner'
import HowItWorks from '../components/homePage/HowItWorks'
import Support from '../components/homePage/Support'
import CallToAction from '../components/homePage/CallToAction'
import Footer from '../components/homePage/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Banner/>
      <HowItWorks/>
      <Support/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default HomePage
