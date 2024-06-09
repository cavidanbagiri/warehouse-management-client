
import React, { useEffect, useState } from 'react'
import moment from 'moment';

import Checkbox from '@mui/material/Checkbox';
import {useSelector} from "react-redux";

function TableRowComponent(props) {
        const user_status = useSelector(state => state.userSlice.user_status);
    return (
        <tr className={`relative border-b hover:bg-gray-100 cursor-pointer `}>
            <td className='py-1'>
                {props.index}
            </td>
            <td className='py-1'>
            <Checkbox value={props.item.id} color="warning" size="small" onChange={props.handleChange} />
            </td>
            <td className={` text-center `} >
            {moment(props.item.date).format("YYYY.MM.DD")}
            
            </td>
            <td className={` text-start  pl-1`} >
            {props.item.company_name}
            </td>
            <td>
            {
                props.item.document === '' ? '-' : props.item.document
            }
            </td>
            <td className='text-start'>
                {props.item.material_name}
            </td>
            <td className='text-center px-1'>
            {props.item.type}
            </td>
            <td>
            {props.item.qty}
            </td>
            <td className=''>
            {props.item.unit.charAt(0).toUpperCase()+props.item.unit.slice(1)}
            </td>
                { (user_status === '10000' || user_status === '10001' || user_status === '10002' )  &&
                <>
            <td>
            {props.item.price}
            </td>
            <td>
            {props.item.currency.toUpperCase()}
            </td>
                </>

                }
            <td className='pl-1 text-center'>
             {props.item.firstName.charAt(0).toUpperCase()+props.item.firstName.slice(1)} {props.item.lastName.charAt(0).toUpperCase()+props.item.lastName.slice(1)}
            </td>
            <td>
            {
                props.item.po === '' ? '-' : props.item.po
            }
            </td>
        </tr>
    )
}

export default TableRowComponent