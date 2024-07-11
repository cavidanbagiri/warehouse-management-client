
import moment from 'moment';


import Checkbox from '@mui/material/Checkbox';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function TableRowComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector(state => state.stockSlice.selected_items);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(selected_items.length === 0){
            setChecked(false);
        }
    }, [selected_items]);

    return (
        <tr
            onDoubleClick={()=>{
                props.doubleClickInform(props.item.id)
            }}
            className={`relative border-b hover:bg-gray-100 cursor-pointer `}>
            <td className='py-1'>
                {props.index}
            </td>
            <td className='py-1'>
                <Checkbox value={props.item.id} color="warning" size="small" onChange={props.handleChange}
                          onClick={(event)=>{
                              event.target.checked ? setChecked(true) : setChecked(false);
                          }}
                          checked={checked} />
            </td>
            {props.stock_column_filter.date &&
                <td className={` text-center `} >
                    {moment(props.item.date).format("YYYY.MM.DD")}
                </td>
            }
            {props.stock_column_filter.company &&
                <td className={` text-start  px-1`}>
                    {props.item.company_name}
                </td>
            }
            {
                props.stock_column_filter.document &&
                <td>
                    {props.item.document === '' ? '-' : props.item.document}
                </td>
            }
            {
                props.stock_column_filter.material_name &&
                <td className='text-start px-1'>
                    {props.item.material_name}
                </td>
            }
            {
                props.stock_column_filter.type &&
                <td className='text-center px-1'>
                    {props.item.type}
                </td>
            }
            {
                props.stock_column_filter.qty &&
                <td>
                    {props.item.qty}
                </td>
            }
            {
                props.stock_column_filter.stock &&
                <td>
                    {props.item.stock}
                </td>
            }
            {
                props.stock_column_filter.unit &&
                <td className=''>
                    {props.item.unit.charAt(0).toUpperCase() + props.item.unit.slice(1)}
                </td>
            }
            {(props.user_status === '10000' || props.user_status === '10001' || props.user_status === '10002') &&
                <>
                    {
                        props.stock_column_filter.price &&
                        <td>
                            {props.item.price}
                        </td>
                    }
                    {
                        props.stock_column_filter.currency &&
                        <td>
                            {props.item.currency.toUpperCase()}
                        </td>
                    }
                </>

            }
            {
                props.stock_column_filter.serial_number &&
                <td>
                    {props.item.serial_number.trim().length === 0 ? '-' : props.item.serial_number.trim() }
                </td>
            }
            {
                props.stock_column_filter.material_id &&
                <td>
                    {props.item.material_id.trim().length === 0 ? '-' : props.item.material_id.trim()  }
                </td>
            }
            {
                props.stock_column_filter.ordered &&
                <td className='pl-1 text-center'>
                    {props.item.firstName.charAt(0).toUpperCase() + props.item.firstName.slice(1)} {props.item.lastName.charAt(0).toUpperCase() + props.item.lastName.slice(1)}
                </td>
            }
            {
                props.stock_column_filter.group &&
                <td className='pl-1 text-center'>
                    {props.item.group_name.charAt(0).toUpperCase() + props.item.group_name.slice(1)}
                </td>
            }
            {
                props.stock_column_filter.po &&
                <td>
                    {props.item.po === '' ? '-' : props.item.po}
                </td>
            }

        </tr>
    )
}

export default TableRowComponent