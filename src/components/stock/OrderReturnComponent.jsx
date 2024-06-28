
import { useEffect, useState } from 'react'
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
// import DropDownComponent from '../common/DropdownComponent';
// import { filterOrdered, filterCompany } from '../../store/common-store';
import StockService from "../../services/stock-service.js";

function OrderUpdateComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.stockSlice.po_data);
    //const selected_items = useSelector((state) => state.stockSlice.selected_items);
    //const order_update_message_box = useSelector((state) => state.warehouseSlice.order_update_message_box);
    //const filtered_companies = useSelector((state) => state.commonSlice.filtered_companies);
    //const filter_users = useSelector((state) => state.commonSlice.filter_users);


    // const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    // const [isUserDropDown, setIsUserDropDown] = useState(false);
    // const [documentnum, setDocumentNum] = useState('');
    // const [material_type, setMaterialType] = useState('');
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
                    {/* Company Section */}
                    {/*<div className='flex items-center justify-between'>*/}
                    {/*    <span className='w-1/3'>Company Name </span>*/}
                    {/*    <div className='relative'>*/}
                    {/*        <button className='text-xs bg-white border border-gray-300 w-96 rounded-lg p-2 text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {*/}
                    {/*            setIsCompanyDropDown(!isCompanyDropDown)*/}
                    {/*        }}>*/}
                    {/*            {company.companyId === '' ? 'Company' : company.company_name}*/}
                    {/*        </button>*/}
                    {/*        {*/}
                    {/*            isCompanyDropDown && <DropDownComponent*/}
                    {/*                data={filtered_companies}*/}
                    {/*                text_name={'company_name'}*/}
                    {/*                input_name={'Company...'}*/}
                    {/*                listenFunc={listenCompany}*/}
                    {/*                filterChange={filterChange}*/}
                    {/*            />*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Ordered Side */}
                    {/*<div className='flex items-center justify-between mt-3'>*/}
                    {/*    <span className='w-1/3'>Ordered Name </span>*/}
                    {/*    <div className='relative'>*/}
                    {/*        <button className='text-xs bg-white border border-gray-300 w-64 rounded-lg  p-2  text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {*/}
                    {/*            setIsUserDropDown(!isUserDropDown)*/}
                    {/*        }}>*/}
                    {/*            {ordered.orderedId === '' ? 'Orderer' : ordered.ordered_name}*/}
                    {/*        </button>*/}
                    {/*        {*/}
                    {/*            isUserDropDown && <DropDownComponent*/}
                    {/*                data={filter_users}*/}
                    {/*                text_name={'username'}*/}
                    {/*                input_name={'Orderer...'}*/}
                    {/*                listenFunc={listenUser}*/}
                    {/*                filterChange={filterChange}*/}
                    {/*            />*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* Doc Number Side */}
                    {/*<div className='flex items-center justify-between mt-3'>*/}
                    {/*    <span className='w-1/3'>Document Number </span>*/}
                    {/*    <div className='relative'>*/}
                    {/*        <input value={documentnum} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg p-2 outline-none text-center' type="text" placeholder='Document' onChange={(e) => {*/}
                    {/*            setDocumentNum(e.target.value);*/}
                    {/*        }} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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
                    <div className='flex justify-end mt-10'>
                        <button onClick={postFunc}
                                className='px-6 py-3 bg-green-500 rounded-lg text-white'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderUpdateComponent