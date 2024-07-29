import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TableHeaderComponent from '../components/area/TableHeaderComponent.jsx'
import TableBodyComponent from '../components/area/TableBodyComponent.jsx'
import TableColumnFilterComponent from '../components/area/TableColumnFilterComponent.jsx'
import PageTitleComponent from '../components/area/PageTitleComponent.jsx'
import FilterComponent from '../components/area/FilterComponent.jsx'
import ZeroFilteredComponent from '../components/warehouse/ZeroFilteredComponent.jsx'
import OrderSelectedComponent from '../components/area/OrderSelectedComponent.jsx'
import OrderUpdateComponent from '../components/area/OrderUpdateComponent.jsx'
import OrderReturnComponent from '../components/area/OrderReturnComponent.jsx'
import MessageBox from '../layouts/MessageBox.jsx'

import AreaService from '../services/area-service';

import {
    setOrderSelectionUpdateToggleTrue,  setOrderUpdateMessageBoxFalse,
    setOrderSelectionReturnToggleTrue, setOrderReturnMessageBoxFalse,
} from '../store/area-store.js';

import { IoFilterOutline } from "react-icons/io5";

import { clearSelected } from '../store/area-store.js';

function AreaPage() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const filtered_area_data = useSelector((state) => state.areaSlice.filtered_area_data);

    const selected_items = useSelector((state) => state.areaSlice.selected_items);

    const order_update = useSelector((state) => state.areaSlice.order_update);
    const order_return = useSelector((state) => state.areaSlice.order_return);

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);

    const [show_message_box, setShowMessageBox] = useState(false);
    const [show_message_box_message, setShowMessageBoxMessage] = useState('');

    const showMessageBoxMessageHandle = (key, value) => {
        if (key === 'update') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'return') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
    }

    const clearFilter = () => {
        dispatch(AreaService.fetchAreas(user.projectId));
    }

    useEffect(() => {
        dispatch(AreaService.fetchAreas(user.projectId));
    }, []);

    useEffect(() => {
        if (show_message_box) {
            setTimeout(() => {
                setShowMessageBox(false);
            }, 2000)
        }
    }, [show_message_box])

    useEffect(() => {
        if (order_update.order_update_message_box) {
            setTimeout(() => {
                dispatch(setOrderUpdateMessageBoxFalse());
            }, 2000)
        }
    }, [dispatch, order_update.order_update_message_box])
    
    useEffect(() => {
        if (order_return.order_return_message_box) {
            setTimeout(() => {
                dispatch(setOrderReturnMessageBoxFalse());
            }, 2000)
        }
    }, [dispatch, order_return.order_return_message_box])

    return (
        <div className='flex flex-col items-center'>

            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
            }

            {
                order_update.order_update_toggle && <OrderUpdateComponent />
            }
            {
                order_update.order_update_message_box &&
                <MessageBox message={order_update.order_update_error_message} color={order_update.order_update_color_cond} />
            }

            {
                order_return.order_return_toggle && <OrderReturnComponent />
            }
            {
                order_return.order_return_message_box &&
                <MessageBox message={order_return.order_return_error_message} color={order_return.order_return_color_cond} />
            }

            {/* Page Title */}
            <PageTitleComponent />


            {/* Material Type and Button Section */}
            <div className='flex flex-col justify-start px-3 w-full'>

                {/* Title Section */}

                {/* <span style={{ fontWeight: 500, fontFamily: 'IBM Plex Sans' }} className='px-2 text-2xl text-start  '>Material Type Information</span> */}

                <div className={'flex  w-full  '}>

                    {/* Button Section */}
                    <div className='flex flex-col justify-between items-start w-full '>

                        {/* Working Buttons Section */}
                        <div className='flex justify-end text-xs w-full' style={{ fontWeight: 600 }}>

                            {/* Return Row  */}
                            <button onClick={() => {
                                if (selected_items.length > 1) {
                                    showMessageBoxMessageHandle('return', 'Cant return two or more column same time');
                                }
                                else if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('return', 'Please choose at least one column for returning to stock');
                                }
                                else {
                                    dispatch(setOrderSelectionReturnToggleTrue());
                                    dispatch(AreaService.getById(selected_items[0]));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Return</button>


                            {/* Update Row  */}
                            <button onClick={() => {
                                if (selected_items.length > 1) {
                                    showMessageBoxMessageHandle('update', 'Cant update two or more column same time');
                                }
                                else if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('update', 'Please choose at least one column');
                                }
                                else {
                                    dispatch(setOrderSelectionUpdateToggleTrue());
                                    dispatch(AreaService.getById(selected_items[0]));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Update</button>


                            {/* Clear Filter */}
                            <button onClick={() => {
                                dispatch(clearFilter);
                            }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Clear Filter</button>

                            {/* Clear Selected  */}
                            <button onClick={() => {
                                dispatch(clearSelected());
                            }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Reset Select</button>

                        </div>


                    </div>

                </div>
            </div>

            {/* Table Column Filter */}
            <div className='flex justify-end items-center relative text-xs w-full px-4 my-4' style={{ fontWeight: 600 }}>
                <span onClick={() => {
                    show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                }}
                    className='text-sm font-medium text-gray-700 ml-2 hover:cursor-pointer'>Table Columns Filter</span>
                <span onClick={() => {
                    show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                }}
                    className='pl-2'><IoFilterOutline className='text-base hover:cursor-pointer' /></span>
                {
                    show_table_column_component && <TableColumnFilterComponent />
                }
            </div>


            <FilterComponent />


            {/* Table Section */}
            <table className='w-full'>
                <TableHeaderComponent />
                <TableBodyComponent />
            </table>

            {
                !filtered_area_data.length && <ZeroFilteredComponent resetFunc={clearFilter} />
            }

            {/* Row Selected Section */}
            {
                selected_items.length >= 1 ? <OrderSelectedComponent showMessaggeBoxMessageHandle={showMessageBoxMessageHandle} /> : <div></div>
            }

        </div>
    )
}

export default AreaPage