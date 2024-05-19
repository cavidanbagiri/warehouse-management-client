import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import AddCompanyComponent from '../components/admin/AddCompanyComponent';
import AddOrderedComponent from '../components/admin/AddOrderedComponent';


function AdminModal(props) {
    return (
        <div style={{ fontFamily: 'IBM Plex Sans', fontWeight: 500 }} className='flex justify-center items-center bg-black fixed w-full h-full bg-opacity-30 z-10'>
            <div className='flex flex-col bg-white px-8 py-6 w-1/3  rounded-xl'>
                <div className='flex justify-between items-center mb-6'>
                    <span className='text-2xl'>{props.title}</span>
                    <IoCloseSharp className='text-2xl text-gray-500 hover:bg-gray-100 hover:cursor-pointer rounded-md ' onClick={()=>{
                        props.closeModal();
                    }} />
                </div>
                {
                    props.show_component === 'company' ? <AddCompanyComponent/> : <AddOrderedComponent/>
                    // props.show_component === 'company' ? 'company' : 'ordered'
                }
                {/* <AddCompanyComponent/> */}
            </div>
        </div>
    )
}

export default AdminModal