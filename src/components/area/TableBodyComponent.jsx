
import { useSelector, useDispatch } from 'react-redux';

import TableRowComponent from './TableRowComponent'

import { selectRow, unselectRow } from '../../store/stock-store';

function TableBodyComponent() {

    const dispatch = useDispatch();
    const filtered_area_data = useSelector((state) => state.areaSlice.filtered_area_data);
    const area_column_filter = useSelector(state => state.areaSlice.area_column_filter);
    //const selected_items = useSelector(state => state.stockSlice.selected_items);
    const user_status = useSelector(state => state.userSlice.user_status);


    // const handleChange = (event) => {
    //     console.log('val is : ',event.target.value);
    //     event.target.checked ?
    //         dispatch(selectRow(event.target.value)) :
    //         dispatch(unselectRow(event.target.value))
    // }

    // const doubleClickInform = (po_id) => {
    //     dispatch(setOrderSelectionInformationToggleTrue());
    //     dispatch(WarehouseService.getPOById(po_id));
    // }

    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {
                filtered_area_data.map((item, index) => (
                    <TableRowComponent key={index + 1} index={index + 1} item={item}
                        user_status={user_status}
                        area_column_filter={area_column_filter}
                        //handleChange={handleChange}
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