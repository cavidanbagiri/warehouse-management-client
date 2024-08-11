import React from 'react'

function TableHeaderComponent() {
  return (
    <thead  className="text-black bg-gray-200 border font-medium text-sm" >
    <tr>
      <th scope="col" className="px-6 py-2 text-center border">
        S/S
      </th>
      <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
        <div className="">
          Material Code
        </div>
      </th>
      <th scope="col" className="px-6 py-1 text-center border min-w-64 font-medium ">
        <div className="">
          Code Desription
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
      <th scope="col" className="px-6 py-1 text-center border min-w-28 font-medium ">
        Qty
      </th>
      <th scope="col" className="px-6 py-1 text-center border w-4 font-medium ">
        Unit
      </th>
      <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
        Price
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium  min-w-28">
        Total
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium min-w-24">
        PO No
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
        Certificate
      </th>
      <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
        Passport
      </th>

    </tr>
    </thead>
  )
}

export default TableHeaderComponent