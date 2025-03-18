import React from 'react'

const Card = ({title , text}) => (
    <div>
        <div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    </div>
)

const About = () => {
  return (
<div className="hero bg-white min-h-screen">
  <div className="hero-content flex-col lg:flex-row gap-14">
    <img
      src="abtImg2.jpg"
      className="max-w-xs mt-10 rounded-lg shadow-2xl" />
          <img
      src="abtImg1.jpg"
      className="max-w-xs mb-10 rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold font-poppins text-black">About Our Wellness Platform</h1>
      <p className="py-6 text-black font-poppins">
      We're a passionate team dedicated to guiding you towards a life of vitality and well-being. With a deep commitment to holistic health, we merge expert knowledge with a personalized approach to empower your journey.
      </p>
      <button className="btn text-white bg-slate-900 rounded-full w-32 h-0 border-2 border-grey-900 hover:bg-white hover:w-34 hover:text-gray-900 hover:font-bold">View Doctors</button>
    </div>
  </div>
</div>
  )
}

export default About
