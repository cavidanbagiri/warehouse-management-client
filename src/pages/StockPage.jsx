
import  {useEffect, useState} from 'react'
import TableHeaderComponent from "../components/stock/TableHeaderComponent.jsx";
import TableBodyComponent from "../components/stock/TableBodyComponent.jsx";
import {IoFilterOutline} from "react-icons/io5";
import TableColumnFilterComponent from "../components/stock/TableColumnFilterComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import StockService from "../services/stock-service.js";
import FilterComponent from "../components/stock/FilterComponent.jsx";
import OrderSelectedComponent from "../components/stock/OrderSelectedComponent.jsx";
import MessageBox from "../layouts/MessageBox.jsx";
import OrderUpdateComponent from "../components/stock/OrderUpdateComponent.jsx";
import {setOrderUpdateMessageBoxFalse, setOrderReturnMessageBoxFalse, clearSelected} from "../store/stock-store.jsx";
import OrderReturnComponent from "../components/stock/OrderReturnComponent.jsx";
import MaterialTypeInform from "../components/warehouse/MaterialTypeInformComponent.jsx";
import WarehouseService from "../services/warehouse-service.js";

const StockPage = () => {

    const dispatch = useDispatch();

    const selected_items = useSelector((state) => state.stockSlice.selected_items);

    const order_update = useSelector((state) => state.stockSlice.order_update);

    const type_count = useSelector((state) => state.commonSlice.type_count);

    const order_return = useSelector((state) => state.stockSlice.order_return);

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
        else if (key === 'returnstock') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
    }

    const getTypeFilter = (type) => {
        let data = {
            type: type,
        }
        // dispatch(WarehouseService.filterWarehouseData(data));
    }

    useEffect(() => {
        return()=>{
            dispatch(clearSelected());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(StockService.getcStocks());
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


    return (
        <div className='flex flex-col items-center'>

            {/* Show Message Box */}
            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'}/>
            }


            {/* Order Update */}
            {
                order_update.order_update_toggle && <OrderUpdateComponent/>
            }
            {
                order_update.order_update_message_box &&
                <MessageBox message={order_update.order_update_error_message} color={'bg-green-500'}/>
            }


            {/* Order Return */}
            {
                order_return.order_return_toggle && <OrderReturnComponent/>
            }
            {
                order_return.order_return_message_box && <MessageBox message={order_return.order_return_error_message}
                                                                     color={order_return.order_return_color_cond}/>
            }

            {/* Page Title */}
            <div className='flex flex-col p-2 w-full'>
                <div className='flex flex-row w-full justify-between items-center bg-gray-50 rounded-lg px-4 mt-4 mb-3'>
                    <span style={{fontWeight: 500, fontFamily: 'IBM Plex Sans'}}
                          className='py-4 px-2 rounded-lg text-3xl text-start '>Stocked Material</span>
                    <div className='text-sm' style={{fontWeight: 500}}>
                        <button className='bg-orange-500 text-white px-5 py-3 rounded-lg'>
                            Go To Warehouse
                        </button>
                    </div>
                </div>
            </div>

            {/* Material Type Section */}
            <div className={'flex  flex-col w-full px-3'}>

                <span style={{fontWeight: 500, fontFamily: 'IBM Plex Sans'}} className='px-2 text-2xl text-start  '>Material Type Information</span>
                <div className='flex items-start w-full px-3 mt-4 '>
                    {
                        type_count.map((item, index) => (
                            item.type === 'Consumable' ?
                                <MaterialTypeInform color={'border-red-500'} key={index + 1} item={item}
                                                    getTypeFilter={getTypeFilter}/>
                                : item.type === 'Project' ?
                                    <MaterialTypeInform color={'border-green-500'} key={index + 1} item={item}
                                                        getTypeFilter={getTypeFilter}/>
                                    : item.type === 'Fixture' ?
                                        <MaterialTypeInform color={'border-blue-500'} key={index + 1} item={item}
                                                            getTypeFilter={getTypeFilter}/>
                                        : item.type === 'Safety' ?
                                            <MaterialTypeInform color={'border-pink-500'} key={index + 1} item={item}
                                                                getTypeFilter={getTypeFilter}/>
                                            : item.type === 'Administrative' ?
                                                <MaterialTypeInform color={'border-sky-500'} key={index + 1} item={item}
                                                                    getTypeFilter={getTypeFilter}/>
                                                : <MaterialTypeInform key={index + 1} color={'border-orange-500'} item={item}
                                                                      getTypeFilter={getTypeFilter}/>
                        ))
                    }
                </div>
            </div>

            {/* Table Column Filter */}
            <div className='flex justify-end items-center relative text-xs w-full px-4 my-4' style={{fontWeight: 600}}>
                            <span onClick={() => {
                                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                            }}
                                  className='text-sm font-medium text-gray-700 ml-2 hover:cursor-pointer'>Table Columns Filter</span>
                <span onClick={() => {
                    show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                }}
                      className='pl-2'><IoFilterOutline className='text-base hover:cursor-pointer'/></span>
                {
                    show_table_column_component && <TableColumnFilterComponent/>
                }
            </div>

            <FilterComponent/>


            {/* Table Section */}
            <table className='w-full'>
                <TableHeaderComponent/>
                <TableBodyComponent/>
            </table>


            {/* Row Selected Section */}
            {
                selected_items.length >= 1 ? <OrderSelectedComponent
                    showMessaggeBoxMessageHandle={showMessageBoxMessageHandle}
                /> : <div></div>
            }

        </div>
    )
}

export default StockPage