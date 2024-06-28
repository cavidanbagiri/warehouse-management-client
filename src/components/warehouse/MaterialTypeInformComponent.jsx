import React from 'react'
import { GoProject } from "react-icons/go";

function MaterialTypeInform(props) {
    return (

        <div onClick={()=>{
            props.getTypeFilter(props.item.type);
        }} 
        className='flex flex-col items-center mr-4 hover:cursor-pointer'>
            <span className='text-gray-500 text-sm mb-1'>{props.item.type}</span>
            <div className={`flex items-center justify-center border-[8px] ${props.color} rounded-full w-[75px] h-[75px]`}>
                <span style={{ fontWeight: 700 }} className='text-xl'>{props.item.count}%</span>
            </div>
        </div>

    )
}

export default MaterialTypeInform