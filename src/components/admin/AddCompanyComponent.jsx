

import React from 'react'

function AddCompanyComponent() {
    return (
        <div className=''>
            <div className='flex justify-between text-sm my-3'>
                <div className='mr-4'>
                    <span className='text-gray-400'>Email</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='company@yandex.ru' />
                </div>
                <div>
                    <span className='text-gray-400'>Phone</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='+(8) 9656666666' />
                </div>
            </div>
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Country</p>
                <select value={'Russia'} name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'>
                    <option>Azerbaijan</option>
                    <option>Russia</option>
                    <option>Turkiye</option>
                </select>
            </div>
            <div className='text-sm'>
                <span className='text-gray-400'>Company Name</span>
                <input className='bg-gray-100 w-full mb-4 mt-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='Company Name...' />
            </div>
            <div className='opacity-70'>
                <button className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default AddCompanyComponent