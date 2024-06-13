
import React from 'react'
import { useDispatch } from 'react-redux'
import WarehouseService from '../../services/warehouse-service';



function ZeroFilteredComponent(props) {

    const dispatch = useDispatch();

    return (
        <div className='flex flex-col w-full h-96 items-center justify-center'>
            <span style={{ fontWeight: 500 }} className='text-4xl text-gray-500'>
                There is not any data
            </span>
            <button className='border p-3 my-5 rounded-lg bg-gray-50 hover:bg-gray-100 duration-200'
                onClick={() => {
                    dispatch(WarehouseService.fetchWarehouseData());
                    props.resetFunc();
                }}
            >
                Clear Filter
            </button>
        </div>
    )
}

export default ZeroFilteredComponent