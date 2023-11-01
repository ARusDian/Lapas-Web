import React from 'react'
import { Helmet } from 'react-helmet-async'

const DashboardIndex = () => {
  return (
    <>
      <Helmet> 
        <title>Dashboard - LapasPanic</title>
      </Helmet>
      
      <div className="text-3xl font-bold">
        Welcome back, Admin!
      </div>
    </>
  )
}

export default DashboardIndex