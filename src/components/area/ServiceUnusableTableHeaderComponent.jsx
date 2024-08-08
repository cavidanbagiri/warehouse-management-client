

import React from 'react'

function ServiceUnusableTableHeaderComponent(props) {
  return (
    <thead className='text-sm bg-gray-100'>
        <tr>
            <th scope="col" className="px-6 py-3 text-center border">
                F
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                S/S
            </th>
            <th scope="col" className="px-6 py-3 text-center border min-w-96">
                Material Name
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Unit
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Amount
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Serial No
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Material ID
            </th>
            <th scope="col" className="px-6 py-3 text-center border ">
                Comment
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                PO
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Created
            </th>
            <th scope="col" className="px-6 py-3 text-center border">
                Date
            </th>
            {
                props.header_for === "unusable" &&
                <th scope="col" className="px-6 py-3 text-center border">
                    Price
                </th>
            }
            {
                props.header_for === "unusable" &&
                <th scope="col" className="px-6 py-3 text-center border">
                    Currency
                </th>
            }
        </tr>
    </thead>
  )
}

export default ServiceUnusableTableHeaderComponent