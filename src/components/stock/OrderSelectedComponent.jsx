
import { useDispatch, useSelector } from 'react-redux'

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PiWrenchLight } from "react-icons/pi";
import { AiOutlineSend } from "react-icons/ai";




import '../../css/dropdown.css';

import {
    setOrderSelectionReturnToggleTrue,
    setOrderSelectionUpdateToggleTrue,
    setOrderSelectionProvideToggleTrue,
    setOrderSelectionMaterialUnusableToggleTrue,
    setOrderSelectionMaterialServiceToggleTrue,
} from '../../store/stock-store.js';

import {rowInformToggleTrue} from '../../store/common-store.js';

import StockService from "../../services/stock-service.js";
import CommonService from '../../services/common.services.js';  

function OrderSelectedComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector((state) => state.stockSlice.selected_items)

    return (

        <div className="flex flex-row justify-center fixed bottom-10 mb-4 rounded-lg selected-row-animation">
            <div className="flex justify-between bg-white border rounded-md shadow-2xl">
                <div className="flex items-center">
                    <span className="bg-orange-500 py-4 px-6 text-white font-bold rounded-l-md text-2xl">{selected_items.length}</span>
                    <div className="mx-3">
                        <p style={{ fontWeight: 500 }} className='text-2xl'>Selected</p>
                    </div>
                </div>
                <div className="flex items-center  ml-[100px]">
                    {/* Inform Row Field */}
                    <div
                        onClick={() => {
                            if (selected_items.length > 1) {
                                props.showMessaggeBoxMessageHandle('inform', 'Cant get inform two or more column same time');
                            }
                            else {
                                dispatch(rowInformToggleTrue());
                                const data = {'module':'stock', 'id':selected_items[0]}
                                dispatch(CommonService.getRowInform(data));
                            }
                        }}
                        className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                        <IoIosInformationCircleOutline className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Get Inform</span>
                    </div>

                    {/* Provide Row Side */}
                    <div
                        onClick={() => {
                            if (selected_items.length === 0) {
                                showMessageBoxMessageHandle('provide', 'Please choose at least one column for provide to warehouse');
                            }
                            else {
                                dispatch(setOrderSelectionProvideToggleTrue());
                                dispatch(StockService.getDataByIds(selected_items));
                            }
                        }}
                        className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                        <AiOutlineSend className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Provide</span>
                    </div>

                    {/* Update Row Side */}
                    <div
                        onClick={() => {
                            if (selected_items.length > 1) {
                                props.showMessaggeBoxMessageHandle('update', 'Cant update two or more column same time');
                            }
                            else {
                                dispatch(setOrderSelectionUpdateToggleTrue());
                                dispatch(StockService.getById(selected_items[0]));
                            }
                        }}
                        className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                        <CiEdit className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Update Row</span>
                    </div>
                    {/* Delete Side */}
                    <div
                        onClick={() => {
                            props.showMessaggeBoxMessageHandle('delete', 'Dont have authorization for deleting');
                        }}
                        className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                        <MdDeleteOutline className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Delete Row</span>
                    </div>

                    {/* Return Warehouse Side */}
                    <div
                        onClick={() => {
                            if (selected_items.length === 0) {
                                props.showMessaggeBoxMessageHandle('returnstock', 'Please, Choose at least one row to adding stock');
                            }
                            else if (selected_items.length > 1) {
                                props.showMessaggeBoxMessageHandle('returnstock', 'Please, Max 1 Row can selected to return to warehouse');
                            }
                            else {
                                dispatch(setOrderSelectionReturnToggleTrue());
                                dispatch(StockService.getById(selected_items[0]));
                            }
                        }}
                        className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                        <BsArrowReturnLeft className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Return</span>
                    </div>

                    {/* Set unusable materials Side */}
                    <div
                        onClick={() => {
                            if (selected_items.length === 0) {
                                props.showMessaggeBoxMessageHandle('unusablematerial', 'Please, Choose at least one row to unusuable');
                            }
                            else if (selected_items.length > 1) {
                                props.showMessaggeBoxMessageHandle('unusablematerial', 'Please, Max 1 Row can selected to unusuable');
                            }
                            else {
                                dispatch(setOrderSelectionMaterialUnusableToggleTrue());
                                dispatch(StockService.getById(selected_items[0]));
                            }
                        }}
                        className="flex flex-col items-center mx-2 cursor-pointer w-full hover:bg-gray-50">
                        <IoIosCloseCircleOutline className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Set Unusable</span>
                    </div>

                    <div
                        onClick={() => {
                            if (selected_items.length === 0) {
                                props.showMessaggeBoxMessageHandle('servicematerial', 'Please, Choose at least one row to sending service');
                            }
                            else if (selected_items.length > 1) {
                                props.showMessaggeBoxMessageHandle('servicematerial', 'Please, Max 1 Row can selected to sending service');
                            }
                            else {
                                dispatch(setOrderSelectionMaterialServiceToggleTrue());
                                dispatch(StockService.getById(selected_items[0]));
                            }
                        }}
                        className="flex flex-col items-center mx-2 cursor-pointer w-full hover:bg-gray-50">
                        <PiWrenchLight className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Send Service</span>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default OrderSelectedComponent