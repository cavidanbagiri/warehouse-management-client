
import React from 'react'
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div style={{ fontFamily: "Saira Condensed", fontSize: '24px' }} className=' w-screen h-screen' >
      Welcome Back Jack
      <br />
      <Link to="/profile">Go profile</Link>
    </div>
  )
}

export default DashboardPage