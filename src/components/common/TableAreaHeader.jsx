


import React from 'react'

function TableAreaHeader() {
  return (
    <thead className='text-black bg-gray-200 border font-medium text-base'>
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                S/S
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Card Number
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Username
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Group Name
            </th>
        </tr>
    </thead>
  )
}

export default TableAreaHeader