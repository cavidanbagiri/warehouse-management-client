
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';


import WarehouseService from '../../services/warehouse-service';

import TableRowComponent from './TableRowComponent'

import { selectRow, unselectRow } from '../../store/warehouse-store';

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filtered_warehouse_data = useSelector((state) => state.warehouseSlice.filtered_warehouse_data);

    const handleChange = (event) => {
        event.target.checked ?
            dispatch(selectRow(event.target.value)) :
            dispatch(unselectRow(event.target.value))
    }

    useState(() => {
        dispatch(WarehouseService.fetchWarehouseData());
    }, [filtered_warehouse_data])


    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {
                filtered_warehouse_data.map((item, index) => (
                    <TableRowComponent key={index + 1} index={index + 1} item={item} handleChange={handleChange} />
                ))
            }

        </tbody>
    )
}

export default TableBodyComponent