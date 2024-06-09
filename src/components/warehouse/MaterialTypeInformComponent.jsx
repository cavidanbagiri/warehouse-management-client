import React from 'react'
import { GoProject } from "react-icons/go";

function MaterialTypeInform(props) {
    return (
        // <div className='flex flex-col border mx-3 w-full justify-between'>
        //     <div className='flex items-center px-3 py-4 '>
        //         <div className={`p-2 bg-${props.color}-500 rounded-full`}>
        //             <GoProject className='text-2xl text-white' />
        //         </div>
        //         <div className='flex flex-col items-start ml-4'>
        //             <span style={{ fontWeight: 600 }} className=' text-black text-xl'>{props.item.type} Type</span>
        //             <span className='text-gray-500 text-md'>Material Types</span>
        //         </div>
        //     </div>
        //     <div className='border-b'>

        //     </div>
        //     <div className='flex items-center justify-between p-3 '>
        //     <span style={{ fontWeight: 700 }} className='text-3xl'>{props.item.count+10} <span className='text-lg text-gray-500 font-medium'>Pcs</span></span>
        //         <div className={`flex items-center justify-center border-[6px] ml-12 border-${props.color}-400 rounded-full w-14 h-14`}>
        //             <span style={{ fontWeight: 700 }} className='flex items-center text-lg'>{props.item.count}
        //                 <span className='text-md'>%</span>
        //             </span>
        //         </div>
        //     </div>
        // </div>

        <div onClick={()=>{
            props.getTypeFilter(props.item.type);
        }} 
        className='flex flex-col items-center mr-8 hover:cursor-pointer'>
            <span className='text-gray-500 text-xs mb-1'>{props.item.type}</span>
            <div className={`flex items-center justify-center border-[8px] ${props.color} rounded-full w-16 h-16`}>
                <span style={{ fontWeight: 700 }} className='text-lg'>{props.item.count+10}</span>
            </div>
        </div>

    )
}

export default MaterialTypeInform