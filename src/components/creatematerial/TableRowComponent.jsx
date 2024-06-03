
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addRow, updateRow } from '../../store/create_table-store';

import DropDownComponent from '../common/DropdownComponent';

function TableRowComponent(props) {

    const companies = useSelector((state) => state.commonSlice.companies);
    const projects = useSelector((state) => state.commonSlice.projects);
    const users = useSelector((state) => state.commonSlice.users);
    const dispatch = useDispatch();

    const [row, setRow] = useState({
        ss: props.index,
        date: '13-05-2024',
        projectId: 2,
        project_name: 'Moscow SRU',
        companyId: '',
        company_name: '',
        document: '',
        material_name: '',
        type: 'Consumable',
        qty: 0,
        unit: 'Pcs',
        price: 0,
        total: 0,
        currency: 'Rub',
        orderedId: '',
        ordered_name: '',
        po: '',
    });

    useEffect(() => {
        dispatch(addRow({ row: row }));
    })

    // Handle Company name in dropdown menu
    const listenCompany = (val, second_val) => {
        setRow((each) => ({
            ...each,
            companyId: val,
            company_name: second_val
        }));
        dispatch(updateRow({ ss: row.ss, name: 'companyId', value: val, second_name: 'company_name', second_val: second_val }));
        setIsCompanyDropDown(!isCompanyDropDown)
    }

    // Handle user name in dropdown menu
    const listenUser = (val, second_val) => {
        setRow((each) => ({
            ...each,
            orderedId: val,
            ordered_name: second_val
        }))
        dispatch(updateRow({ ss: row.ss, name: 'orderedId', value: val, second_name: 'ordered_name', second_val: second_val }));
        setIsUserDropDown(!isUserDropDown);
    }

    // Show Companies Dropdown
    const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    const [isUserDropDown, setIsUserDropDown] = useState(false);

    return (
        <tr className=' relative border-b'>
            <td className='py-4'>
                {row.ss}
            </td>
            <td>
            {row.project_name}
                {/* <select value={row.projectId} className='p-2  outline-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        projectId: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'projectId', value: event.target.value }))
                }}>
                    {projects.map((item) => (
                        <option key={item.id} value={item.id} >{item.project_name}</option>
                    ))}
                </select> */}
            </td>
            {/* <td className={` text-start  pl-1`} >
                <button className='' onClick={() => {
                    setIsCompanyDropDown(!isCompanyDropDown)
                }}>
                    {row.companyId === '' ? 'Select' : row.company_name}
                </button>
                {
                    isCompanyDropDown && <DropDownComponent
                        data={companies}
                        text_name={'company_name'}
                        input_name={'Company...'}
                        somefunc={listenCompany} />
                }
            </td> */}
            {/* <td>
                <input className="  outline-none  w-full h-full p-2 " type="text" placeholder="Doc Num..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            document: event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'document', value: event.target.value }))
                    }}
                />
            </td> */}
            <td>
                <input className=" outline-none  w-full h-full p-2 " type="text" placeholder="Material Name..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            material_name: event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'material_name', value: event.target.value }))
                    }} />
            </td>
            <td>
                <select defaultValue={'Consumable'} className=' p-2 outline-none text-gray-500 appearance-none hover:cursor-pointer' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        type: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'type', value: event.target.value }))
                }}>
                    <option value="Consumable">Consumable</option>
                    <option value="Project">Project</option>
                    <option value="Fixture">Fixture</option>
                    <option value="Safety">Safety</option>
                    <option value="Hand Tools">Hand Tools</option>
                </select>
            </td>
            <td>
                <input className="outline-none w-full h-full p-2 text-center" type="number" placeholder="Amount..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            qty: event.target.value,
                            total: row.price * event.target.value
                        }))
                        // dispatch(updateRow({ss:row.ss, qty:event.target.value}))
                        dispatch(updateRow({ ss: row.ss, name: 'qty', value: event.target.value }))
                    }} />
            </td>
            <td className=''>
                <select value={row.unit} className='  p-2 outline-none appearance-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        unit: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'unit', value: event.target.value }))
                }}>
                    <option value="pcs">Pcs</option>
                    <option value="ton">Ton</option>
                    <option value="kg">Kg</option>
                    <option value="lt">Lt</option>
                    <option value="mt">Mt</option>
                    <option value="mt2">Mt2</option>
                    <option value="mt3">Mt3</option>
                </select>
            </td>
            <td>
                <input className="outline-none w-full h-full p-2 text-center" type="number" placeholder="Price..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            price: event.target.value,
                            total: row.qty * event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'price', value: event.target.value }))
                    }} />
            </td>
            {/* <td>
                <select value={row.currency} className=' p-2 w-full outline-none appearance-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        currency: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'currency', value: event.target.value }))
                }}>
                    <option value="rub">Rub</option>
                    <option value="usd">USD</option>
                    <option value="azn">AZN</option>
                    <option value="tl">TL</option>
                    <option value="euro">EURO</option>
                </select>
            </td> */}
            <td>
                {/* {row.total} */}
                <span>{row.total.toFixed(2)}</span>
            </td>
            {/* <td className='text-start pl-1'>
                <button className='text-start pl-1' onClick={() => {
                    setIsUserDropDown(!isUserDropDown)
                }}>
                    {row.orderedId === '' ? 'Orderer' : row.ordered_name}
                </button>
                {
                    isUserDropDown && <DropDownComponent
                        data={users}
                        text_name={'username'}
                        input_name={'Orderer...'}
                        somefunc={listenUser} />
                }
            </td> */}
            <td>
                <input className="outline-none w-full h-full p-2 text-center" type="text" placeholder="STF No..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            po: event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'po', value: event.target.value }))
                    }} />
            </td>
        </tr>
    )
}

export default TableRowComponent