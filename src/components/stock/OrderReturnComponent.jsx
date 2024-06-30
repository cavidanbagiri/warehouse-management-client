
import  { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {
    setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxTrue,
    setOrderUpdateErrorMessage,
    setOrderReturnMessageBoxTrue,
    setOrderReturnErrorMessage,
    setOrderSelectionReturnToggleFalse,
} from '../../store/stock-store.jsx';
import StockService from "../../services/stock-service.js";

import CustomLoadingButton from "../common/CustomLoadingButton.jsx";

function OrderUpdateComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.stockSlice.po_data);
    const order_return_pending = useSelector((state) => state.stockSlice.order_return_pending);

    const [material_name, setMaterialName] = useState('');
    const [qty, setQty] = useState(0);
    const [stock, setStock] = useState(0);
    const [return_amount, setReturnAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');


    const postFunc = () => {
        let updated_data = {
            id: po_data.id,
            warehouse_id: po_data.WarehouseModel.warehouse_id,
            return_amount: return_amount,
        };
        let cond = true;
        if(return_amount > po_data.stock){
            cond = false;
        }
        if(cond){
            dispatch(StockService.returnToWarehouse(updated_data));
            dispatch(setOrderUpdateErrorMessage({ message: 'Data Successfully Updated' }));
        }
        else{
            dispatch(setOrderReturnMessageBoxTrue());
            dispatch(setOrderReturnErrorMessage({ message: 'Entering Amount greater than stock' }));
        }

    }

    useEffect(() => {
        if (po_data?.WarehouseModel?.warehouse_id) {

            setMaterialName(po_data.WarehouseModel.material_name);
            //setMaterialType(po_data.type);
            setQty(po_data.qty);
            setStock(po_data.stock);
            // I Just define max stock, and need to show in ui side
            setReturnAmount(po_data.stock);
            //setPO(po_data.po);
            setUnit(po_data.WarehouseModel.unit);
            //setPrice(po_data.price);
            setSerialNumber(po_data.serial_number);
            setMaterialId(po_data.material_id);
        }
        else{
            console.log('else work')
        }

    },[po_data]);

    return (

        <div className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>
            <div className='w-1/2' ></div>
            <div className='flex flex-col bg-white w-1/2' >
                {/* Close and Title Component Section */}
                <div className='flex justify-between p-5 text-end'>
                    <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                        Order Return Section
                    </span>
                    <span
                        onClick={() => {
                            dispatch(setOrderSelectionReturnToggleFalse());
                        }}
                        className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                        <IoMdClose className='text-2xl' />
                    </span>
                </div>
                <div className='flex flex-col p-4 '>

                    {/* Material Name Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Material Name </span>
                        <div className='relative w-full flex justify-end'>
                            <span className={''}>
                                {material_name}
                            </span>
                        </div>
                    </div>

                    {/* Material Qty Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Quantity </span>
                        <div className='relative'>
                            {qty}
                        </div>
                    </div>

                    {/* Material Stock Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Stock </span>
                        <div className='relative'>
                            {stock}
                        </div>
                    </div>

                    {/* Material Stock Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Return Amount </span>
                        <div className='relative'>
                            <input type="number" value={return_amount}
                                   className={'border p-2'}
                                   onChange={(e) => {
                                setReturnAmount(e.target.value);
                            }}/>
                        </div>
                    </div>

                    {/* Matterial Type Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Unit </span>
                        <div className='relative'>
                            {unit}
                        </div>
                    </div>

                    {/* Serial Number Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Serial Number </span>
                        <div className='relative w-full'>
                            <div className='relative'>
                                {serial_number}
                            </div>
                        </div>
                    </div>

                    {/* Material ID Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Material ID </span>
                        <div className='relative w-full'>
                            <div className='relative'>
                                {material_id}
                            </div>
                        </div>
                    </div>


                    {/* Button Field */}
                    {
                        !order_return_pending ?
                    <div className='flex justify-end mt-10'>
                            <button onClick={postFunc}
                                    className='px-6 py-3 bg-green-500 rounded-lg text-white'>Post</button>
                    </div>
                        :
                            <CustomLoadingButton/>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderUpdateComponent