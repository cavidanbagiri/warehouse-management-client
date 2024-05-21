import React from 'react'


import { CiHome } from "react-icons/ci";
import { PiWarehouseThin } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { PiStackThin } from "react-icons/pi";

function NavbarItemComponent(props) {
    return (
        <div className='relative text-white hover:bg-gray-100 px-[10px] py-[10px] flex items-center rounded-lg'>
            <span
                onMouseEnter={() => props.setIsShown(true)}
                onMouseLeave={() => props.setIsShown(false)}>
                {props.iconValue === 'Home' && <CiHome   className='text-black my-3 text-3xl' /> }
                {props.iconValue === 'Stock' && <PiStackThin  className='text-black my-3 text-3xl' /> }
                {props.iconValue === 'Create' && <CiSquarePlus  className='text-black my-3 text-3xl' /> }
                {props.iconValue === 'Warehouse' && <PiWarehouseThin className='text-black my-3 text-3xl' /> }
                {props.iconValue === 'Profile' && <CiUser  className='text-black my-3 text-3xl' /> }
            </span>
            {
                props.isShown && <span
                    style={{fontWeight: 600}}
                    className="duration-150 absolute top-3 left-10 ml-1 bg-slate-900 py-2 px-4 text-white border text-md rounded-md flex">
                    {props.iconValue}
                </span>
            }
            
        </div>
    )
}

export default NavbarItemComponent