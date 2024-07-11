
import { useSelector, useDispatch } from 'react-redux';

import TableRowComponent from './TableRowComponent'

import {selectRow, unselectRow} from '../../store/stock-store';

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filter_stock_data = useSelector((state) => state.stockSlice.filter_stock_data);
    const stock_column_filter = useSelector(state => state.stockSlice.stock_column_filter);
    const selected_items = useSelector(state => state.stockSlice.selected_items);
    const user_status = useSelector(state => state.userSlice.user_status);


    const handleChange = (event) => {
        console.log('val is : ',event.target.value);
        event.target.checked ?
            dispatch(selectRow(event.target.value)) :
            dispatch(unselectRow(event.target.value))
    }

    // const doubleClickInform = (po_id) => {
    //     dispatch(setOrderSelectionInformationToggleTrue());
    //     dispatch(WarehouseService.getPOById(po_id));
    // }

    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {
                filter_stock_data.map((item, index) => (
                    <TableRowComponent key={index + 1} index={index + 1} item={item}
                                       handleChange={handleChange}
                                       user_status={user_status}
                                       stock_column_filter={stock_column_filter}
                                       //true_icon={true_icon}
                                       //false_icon={false_icon}
                                       //selected_items={selected_items}
                                       //doubleClickInform = {doubleClickInform}
                    />
                ))
            }

        </tbody>
    )
}

export default TableBodyComponent