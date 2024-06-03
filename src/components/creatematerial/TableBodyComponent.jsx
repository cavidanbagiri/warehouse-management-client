import React, { useState } from 'react'
import TableRowComponent from './TableRowComponent'
import { useSelector, useDispatch } from 'react-redux';
function TableBodyComponent() {

    const table_check = useSelector((state) => state.createTableSlice.table_check);
   
    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {table_check.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} />
            ))}

        </tbody>
    )
}

export default TableBodyComponent