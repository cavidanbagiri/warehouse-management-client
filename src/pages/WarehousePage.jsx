
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WarehouseService from '../services/warehouse-service';

import TableHeaderComponent from '../components/warehouse/TableHeaderComponent'
import TableBodyComponent from '../components/warehouse/TableBodyComponent'
import OrderSelectedComponent from '../components/warehouse/OrderSelectedComponent';
import ZeroFilteredComponent from '../components/warehouse/ZeroFilteredComponent';
import MaterialTypeInform from '../components/warehouse/MaterialTypeInformComponent';
import MessageBox from '../layouts/MessageBox';
import OrderInformationComponent from '../components/warehouse/OrderInformationComponent';
import OrderUpdateComponent from '../components/warehouse/OrderUpdateComponent';
import TableColumnFilterComponent from "../components/warehouse/TableColumnFilterComponent.jsx";
import AddStockComponent from "../components/warehouse/AddStockComponent.jsx";
import FilterComponent from "../components/warehouse/FilterComponent.jsx";

import { IoFilterOutline } from "react-icons/io5";

import { filterCompany, filterOrdered } from '../store/common-store';

import {
    setOrderSelectionInformationToggleTrue,
    setOrderSelectionUpdateToggleTrue,
    setOrderUpdateMessageBoxFalse,
    addStockToggleTrue,
    setAddStockMessageBoxFalse,
    clearSelected, 
} from "../store/warehouse-store.js";

function WarehousePage() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);
    const type_count = useSelector((state) => state.commonSlice.type_count);
    const filtered_warehouse_data = useSelector((state) => state.warehouseSlice.filtered_warehouse_data);
    const selected_items = useSelector((state) => state.warehouseSlice.selected_items);
    const order_information_toggle = useSelector((state) => state.warehouseSlice.order_information_toggle);
    const order_update = useSelector((state) => state.warehouseSlice.order_update);
    const addstock = useSelector((state) => state.warehouseSlice.addstock);


    const [show_message_box, setShowMessageBox] = useState(false);
    const [show_message_box_message, setShowMessageBoxMessage] = useState('');

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);


    const clearFilter = () => {
        const projectId = user.projectId;
        dispatch(WarehouseService.fetchWarehouseData(projectId));
        // setDocumentNum('');
        // setMaterialName('');
        // setSelectedDate('');
        // setPO('');
    }

    const getTypeFilter = (type) => {
        let data = {
            type: type,
        }
        dispatch(WarehouseService.filterWarehouseData(data));
    }

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
        else if (key === 'addstock') {
            setShowMessageBox(true);
            setShowMessageBoxMessage(value)
        }
    }

    // Toggle Message Box after adding stock the element
    useEffect(()=>{
        if(addstock.addstock_message_box === true){
            setTimeout(()=>{
                dispatch(setAddStockMessageBoxFalse());
            },2000)
        }
    },[addstock.addstock_message_box, dispatch])

    useEffect(()=>{
        if(order_update.order_update_message_box === true){
            setTimeout(()=>{
                dispatch(setOrderUpdateMessageBoxFalse());
            },2000)
        }
    },[order_update.order_update_message_box, dispatch])

    // Show Message Box Controller
    useEffect(() => {
        if (show_message_box) {
            setTimeout(() => {
                setShowMessageBox(false);
            }, 2000)
        }
    }, [show_message_box])

    // Fetch Warehouse Data
    useEffect(() => {
        const projectId = user.projectId;
        dispatch(WarehouseService.fetchWarehouseData(projectId));
    }, [dispatch])

    return (

        <div className='flex flex-col items-center'>


            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
            }


            {/* Order Update */}
            {
                order_update.order_update_toggle && <OrderUpdateComponent />
            }
            {
                order_update.order_update_message_box && <MessageBox message={order_update.order_update_error_message} color={order_update.order_update_color_cond} />
            }


            {/* Add Stock */}
            {
                addstock.addstock_toggle && <AddStockComponent />
            }
            {
                addstock.addstock_message_box && <MessageBox message={addstock.addstock_error_message} color={addstock.addstock_color_cond} />
            }


            {/* order Information */}
            {
                order_information_toggle && <OrderInformationComponent />
            }


            {/* Page Title */}
            <div className='flex flex-col p-2 w-full'>
                <div className='flex flex-row w-full justify-between items-center bg-gray-50 rounded-lg px-4 mt-4 mb-3'>
                    <span style={{ fontWeight: 500 , fontFamily: 'IBM Plex Sans' }} className='py-4 px-2 rounded-lg text-3xl text-start '>Warehouse All Material List</span>
                    <div className='text-sm' style={{ fontWeight: 500 }}>
                        <button className='bg-orange-500 text-white px-5 py-3 rounded-lg'>
                            Go To Stock
                        </button>
                    </div>
                </div>
            </div>


            {/* Type Information */}
            <div className='flex flex-col w-full px-1'>
                <span style={{ fontWeight: 500, fontFamily: 'IBM Plex Sans' }} className='px-2 text-2xl text-start my-2 '>Material Type Information</span>
                <div className='flex  w-full items-start px-2 mt-2 mb-5 '>

                    {/* Material Type Section */}
                    <div className='flex items-start w-full '>
                        {
                            type_count.length > 0 &&
                            type_count.map((item, index) => (
                                item.type === 'Consumable' ? <MaterialTypeInform color={'border-red-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                    : item.type === 'Project' ? <MaterialTypeInform color={'border-green-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                        : item.type === 'Fixture' ? <MaterialTypeInform color={'border-blue-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                            : item.type === 'Safety' ? <MaterialTypeInform color={'border-pink-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                            : item.type === 'Administrative' ? <MaterialTypeInform color={'border-sky-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                                : <MaterialTypeInform key={index + 1} color={'border-orange-500'} item={item} getTypeFilter={getTypeFilter} />
                            ))
                        }
                    </div>
                    
                    {/* Button Section */}
                    <div className='flex flex-col justify-between items-start w-full '>

                        {/* Working Buttons Section */}
                        <div className='flex justify-end text-xs w-full' style={{ fontWeight: 600 }}>
                            <button onClick={()=>{
                                if(selected_items.length === 0){
                                    showMessageBoxMessageHandle('addstock', 'Please, Choose at least one row to adding stock');
                                }
                                else{
                                    dispatch(addStockToggleTrue());
                                    dispatch(WarehouseService.fetchSelectedItemsById(selected_items));
                                }
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400  hover:bg-orange-400 hover:text-white duration-200' >Add To Stock</button>
                            <button onClick={()=>{
                                if(selected_items.length > 1){
                                    showMessageBoxMessageHandle('update', 'Cant update two or more column same time');
                                }
                                else if(selected_items.length === 0){
                                    showMessageBoxMessageHandle('update', 'Please Choose at least one row');
                                }
                                else{
                                    dispatch(setOrderSelectionUpdateToggleTrue());
                                    dispatch(WarehouseService.getPOById(selected_items[0]));
                                }
                            }}
                                    className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Update Row</button>
                            <button onClick={()=>{
                                showMessageBoxMessageHandle('delete', 'Dont have authorization for deleting');
                            }}
                                className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Delete Row</button>
                            
                            <button onClick={()=>{
                                if(selected_items.length > 1){
                                    showMessageBoxMessageHandle('inform', 'Cant get inform two or more column same time');
                                }
                                else if(selected_items.length === 0){
                                    showMessageBoxMessageHandle('inform', 'Please Choose at least one row');
                                }
                                else{
                                    dispatch(setOrderSelectionInformationToggleTrue());
                                    dispatch(WarehouseService.getPOById(selected_items[0]));
                                }
                            }}
                                    className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Get Information</button>
                            <button onClick={clearFilter} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Clear Filter</button>

                            <button onClick={()=>{
                                dispatch(clearSelected());
                            }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:border-orange-400 hover:bg-orange-400 hover:text-white duration-200' >Reset Select</button>
                        </div>

                        {/* Table Column Name Section */}
                        <div className='flex justify-end items-center relative text-xs w-full px-4 mt-8' style={{ fontWeight: 600 }}>
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

                    </div>
                </div>
            </div>


            {/* Filter Title Section */}
            <div className='flex px-4 justify-start w-full'>
                <span className='text-2xl  tracking-tighter' style={{ fontWeight: 500, fontFamily: 'IBM Plex Sans' }}>Filter</span>
            </div>

            {/*</div>*/}
            <FilterComponent/>

            {/* Table Section */}
            <table className='w-full'>
                <TableHeaderComponent />
                <TableBodyComponent />
            </table>


            {
                !filtered_warehouse_data.length && <ZeroFilteredComponent resetFunc={clearFilter} />
            }

            {/* Row Selected Section */}
            {
                selected_items.length >= 1 ? <OrderSelectedComponent
                    showMessaggeBoxMessageHandle={showMessageBoxMessageHandle}
                /> : <div></div>
            }



        </div>
    )
}

export default WarehousePage