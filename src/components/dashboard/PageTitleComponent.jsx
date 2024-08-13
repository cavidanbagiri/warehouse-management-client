import React from 'react'

import temp_user_image from '../../assets/temp_user_image.jpeg'

function PageTitleComponent(props) {


    return (
        <div className='flex flex-col justify-between py-2 px-4 rounded-lg  mb-1 mx-8 '>

            <div className='text-center' >
                {/* <span className='text-[42px] font-bold my-3' >
                    Ustay Warehouse Management System
                </span> */}
            </div>

            <div className='flex flex-row  justify-between items-center mt-1'>
                <div className='flex flex-row items-center'>
                    <img className="w-20 h-20 rounded-full ring-1 ring-gray-300 dark:ring-gray-500" src={temp_user_image} alt="Large avatar"></img>
                    <div className='flex flex-col ml-6 px-1 '>
                        <span className='rounded-lg text-[30px] font-bold ' >Hello, Cavidan Bagirli</span>
                        <span className=' px-1 text-[20px] text-gray-500 '>Warehouse Manager</span>
                        {/* <span className='px-1 text-[12px] text-black'>(Ustay Moscow SRU Project)</span> */}
                    </div>
                </div>
                <div className='text-sm' style={{ fontWeight: 500 }}>
                    <button className='bg-indigo-500 text-white px-5 py-3 rounded-lg text-lg'>
                        Warehouse
                    </button>
                </div>
            </div>

        </div>
    )
}

export default PageTitleComponent