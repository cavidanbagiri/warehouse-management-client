
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRow, addRow } from "../../store/stock-store";

function OrderProvideTableHeaderComponent(props) {

    const dispatch = useDispatch();

    const [row, setRow] = useState({
        id: props.item.id,
        ss: props.index,
        amount: props.item.stock,
        serial_number: props.item.serial_number,
        material_id: props.item.material_id,
    });

    useEffect(() => {
        dispatch(addRow({ row: row }));
    },[]);

    
    return (
        <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-white border font-medium text-sm" >
            <tr>
                <th scope="col" className="px-2 py-3 text-center border">
                    {props.index}
                </th>

                { /* Material name */
                    <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
                        <div className="">
                            {props.item.WarehouseModel?.material_name}
                        </div>
                    </th>
                }
                { /* Type */
                    <th scope="col" className="px-6 py-1 text-center border font-medium ">
                        <div className="">
                        {props.item.WarehouseModel?.type}
                        </div>
                    </th>
                }

                { /* Stock */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        {props.item.stock}
                    </th>
                }
                { /* Unit */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        {props.item.WarehouseModel?.unit}
                    </th>
                }
                { /* Serial No */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                         {props.item.serial_number}
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        {props.item.material_id}
                    </th>
                }


                { /* Amount */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">
                        <input onChange={
                            (event) => {
                                setRow((each) => ({
                                    ...each,
                                    amount: event.target.value
                                }))
                                dispatch(updateRow({ ss: row.ss, name: 'amount', value: event.target.value }));
                            }} 
                        type="number" value={row.amount} className="border bg-gray-100 p-2 w-full rounded-md outline-none" placeholder="Amount" />
                    </th>
                }

                { /* Serial number */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">
                        <input onChange={(event) => {
                                setRow((each) => ({
                                    ...each,
                                    serial_number: event.target.value
                                }))
                                dispatch(updateRow({ ss: row.ss, name: 'serial_number', value: event.target.value }));
                            }} 
                        type="text" value={row.serial_number} className="border bg-gray-100 p-2 w-full rounded-md outline-none" placeholder="Serial number" />
                    </th>
                }

                { /* Material id */
                    <th scope="col" className="p-1 text-center border font-medium min-w-32">
                        <input onChange={(event) => {
                                setRow((each) => ({
                                    ...each,
                                    material_id: event.target.value
                                }))
                                dispatch(updateRow({ ss: row.ss, name: 'material_id', value: event.target.value }));
                            }}  
                        type="text" value={row.material_id} className="border bg-gray-100 p-2 w-full rounded-md outline-none" placeholder="Material ID" />
                    </th>
                }

        
            </tr>
        </thead>
    )
}

export default OrderProvideTableHeaderComponent
