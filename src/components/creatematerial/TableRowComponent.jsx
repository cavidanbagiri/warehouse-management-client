
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { addRow, updateRow } from '../../store/create_table-store';

function TableRowComponent(props) {

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

    return (
        <tr className=' relative border-b'>
            <td className='py-4'>
                {row.ss}
            </td>
            <td>
            {row.project_name}
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

            <td>
                {/* {row.total} */}
                <span>{row.total.toFixed(2)}</span>
            </td>

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