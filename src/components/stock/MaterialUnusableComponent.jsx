
import { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {
    setOrderMaterialUnusableMessageBoxTrue,
    setOrderMaterialUnusableErrorMessage,
    setOrderSelectionMaterialUnusableToggleFalse,
    setOrderMaterialUnusableColorCond,
} from '../../store/stock-store.js';
import StockService from "../../services/stock-service.js";

import CustomLoadingButton from "../common/CustomLoadingButton.jsx";
import SpinnerComponent from '../common/SpinnerComponent.jsx';

function MaterialUnusableComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.stockSlice.po_data);
    const po_data_pending = useSelector((state) => state.stockSlice.po_data_pending);

    const material_unusable = useSelector((state) => state.stockSlice.material_unusable);

    const [material_name, setMaterialName] = useState('');
    const [qty, setQty] = useState(0);
    const [stock, setStock] = useState(0);
    const [sending_amount, setSendingAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');
    const [comment, setComment] = useState('');


    const postFunc = () => {
        let sending_data = {
            id: po_data.id,
            amount: sending_amount,
            comments: comment,
        };
        let cond = true;
        // if (sending_amount > po_data.stock) {
        //     cond = false;
        // }
        if (cond) {
            dispatch(StockService.setUnusableMaterial(sending_data));
        }
        else {
            dispatch(setOrderMaterialUnusableMessageBoxTrue());
            dispatch(setOrderMaterialUnusableColorCond({ color: 'bg-red-500' }));
            dispatch(setOrderMaterialUnusableErrorMessage({ message: 'Entering Amount greater than stock' }));

        }
    }

    useEffect(() => {
        if (po_data?.WarehouseModel?.warehouse_id) {

            setMaterialName(po_data.WarehouseModel.material_name);
            //setMaterialType(po_data.type);
            setQty(po_data.qty);
            setStock(po_data.stock);
            // I Just define max stock, and need to show in ui side
            setSendingAmount(po_data.stock);
            //setPO(po_data.po);
            setUnit(po_data.WarehouseModel.unit);
            //setPrice(po_data.price);
            setSerialNumber(po_data.serial_number);
            setMaterialId(po_data.material_id);
        }

    }, [po_data]);


    return (

        <div className='flex justify-center items-center z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>

            <div className='flex flex-col h-2/3 rounded-lg bg-white w-1/3 ' >
                {/* Close and Title Component Section */}
                <div className='flex justify-between p-5 text-end'>
                    <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                        Material Unusable Section
                    </span>
                    <span
                        onClick={() => {
                            dispatch(setOrderSelectionMaterialUnusableToggleFalse());
                        }}
                        className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                        <IoMdClose className='text-2xl' />
                    </span>
                </div>

                {po_data_pending && <div className='flex justify-center w-full'><SpinnerComponent /></div>}

                {po_data && !po_data_pending &&
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
                            <span className='w-1/3'> Sending Amount </span>
                            <div className='relative'>
                                <input type="number" value={sending_amount}
                                    className={'border p-2'}
                                    onChange={(e) => {
                                        if (e.target.value <= stock && e.target.value >= 0) {
                                            setSendingAmount(e.target.value);
                                        }
                                        else if (e.target.value < 0) {
                                            dispatch(setOrderMaterialUnusableMessageBoxTrue());
                                            dispatch(setOrderMaterialUnusableColorCond({ color: 'bg-red-500' }));
                                            dispatch(setOrderMaterialUnusableErrorMessage({ message: 'Entering Amount greater than stock' }));
                                        }
                                        else {
                                            dispatch(setOrderMaterialUnusableMessageBoxTrue());
                                            dispatch(setOrderMaterialUnusableColorCond({ color: 'bg-red-500' }));
                                            dispatch(setOrderMaterialUnusableErrorMessage({ message: 'Entering Amount greater than stock' }));
                                        }
                                    }} />
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

                        <div className='flex flex-col mt-3'>
                            <span className='w-1/3'>Remarks </span>
                            <textarea className='border w-full h-32' onChange={(e) => {
                                setComment(e.target.value);
                            }}>

                            </textarea>
                        </div>


                        {/* Button Field */}
                        {
                            !material_unusable.pending ?
                                <div className='flex justify-end mt-10'>
                                    <button onClick={postFunc}
                                        className='px-6 py-3 bg-green-500 rounded-lg text-white w-full outline-none hover:bg-green-400 duration-300 text-lg'>Post</button>
                                </div>
                                :
                                <CustomLoadingButton />
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default MaterialUnusableComponent