
import moment from 'moment';


import Checkbox from '@mui/material/Checkbox';
import { BsThreeDotsVertical } from "react-icons/bs";
import {useState} from "react";

function TableRowComponent(props) {

    const [certificate, setCertificate] = useState(false);
    const [passport, setPassport] = useState(false);

    const [cert_opposite, setCertOpposite] = useState(false);
    const [passport_opposite, setPassportOpposite] = useState(false);

    const toggleOpposite = (name) => {
        console.log(name, ' and id is : ', props.item.id);
    }

    return (
        <tr  className={`relative border-b hover:bg-gray-100 cursor-pointer `}>
            <td className='py-1'>
                {props.index}
            </td>
            <td className='py-1'>
                <Checkbox value={props.item.id} color="warning" size="small" onChange={props.handleChange} />
            </td>
            {props.warehouse_column_filter.date &&
                <td className={` text-center `} >
                    {moment(props.item.date).format("YYYY.MM.DD")}
                </td>
            }
            {props.warehouse_column_filter.company &&
                <td className={` text-start  px-1`}>
                    {props.item.company_name}
                </td>
            }
            {
                props.warehouse_column_filter.document &&
                <td>
                    {props.item.document === '' ? '-' : props.item.document}
                </td>
            }
            {
                props.warehouse_column_filter.material_name &&
                <td className='text-start px-1'>
                    {props.item.material_name}
                </td>
            }
            {
                props.warehouse_column_filter.type &&
                <td className='text-center px-1'>
                    {props.item.type}
                </td>
            }
            {
                props.warehouse_column_filter.qty &&
                <td>
                    {props.item.qty}
                </td>
            }
            {
                props.warehouse_column_filter.unit &&
                <td className=''>
                    {props.item.unit.charAt(0).toUpperCase() + props.item.unit.slice(1)}
                </td>
            }
            {(props.user_status === '10000' || props.user_status === '10001' || props.user_status === '10002') &&
                <>
                    {
                        props.warehouse_column_filter.price &&
                        <td>
                            {props.item.price}
                        </td>
                    }
                    {
                        props.warehouse_column_filter.currency &&
                        <td>
                            {props.item.currency.toUpperCase()}
                        </td>
                    }
                </>

            }
            {
                props.warehouse_column_filter.ordered &&
                <td className='pl-1 text-center'>
                    {props.item.firstName.charAt(0).toUpperCase() + props.item.firstName.slice(1)} {props.item.lastName.charAt(0).toUpperCase() + props.item.lastName.slice(1)}
                </td>
            }
            {
                props.warehouse_column_filter.po &&
                <td>
                    {props.item.po === '' ? '-' : props.item.po}
                </td>
            }
            {
                props.warehouse_column_filter.certificate &&
                <td className=''
                    onMouseEnter={()=>{
                        setCertificate(true);
                    }}
                    onMouseLeave={()=>{
                        setCertificate(false);
                    }}
                >
                    <div className='relative flex items-center justify-between'>
                        {
                            props.item.certificate ?
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.true_icon} alt=""/>
                                </div>
                                :
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.false_icon} alt=""/>
                                </div>
                        }
                        {
                            certificate && <BsThreeDotsVertical className={`text-lg`}
                            onClick={()=>{
                                setCertOpposite(!cert_opposite);
                            }}
                            />
                        }
                        {
                            cert_opposite &&
                            <div className={`absolute flex justify-center top-5 right-1 p-1 w-40 rounded-lg bg-white z-10 shadow-lg border-b border-gray-200 `}>
                                <span onClick={toggleOpposite('certificate')}
                                    className={`hover:bg-gray-100 w-full p-2 rounded-lg text-base`}>
                                    Set Opposite
                                </span>
                            </div>
                        }
                    </div>
                </td>
            }
            {
                props.warehouse_column_filter.passport &&
                <td className='relative'
                    onMouseEnter={()=>{
                        setPassport(true);
                    }}
                    onMouseLeave={()=>{
                        setPassport(false);
                    }}>
                    <div className='relative flex items-center justify-between'>
                        {
                            props.item.passport ?
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.true_icon} alt=""/>
                                </div>
                                :
                                <div className='flex items-center justify-center w-full'>
                                    <img className='w-5 h-5' src={props.false_icon} alt=""/>
                                </div>
                        }
                        {
                            passport && <BsThreeDotsVertical className={`text-lg`}
                                                             onClick={()=>{
                                                                 setPassportOpposite(!passport_opposite);
                                                             }}
                            />
                        }
                        {
                            passport_opposite &&
                            <div className={`absolute flex justify-center top-5 right-1 p-1 w-40 rounded-lg bg-white z-10 shadow-lg border-b border-gray-200 `}>
                                <span onClick={toggleOpposite('passport')}
                                      className={`hover:bg-gray-100 w-full p-2 rounded-lg text-base`}>
                                    Set Opposite
                                </span>
                            </div>
                        }
                    </div>
                </td>
            }
        </tr>
    )
}

export default TableRowComponent