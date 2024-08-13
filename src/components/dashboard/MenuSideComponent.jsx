import React from 'react'

import inventory_icon from '../../assets/inventory_icon.png';
import create_icon from '../../assets/create_icon.png';
import stock_icon from '../../assets/stock_icon.png';
import area from '../../assets/area.webp';
import profile from '../../assets/profile.png';

function MenuSideComponent() {
  return (
    <div className='flex flex-row w-full p-3 '>
      
      <div style={{fontWeight:600,}} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4  cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-3xl '>  
          Create Material
        </span>
        <img src={create_icon} className='w-24 h-24 p-3' alt="" />
        <hr className='my-1 text-black w-full' />
        <span className='w-full text-end text-sm text-gray-400' style={{fontWeight:400}}>
          Total Rows: 145
        </span>
      </div>
      <div style={{fontWeight:600,}} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-3xl '>  
          Warehouse
        </span>  
        <img src={inventory_icon} className='w-24 h-24 p-2' alt="" />
        <hr className='my-1 text-black w-full' />
        <span className='w-full text-end text-sm text-gray-400' style={{fontWeight:400}}>
          Total Rows: 145
        </span>
      </div>
      <div style={{fontWeight:600,}} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-3xl '>  
          Stock
        </span>  
        <img src={stock_icon} className='w-24 h-24 p-2' alt="" />
        <hr className='my-1 text-black w-full' />
        <span className='w-full text-end text-sm text-gray-400' style={{fontWeight:400}}>
          Total Rows: 145
        </span>
      </div>
      <div style={{fontWeight:600,}} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-3xl '>  
          Area
        </span>  
        <img src={area} className='w-24 h-24 p-1' alt="" />
        <hr className='my-1 text-black w-full' />
        <span className='w-full text-end text-sm text-gray-400' style={{fontWeight:400}}>
          Total Rows: 145
        </span>
      </div>

      <div style={{fontWeight:600,}} className='flex flex-col justify-around bg-white shadow-md items-center p-3 border rounded-xl w-1/4 mx-4 cursor-pointer hover:shadow-xl duration-300'>
        <span className='text-black text-3xl '>  
          Profile
        </span>  
        <img src={profile} className='w-24 h-24 p-2' alt="" />
        <hr className='my-1 text-black w-full' />
        <span className='w-full text-end text-sm text-gray-400' style={{fontWeight:400}}>
          Go To profile
        </span>
      </div>


    </div>
  )
}

export default MenuSideComponent