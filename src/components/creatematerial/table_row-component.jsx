import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addRow, updateRow } from '../../store/create_table-store';

function TableRowComponent(props) {

    const companies = useSelector((state) => state.commonSlice.companies);
    const projects = useSelector((state) => state.commonSlice.projects);  
    const users = useSelector((state) => state.commonSlice.users);  
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();

    const [row, setRow] = useState({
        ss: props.index,
        date: '13-05-2024',
        project: '',
        company: '',
        document: '',
        material_name: '',
        type: '',
        qty: 1,
        unit: '',
        price: 0,
        total: 0,
        currency: '',
        ordered: '',
        po: '',
    });

    useEffect(() => {
        dispatch(addRow({ row: row }));
    })

    return (
        <tr className='border-b'>
            <td>
                {row.ss}
            </td>
            <td>
                {/* {Date.now()} */}
                {row.date}
            </td>
            <td>
                <select className='p-2  outline-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        project: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'project', value: event.target.value }))
                }}>
                    {projects.map((item) => (
                        <option key={item.id} value={item.id} >{item.project_name}</option>

                    ))}
                </select>
            </td>
            <td>
                <select className='  p-2 outline-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        company: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'company', value: event.target.value }))
                }}>
                    {companies.map((item) => (
                        <option key={item.id} value={item.id} >{item.company_name}</option>

                    ))}
                </select>
            </td>
            <td>
                <input className="  outline-none  w-full h-full p-2 " type="text" placeholder="Doc Num..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            document: event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'document', value: event.target.value }))
                    }}
                />
            </td>
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
                <select className=' p-2 outline-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        type: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'type', value: event.target.value }))
                }}>
                    <option value="project">Project</option>
                    <option value="consumable">Consumable</option>
                    <option value="fixture">Fixture</option>
                </select>
            </td>
            <td>
                <input className="  outline-none  w-full h-full p-2 " type="text" placeholder="Amount..." onChange={
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
                <select className='  p-2 outline-none' onChange={(event) => {
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
                <input className="  outline-none  w-full h-full p-2 " type="number" placeholder="Price..." onChange={
                    (event) => {
                        setRow((each) => ({
                            ...each,
                            price: event.target.value,
                            total: row.qty * event.target.value
                        }))
                        dispatch(updateRow({ ss: row.ss, name: 'price', value: event.target.value }))
                    }} />
            </td>
            <td>
                <select className=' p-2 w-full outline-none' onChange={(event) => {
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
            </td>
            <td>
                {/* {row.total} */}
                <span>{row.total}</span>
            </td>
            <td>
                <select className=' outline-none' onChange={(event) => {
                    setRow((each) => ({
                        ...each,
                        ordered: event.target.value
                    }))
                    dispatch(updateRow({ ss: row.ss, name: 'ordered', value: event.target.value }))
                }}>
                    {users.map((item) => (
                        <option key={item.id} value={item.id} >
                            {item.firstName.charAt(0).toUpperCase()+item.firstName.slice(1)} {item.lastName.charAt(0).toUpperCase()+item.lastName.slice(1)}</option>
                    ))}
                </select>
            </td>
            <td>
                <input className="outline-none  w-full h-full p-2 " type="text" placeholder="STF No..." onChange={
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