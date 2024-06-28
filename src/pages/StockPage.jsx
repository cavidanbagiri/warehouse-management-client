
import React, {useEffect, useState} from 'react'
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

const StockPage = () => {

    const dispatch = useDispatch();

    const selected_items = useSelector((state) => state.stockSlice.selected_items);

    const order_update_toggle = useSelector((state) => state.stockSlice.order_update_toggle);
    const order_update_message_box = useSelector((state) => state.stockSlice.order_update_message_box);
    const order_update_error_message = useSelector((state) => state.stockSlice.order_update_error_message);

    const order_return_toggle = useSelector((state) => state.stockSlice.order_return_toggle);
    const order_return_message_box = useSelector((state) => state.stockSlice.order_return_message_box);
    const order_return_error_message = useSelector((state) => state.stockSlice.order_return_error_message);

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
        if (order_update_message_box) {
            setTimeout(() => {
                dispatch(setOrderUpdateMessageBoxFalse());
            }, 2000)
        }
    }, [dispatch, order_update_message_box])


    useEffect(() => {
        if (order_return_message_box) {
            setTimeout(() => {
                dispatch(setOrderReturnMessageBoxFalse());
            }, 2000)
        }
    }, [dispatch, order_return_message_box])


    return (
    <div className='flex flex-col items-center'>

        {
            show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
        }

        {
            order_update_toggle && <OrderUpdateComponent />
        }

        {
            order_update_message_box && <MessageBox message={order_update_error_message} color={'bg-green-500'} />
        }

        {
            order_return_toggle && <OrderReturnComponent />
        }

        {
            order_return_message_box && <MessageBox message={order_return_error_message} color={'bg-green-500'} />
        }

      {/* Page Title */}
      <div className='flex flex-col p-2 w-full'>
        <div className='flex flex-row w-full justify-between items-center bg-gray-50 rounded-lg px-4 mt-4 mb-3'>
          <span style={{ fontWeight: 500 , fontFamily: 'IBM Plex Sans' }} className='py-4 px-2 rounded-lg text-3xl text-start '>Stocked Material</span>
          <div className='text-sm' style={{ fontWeight: 500 }}>
            <button className='bg-orange-500 text-white px-5 py-3 rounded-lg'>
              Go To Warehouse
            </button>
          </div>
        </div>
      </div>

      {/* Table Column Filter */}
        <div className='flex justify-end items-center relative text-xs w-full px-4 my-4' style={{ fontWeight: 600 }}>
                            <span onClick={()=>{
                                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
                            }}
                                  className='text-sm font-medium text-gray-700 ml-2 hover:cursor-pointer' >Table Columns Filter</span>
            <span onClick={()=>{
                show_table_column_component ? setShowTableColumnCompoenent(false) : setShowTableColumnCompoenent(true);
            }}
                  className='pl-2'><IoFilterOutline  className='text-base hover:cursor-pointer' /></span>
            {
                show_table_column_component && <TableColumnFilterComponent/>
            }
        </div>

        <FilterComponent/>


      {/* Table Section */}
      <table className='w-full'>
        <TableHeaderComponent />
        <TableBodyComponent />
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