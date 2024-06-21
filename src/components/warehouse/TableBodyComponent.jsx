
import { useSelector, useDispatch } from 'react-redux';


import TableRowComponent from './TableRowComponent'

import {selectRow, setOrderSelectionInformationToggleTrue, unselectRow} from '../../store/warehouse-store';
import true_icon from '../../assets/true-icon.png';
import false_icon from '../../assets/false-icon.png';
import WarehouseService from "../../services/warehouse-service.js";

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filtered_warehouse_data = useSelector((state) => state.warehouseSlice.filtered_warehouse_data);
    const warehouse_column_filter = useSelector(state => state.warehouseSlice.warehouse_column_filter);
    const selected_items = useSelector(state => state.warehouseSlice.selected_items);
    const user_status = useSelector(state => state.userSlice.user_status);


    const handleChange = (event) => {
        event.target.checked ?
            dispatch(selectRow(event.target.value)) :
            dispatch(unselectRow(event.target.value))
    }

    const doubleClickInform = (po_id) => {
        dispatch(setOrderSelectionInformationToggleTrue());
        dispatch(WarehouseService.getPOById(po_id));
    }

    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {
                filtered_warehouse_data.map((item, index) => (
                    <TableRowComponent key={index + 1} index={index + 1} item={item}
                                       handleChange={handleChange}
                                       user_status={user_status}
                                       warehouse_column_filter={warehouse_column_filter}
                                       true_icon={true_icon}
                                       false_icon={false_icon}
                                       selected_items={selected_items}
                                       doubleClickInform = {doubleClickInform}
                    />
                ))
            }

        </tbody>
    )
}

export default TableBodyComponent