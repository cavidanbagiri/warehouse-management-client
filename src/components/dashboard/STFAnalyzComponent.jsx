import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

function STFAnalyzComponent() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userSlice.user);
  const type_count = useSelector(state => state.commonSlice.type_count);



  return (
    <div className='col-span-3 mr-8 h-[550px] bg-white rounded-xl'>
      <div className='flex flex-col items-start p-4 h-full'>
        <h2 className='w-full text-center font-bold text-3xl'>STF Analyz</h2>
        <div className='flex flex-col items-between justify-around  w-full h-full'>
          {
            type_count.length>0 ? type_count.map((item, index) => {
              return (
                <div key={index} className='flex items-center justify-between mt-2'>
                  <div className='w-[130px]'>
                    <div className='flex items-center justify-center border-[8px] border-indigo-500 rounded-full w-[70px] h-[70px]'>
                      <span className='font-medium'>{item.count}</span>
                    </div>
                  </div>
                  <div className='w-full'>
                    <span className='font-medium'>{item.type}</span>
                  </div>
                </div>
              )
            })
            :
            <div className='text-center'>
              <span className='text-gray-400 text-5xl font-bold'>No Data</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default STFAnalyzComponent