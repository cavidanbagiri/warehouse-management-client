import React from 'react'

import { TbSelect } from "react-icons/tb";

function CreateTableNavbarHeaderComponent() {
  return (
    <thead className="text-black bg-gray-100 border font-medium text-sm" >
          <tr>
            <th scope="col" className="px-2 py-3 text-center border">
              S/S
            </th>
            <th scope="col" className="flex items-center justify-center px-2 py-2 text-center border">
            <TbSelect />
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-medium ">
              <div className="">
                Date
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-medium ">
              <div className="">
                Company
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-medium ">
              <div className="">
                Document
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-1/3 font-medium ">
              <div className="">
                Material Name
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-medium ">
              <div className="">
                Type
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
              Qty
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-4 font-medium ">
              Unit
            </th>
            {/* <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
              Price
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-medium  w-28">
              Currency
            </th> */}
            <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
              Ordered
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
              PO
            </th>

          </tr>
        </thead>
  )
}

export default CreateTableNavbarHeaderComponent