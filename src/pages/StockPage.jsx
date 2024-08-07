
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import TableHeaderComponent from "../components/stock/TableHeaderComponent.jsx";
import TableBodyComponent from "../components/stock/TableBodyComponent.jsx";
import TableColumnFilterComponent from "../components/stock/TableColumnFilterComponent.jsx";
import FilterComponent from "../components/stock/FilterComponent.jsx";
import OrderSelectedComponent from "../components/stock/OrderSelectedComponent.jsx";
import MessageBox from "../layouts/MessageBox.jsx";
import OrderUpdateComponent from "../components/stock/OrderUpdateComponent.jsx";
import OrderReturnComponent from "../components/stock/OrderReturnComponent.jsx";
import OrderProvideComponent from "../components/stock/OrderProvideComponent.jsx";
import MaterialTypeInform from "../components/warehouse/MaterialTypeInformComponent.jsx";
import OrderInformationComponent from '../components/stock/OrderInformationComponent';
import ZeroFilteredComponent from '../components/warehouse/ZeroFilteredComponent.jsx';
import PageTitleComponent from '../components/stock/PageTitleComponent.jsx';
import MaterialUnusableComponent from '../components/stock/MaterialUnusableComponent.jsx';
import MaterialServiceComponent from '../components/stock/MaterialServiceComponent.jsx';

import { IoFilterOutline } from "react-icons/io5";

import StockService from "../services/stock-service.js";

import {
    setOrderUpdateMessageBoxFalse,
    setOrderReturnMessageBoxFalse,

    setOrderMaterialUnusableMessageBoxFalse,
    setOrderSelectionMaterialUnusableToggleFalse,
    
    setOrderMaterialServiceMessageBoxFalse,
    setOrderSelectionMaterialServiceToggleFalse,

    setOrderSelectionUpdateToggleTrue,
    setOrderSelectionInformationToggleTrue,
    setOrderSelectionReturnToggleTrue,
    setOrderSelectionProvideToggleTrue,
    clearSelected,
} from "../store/stock-store.js";

const StockPage = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);

    const selected_items = useSelector((state) => state.stockSlice.selected_items);

    const filter_stock_data = useSelector((state) => state.stockSlice.filter_stock_data);

    const order_information_toggle = useSelector((state) => state.stockSlice.order_information_toggle);

    const order_update = useSelector((state) => state.stockSlice.order_update);

    const order_provide = useSelector((state) => state.stockSlice.order_provide);

    const type_count = useSelector((state) => state.commonSlice.type_count);

    const order_return = useSelector((state) => state.stockSlice.order_return);

    const material_unusable = useSelector((state) => state.stockSlice.material_unusable);
    const material_service = useSelector((state) => state.stockSlice.material_service);

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);

    const [show_message_box, setShowMessageBox] = useState(false);
    const [show_message_box_message, setShowMessageBoxMessage] = useState('');

    // Show Message Box Message Controller
    const showMessageBoxMessageHandle = (key, value) => {
        if (key === 'update') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'delete') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'inform') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'return') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'provide') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'unusablematerial') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
        else if (key === 'servicematerial') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
    }

    const getTypeFilter = (type) => {
        let data = {
            type: type,
        }
        dispatch(StockService.filterStockData(data));
    }

    const clearFilter = () => {
        dispatch(StockService.getcStocks(user.projectId));
    }

    useEffect(() => {
        return () => {
            dispatch(clearSelected());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(StockService.getcStocks(user.projectId));
    }, [dispatch]);

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

    useEffect(() => {
        if (material_unusable.message_box) {
            setTimeout(() => {
                dispatch(setOrderMaterialUnusableMessageBoxFalse());
                dispatch(setOrderSelectionMaterialUnusableToggleFalse());
            }, 2000)
        }
    }, [dispatch, material_unusable.message_box])

    useEffect(() => {
        if (material_service.message_box) {
            setTimeout(() => {
                dispatch(setOrderMaterialServiceMessageBoxFalse());
                dispatch(setOrderSelectionMaterialServiceToggleFalse());
            }, 2000)
        }
    }, [dispatch, material_service.message_box])


    return (
        <div className='flex flex-col items-center'>

            {/* Show Message Box */}
            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
            }


            {/* Order Update */}
            {
                order_update.order_update_toggle && <OrderUpdateComponent />
            }
            {
                order_update.order_update_message_box &&
                <MessageBox message={order_update.order_update_error_message} color={'bg-green-500'} />
            }


            {/* Order Return */}
            {
                order_return.order_return_toggle && <OrderReturnComponent />
            }
            {
                order_return.order_return_message_box && <MessageBox message={order_return.order_return_error_message}
                    color={order_return.order_return_color_cond} />
            }


            {/* Order Provide */}
            {
                order_provide.order_provide_toggle && <OrderProvideComponent />
            }


            {/* order Information */}
            {
                order_information_toggle && <OrderInformationComponent />
            }

            {
                material_unusable.toggle && < MaterialUnusableComponent />
            }
            {
                material_unusable.message_box && <MessageBox message={material_unusable.error_message}
                    color={material_unusable.color_cond} />
            }

{
                material_service.toggle && < MaterialServiceComponent />
            }
            {
                material_service.message_box && <MessageBox message={material_service.error_message}
                    color={material_service.color_cond} />
            }


            {/* Page Title */}
            <PageTitleComponent />

            {/* Material Type and Button Section */}
            <div className='flex flex-col justify-start px-3 w-full'>

                {/* Title Section */}

                <span style={{ fontWeight: 500, fontFamily: 'IBM Plex Sans' }} className='px-2 text-2xl text-start  '>Material Type Information</span>

                {/* Material Type and Button Section */}
                <div className={'flex  w-full  '}>

                    {/* Material Type Section */}
                    <div className='flex items-start w-full px-3 mt-4 '>
                        {
                            type_count.map((item, index) => (
                                item.type === 'Consumable' ?
                                    <MaterialTypeInform color={'border-red-500'} key={index + 1} item={item}
                                        getTypeFilter={getTypeFilter} />
                                    : item.type === 'Project' ?
                                        <MaterialTypeInform color={'border-green-500'} key={index + 1} item={item}
                                            getTypeFilter={getTypeFilter} />
                                        : item.type === 'Fixture' ?
                                            <MaterialTypeInform color={'border-blue-500'} key={index + 1} item={item}
                                                getTypeFilter={getTypeFilter} />
                                            : item.type === 'Safety' ?
                                                <MaterialTypeInform color={'border-pink-500'} key={index + 1} item={item}
                                                    getTypeFilter={getTypeFilter} />
                                                : item.type === 'Administrative' ?
                                                    <MaterialTypeInform color={'border-sky-500'} key={index + 1} item={item}
                                                        getTypeFilter={getTypeFilter} />
                                                    : <MaterialTypeInform key={index + 1} color={'border-orange-500'} item={item}
                                                        getTypeFilter={getTypeFilter} />
                            ))
                        }
                    </div>

                    {/* Button Section */}
                    <div className='flex flex-col justify-between items-start w-full '>

                        {/* Working Buttons Section */}
                        <div className='flex justify-end text-xs w-full' style={{ fontWeight: 600 }}>

                            {/* Provide Area */}
                            <button onClick={() => {
                                if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('provide', 'Please choose at least one column for provide to warehouse');
                                }
                                else {
                                    dispatch(setOrderSelectionProvideToggleTrue());
                                    dispatch(StockService.getDataByIds(selected_items));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400  hover:bg-orange-400 hover:text-white duration-200' >Provide</button>

                            {/* Return Row  */}
                            <button onClick={() => {
                                if (selected_items.length > 1) {
                                    showMessageBoxMessageHandle('return', 'Cant return two or more column same time');
                                }
                                else if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('return', 'Please choose at least one column for returning to warehouse');
                                }
                                else {
                                    dispatch(setOrderSelectionReturnToggleTrue());
                                    dispatch(StockService.getById(selected_items[0]));
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
                                    dispatch(StockService.getById(selected_items[0]));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Update</button>

                            {/* Delete Row */}
                            <button onClick={() => {
                                showMessageBoxMessageHandle('delete', 'Dont have authorization for deleting');
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Delete</button>

                            {/* Get Information about row */}
                            <button onClick={() => {
                                if (selected_items.length > 1) {
                                    showMessageBoxMessageHandle('inform', 'Cant get inform two or more column same time');
                                }
                                else if (selected_items.length === 0) {
                                    showMessageBoxMessageHandle('inform', 'Please Choose at least one row');
                                }
                                else {
                                    dispatch(setOrderSelectionInformationToggleTrue());
                                    dispatch(StockService.getById(selected_items[0]));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Get Information</button>

                            {/* Clear Filter */}
                            <button onClick={() => {
                                dispatch(clearFilter);
                            }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Clear Filter</button>

                            {/* Clear Selected  */}
                            <button onClick={() => {
                                dispatch(clearSelected());
                            }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Reset Select</button>

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

                    </div>

                </div>

            </div>


            <FilterComponent />


            {/* Table Section */}
            <table className='w-full'>
                <TableHeaderComponent />
                <TableBodyComponent />
            </table>

            {
                filter_stock_data.length === 0 && <ZeroFilteredComponent resetFunc={clearFilter} />
            }


            {/* Row Selected Section */}
            {
                selected_items.length >= 1 ? <OrderSelectedComponent showMessaggeBoxMessageHandle={showMessageBoxMessageHandle} /> : <div></div>
            }

        </div>
    )
}

export default StockPage