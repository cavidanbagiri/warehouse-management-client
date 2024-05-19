

import React from 'react'

function AddOrderedComponent() {
  return (
    <div className=''>
            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>Email</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='@gmail.com' />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Phone</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='+(8) 9656666666' />
                </div>
            </div>
            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>First name</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Last name</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' />
                </div>
            </div>
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Group</p>
                <select value={'Russia'} name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'>
                    <option>Construction</option>
                    <option>Piping</option>
                    <option>Welding</option>
                    <option>Steel Structure</option>
                    <option>HSE</option>
                    <option>Adminstration</option>
                    <option>Warehouse</option>
                    <option>Procurement</option>
                    <option>Hydro Test</option>
                    <option>Mechanic</option>
                    <option>Electric</option>
                </select>
            </div>
            <div className='opacity-70'>
                <button className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                    Confirm
                </button>
            </div>
        </div>
  )
}

export default AddOrderedComponent