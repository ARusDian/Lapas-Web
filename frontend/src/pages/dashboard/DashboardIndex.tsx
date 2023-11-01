import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const DashboardIndex = () => {
  return (
    <HelmetProvider>
      <Helmet> 
        <title>Dashboard - LapasPanic</title>
      </Helmet>
      
      <div className="text-3xl font-bold">
        Welcome back, Admin!
      </div>
    </HelmetProvider>
  )
}

export default DashboardIndex