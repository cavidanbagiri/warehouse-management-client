import React from 'react'

function ErrorMessage(props) {
  return (
    <div className='z-20 fixed top-10 flex w-full justify-center'>
        <div className='bg-slate-700 text-2xl py-3 px-8 text-white shadow-xl'>
        Message {props.message}
        </div>
    </div>
  )
}

export default ErrorMessage