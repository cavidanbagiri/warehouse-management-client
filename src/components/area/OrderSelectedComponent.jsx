
import { useDispatch, useSelector } from 'react-redux'

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";

import '../../css/dropdown.css';

import {
    setOrderSelectionUpdateToggleTrue,  setOrderSelectionReturnToggleTrue,
} from '../../store/area-store.js';


import AreaService from "../../services/area-service.js";

function OrderSelectedComponent(props) {

    const dispatch = useDispatch();

    const selected_items = useSelector((state) => state.areaSlice.selected_items)

    return (

        <div className="flex flex-row justify-center fixed bottom-10 mb-4 rounded-lg selected-row-animation">
            <div className="flex justify-between bg-white border rounded-md shadow-2xl">
                <div className="flex items-center">
                    <span className="bg-orange-500 py-4 px-6 text-white font-bold rounded-l-md text-2xl">{selected_items.length}</span>
                    <div className="mx-3">
                        <p style={{fontWeight:500}} className='text-2xl'>Selected</p>
                    </div>
                </div>
                <div className="flex items-center  ml-[100px]">

                    {/* Update Row Side */}
                    <div 
                    onClick={()=>{
                        if(selected_items.length > 1){
                            props.showMessaggeBoxMessageHandle('update', 'Cant update two or more column same time');
                        }
                        else{
                            dispatch(setOrderSelectionUpdateToggleTrue());
                            dispatch(AreaService.getById(selected_items[0]));
                        }
                    }}
                    className="flex flex-col items-center mx-3 cursor-pointer hover:bg-gray-50">
                        <CiEdit className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Update Row</span>
                    </div>

                    
                    {/* Return Stock Side */}
                    <div
                        onClick={()=>{
                            if(selected_items.length === 0){
                                props.showMessaggeBoxMessageHandle('returnstock', 'Please, Choose at least one row to adding stock');
                            }
                            else if(selected_items.length > 1){
                                props.showMessaggeBoxMessageHandle('returnstock', 'Please, Max 1 Row can selected to return to warehouse');
                            }
                            else{
                                dispatch(setOrderSelectionReturnToggleTrue());
                                dispatch(AreaService.getById(selected_items[0]));
                            }
                        }}
                    className="flex flex-col items-center mx-3 cursor-pointer w-full hover:bg-gray-50">
                        <BsArrowReturnLeft className='text-2xl text-gray-800' />
                        <span className="text-xs w-20 text-center">Return</span>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default OrderSelectedComponent