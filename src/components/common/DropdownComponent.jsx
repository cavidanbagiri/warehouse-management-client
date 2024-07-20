
import React, { useEffect } from 'react'

function DropDownComponent(props) {

    return (
        <div style={{ fontFamily: 'Saira Condensed' }} className='absolute top-15 z-10 rounded-xl flex flex-col items-start bg-white border shadow-2xl max-h-96 overflow-hidden overflow-y-auto w-96'>
            <div className='flex flex-col w-full bg-white'>
                <div className='sticky top-0 p-4 bg-white'>
                    <input className=' w-full p-2 text-lg bg-gray-100 rounded-lg' type="text" placeholder={props.input_name} onChange={(event)=>{
                        props.filterChange(event, props.text_name)
                    }} />
                </div>
                <ul className='w-full px-4'>
                    {props.data.map((item) => (
                        <li className='text-lg text-start p-1 cursor-pointer hover:bg-gray-100'
                            onClick={(val) => {
                                props.listenFunc(val.target.id, val.target.innerText);
                            }} key={item.id} id={item.id} >
                            {item[props.text_name].charAt(0).toUpperCase()+item[props.text_name].slice(1)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DropDownComponent