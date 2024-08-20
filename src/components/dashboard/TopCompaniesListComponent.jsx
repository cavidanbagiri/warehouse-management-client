import React from 'react'
import { useSelector } from 'react-redux'

function TopCompaniesListComponent() {

  const top_companies = useSelector(state => state.commonSlice.top_companies);

  return (
    <div className='flex flex-col col-span-4 justify-between items-around bg-white rounded-xl my-5 mx-8 h-[750px] p-2'>
      <h2 className='text-center font-bold text-3xl'>Top Firmalar</h2>
      <ul className='p-2 font-medium'>
        {
          top_companies.map((el, index) => {
            return (
              <li key={el.id} className='my-2 border-b'>
                {el.company_name} 
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default TopCompaniesListComponent