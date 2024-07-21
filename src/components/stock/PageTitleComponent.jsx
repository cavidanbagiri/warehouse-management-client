import React from 'react'

function PageTitleComponent() {
  return (
        <div className='flex flex-col p-2 w-full'>
            <div className='flex flex-row w-full justify-between items-center bg-gray-50 rounded-lg px-4 mt-4 mb-3'>
                <span style={{ fontWeight: 500, fontFamily: 'IBM Plex Sans' }}
                    className='py-4 px-2 rounded-lg text-3xl text-start '>Stocked Material</span>
                <div className='text-sm' style={{ fontWeight: 500 }}>
                    <button className='bg-orange-500 text-white px-5 py-3 rounded-lg'>
                        Go To Warehouse
                    </button>
                </div>
            </div>
        </div>
  )
}

export default PageTitleComponent