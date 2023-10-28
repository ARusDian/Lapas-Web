import React from 'react'
import { Helmet } from 'react-helmet'

const DashboardIndex = () => {
  return (
    <div>
      <Helmet> 
        <title>Dashboard - LapasPanic</title>
      </Helmet>
      
      <div className="text-3xl font-bold">
        Welcome back, Admin!
      </div>
    </div>
  )
}

export default DashboardIndex