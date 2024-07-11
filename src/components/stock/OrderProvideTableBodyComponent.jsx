
import { useSelector, useDispatch } from 'react-redux';

import OrderProvideTableRowComponent from './OrderProvideTableRowComponent';

function OrderProvideTableBodyComponent() {

    const dispatch = useDispatch();
    const selected_items = useSelector(state => state.stockSlice.selected_items);
    
    return (

        <tbody className='text-xs text-center' style={{ fontFamily: 'Roboto' }}>

            {
                selected_items.map((item, index) => (
                    <OrderProvideTableRowComponent key={index + 1} index={index + 1} item={item} />
                ))
            }

        </tbody>
    )
}

export default OrderProvideTableBodyComponent