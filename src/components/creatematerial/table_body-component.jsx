import React, { useState } from 'react'
import TableRowComponent from './table_row-component'
import { useSelector, useDispatch } from 'react-redux';
function TableBodyComponent() {

    const table = useSelector((state) => state.createTableSlice.table);
    const table_check = useSelector((state) => state.createTableSlice.table_check);
    const table_size = useSelector((state) => state.createTableSlice.table_size);
    // let [some, setSome] = useState([]) ;
    // console.log('table size : ', table_size);
    // for (let i in 1) {
    //     setSome([...some, i]);
    //     console.log('work');
    // }
    // console.log('some length : ', some.length);
    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {/* {some.length === 0 ? <TableRowComponent index={1} /> : table.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} />
            ))} */}

            {/* {some.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} />
            ))} */}

            {/* {table.length === 0 ? <TableRowComponent index={1} /> : table.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} />
            ))} */}

            {/* {table_check.length === 0 ? <TableRowComponent index={1} /> : table_check.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} />
            ))} */}

            {table_check.map((item, index) => (
                <TableRowComponent key={index + 1} index={index + 1} />
            ))}

        </tbody>
    )
}

export default TableBodyComponent