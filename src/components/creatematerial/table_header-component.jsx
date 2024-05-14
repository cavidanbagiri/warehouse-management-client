import React from 'react'

function CreateTableNavbarHeaderComponent() {
  return (
    <thead className="text-gray-100 bg-slate-700 border text-sm font-thin" >
          <tr>
            <th scope="col" className="px-6 py-2 text-center border font-thin">
              S/S
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-thin">
              <div className="">
                Date
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-thin">
              <div className="">
                Project
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-thin">
              <div className="">
                Company
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-thin">
              <div className="">
                Document
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-1/3 font-thin">
              <div className="">
                Material Name
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border font-thin">
              <div className="">
                Type
              </div>
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-4 font-thin">
              Qty
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-4 font-thin">
              Unit
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-4 font-thin">
              Price
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-4 font-thin">
              Currency
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-8 font-thin">
              Total
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-8 font-thin">
              Ordered
            </th>
            <th scope="col" className="px-6 py-1 text-center border w-8 font-thin">
              PO
            </th>

          </tr>
        </thead>
  )
}

export default CreateTableNavbarHeaderComponent