
import React from 'react'
import '../css/dropdown.css';

function MessageBox(props) {
  return (
    <div className={`z-20 fixed top-10 flex w-full justify-center message-box-animation`}>
        <div className= {` ${props.color} rounded-lg text-lg py-3 px-8 text-white shadow-xl`}>
        {props.message}
        </div>
    </div>
  )
}

export default MessageBox