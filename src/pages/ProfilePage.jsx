import React from 'react'

import under_construction from '../assets/under_construction.png'

function ProfilePage() {
  return (
    <div className='flex flex-col h-screen bg-gray-100 text-gray-400 font-medium items-center justify-center '>
        <span className='text-8xl'>
            Under The Construction
        </span>
        <img src={under_construction} className='w-80 h-80 mt-10' alt="" />
    </div>
  )
}

export default ProfilePage