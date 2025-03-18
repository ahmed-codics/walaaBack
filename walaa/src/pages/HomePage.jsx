import React from 'react'
import About from '../../../walaa/src/components/About'
import Booking from '../../../walaa/src/components/Booking'
import ContactUs from '../../../walaa/src/components/ContactUs'
import Header from '../../../walaa/src/components/Header'
import HealthPlans from '../../../walaa/src/components/HealthPlans'
import Modal from '../../../walaa/src/components/Modal'


const HomePage = () => {
  return (
    <div>
      <Header />
      <div id='about-section'>
      <About />
      </div>
      <HealthPlans />
      <Booking />
      <Modal />
    </div>
  )
}

export default HomePage
