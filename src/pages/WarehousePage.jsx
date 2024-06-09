
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WarehouseService from '../services/warehouse-service';

import TableHeaderComponent from '../components/warehouse/TableHeaderComponent'
import TableBodyComponent from '../components/warehouse/TableBodyComponent'
import OrderSelectedComponent from '../components/warehouse/OrderSelectedComponent';
import DropDownComponent from '../components/common/DropdownComponent';
import ZeroFilteredComponent from '../components/warehouse/ZeroFilteredComponent';
import MaterialTypeInform from '../components/warehouse/MaterialTypeInformComponent';
import MessageBox from '../layouts/MessageBox';
import OrderInformationComponent from '../components/warehouse/OrderInformationComponent';
import OrderUpdateComponent from '../components/warehouse/OrderUpdateComponent';

import { filterCompany, filterOrdered } from '../store/common-store';

import {setOrderUpdateMessageBoxFalse} from "../store/warehouse-store.js";

function WarehousePage() {

    const dispatch = useDispatch();

    const filtered_companies = useSelector((state) => state.commonSlice.filtered_companies);
    const filter_users = useSelector((state) => state.commonSlice.filter_users);
    const type_count = useSelector((state) => state.commonSlice.type_count);
    const filtered_warehouse_data = useSelector((state) => state.warehouseSlice.filtered_warehouse_data);
    const selected_items = useSelector((state) => state.warehouseSlice.selected_items);
    const order_information_toggle = useSelector((state) => state.warehouseSlice.order_information_toggle);
    const order_update_toggle = useSelector((state) => state.warehouseSlice.order_update_toggle);
    const order_update_message_box = useSelector((state) => state.warehouseSlice.order_update_message_box);
    const order_update_error_message = useSelector((state) => state.warehouseSlice.order_update_error_message);

    const [show_message_box, setShowMessageBox] = useState(false);
    const [show_message_box_message, setShowMessageBoxMessage] = useState('');

    const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    const [isUserDropDown, setIsUserDropDown] = useState(false);
    const [documentnum, setDocumentNum] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [po, setPO] = useState('');
    const [createdAt, setSelectedDate] = useState('');
    const [company, setCompany] = useState({
        companyId: '',
        company_name: ''
    })
    const [ordered, setOrdered] = useState({
        orderedId: '',
        ordered_name: '',
    })



    const listenCompany = (val, second_val) => {
        setCompany((each) => ({
            ...each,
            companyId: val,
            company_name: second_val
        }));
        setIsCompanyDropDown(!isCompanyDropDown)
    }
    const listenUser = (val, second_val) => {
        setOrdered((each) => ({
            ...each,
            orderedId: val,
            ordered_name: second_val
        }))
        setIsUserDropDown(!isUserDropDown);
    }
    const filterChange = (event, comp) => {
        if (comp === 'username') {
            dispatch(filterOrdered(event.target.value));
        }
        else if (comp === 'company_name') {
            dispatch(filterCompany(event.target.value));
        }
    }
    const resetFunc = () => {
        setDocumentNum('');
        setMaterialName('');
        setSelectedDate('');
        setPO('');
        dispatch(WarehouseService.fetchWarehouseData());
    }
    const searchFunc = () => {
        let data = {
            companyId: company.companyId,
            orderedId: ordered.orderedId,
            document: documentnum.toString(),
            material_name: material_name.toString(),
            createdAt: createdAt.toString(),
            po: po,
        };
        dispatch(WarehouseService.filterWarehouseData(data));
    }
    const getTypeFilter = (type) => {
        let data = {
            type: type,
        }
        dispatch(WarehouseService.filterWarehouseData(data));
    }

    // Show Message Box Message Controller
    const showMessaggeBoxMessageHandle = (key, value) => {
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
    }

    // Show Message Box Controller
    useEffect(() => {
        if (show_message_box) {
            setTimeout(() => {
                setShowMessageBox(false);
            }, 2000)
        }
    }, [show_message_box])


    // Escapee Keydown controller
    useEffect(() => {
        document.addEventListener('keydown', handleEscape, true);
    }, [])
    function handleEscape(e) {
        if (e.key === 'Escape') {
            setIsCompanyDropDown(false);
            setIsUserDropDown(false)
        }
    }

    useEffect(()=>{
        if(order_update_message_box){
            setTimeout(()=>{
                dispatch(setOrderUpdateMessageBoxFalse());
            },2000)
        }
    },[order_update_message_box]);

    return (

        <div className='flex flex-col items-center'>

            {
                show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
            }

            {
                order_update_message_box && <MessageBox message={order_update_error_message} color={'bg-green-500'} />
            }

            {
                order_information_toggle && <OrderInformationComponent />
            }

            {
                order_update_toggle && <OrderUpdateComponent />
            }

            {/* Page Title */}
            <div className='flex flex-col p-2 w-full'>
                <div className='flex flex-row w-full justify-between items-center bg-gray-50 rounded-lg px-4 mt-4 mb-3'>
                    <span style={{ fontWeight: 500 }} className='py-4 px-2 rounded-lg text-3xl text-start '>Warehouse All Material List</span>
                    <div className='text-xs' style={{ fontWeight: 500 }}>
                        <button className='bg-orange-500 text-white px-5 py-3 rounded-lg'>
                            Go To Stock
                        </button>
                    </div>
                </div>
            </div>


            {/* Type Information */}
            <div className='flex flex-col w-full px-1'>
                <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='py-2 px-4 rounded-lg text-2xl text-start my-2 tracking-wide'>Material Type Information</span>
                <div className='flex  w-full items-start px-2 mt-2 mb-5 '>
                    <div className='flex items-start w-full '>
                        {
                            type_count.map((item, index) => (
                                item.type === 'Consumable' ? <MaterialTypeInform color={'border-red-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                    : item.type === 'Project' ? <MaterialTypeInform color={'border-green-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                        : item.type === 'Fixture' ? <MaterialTypeInform color={'border-blue-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                            : item.type === 'Safety' ? <MaterialTypeInform color={'border-pink-500'} key={index + 1} item={item} getTypeFilter={getTypeFilter} />
                                                : <MaterialTypeInform key={index + 1} color={'border-orange-500'} item={item} getTypeFilter={getTypeFilter} />
                            ))
                        }
                    </div>
                    <div className='flex justify-end text-xs w-full' style={{ fontWeight: 600 }}>
                        <button onClick={() => { }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Add To Stock</button>
                        <button onClick={() => { }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Update Row</button>
                        <button onClick={() => { }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Delete Row</button>
                        <button onClick={() => { }} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Get Information</button>
                        <button onClick={resetFunc} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Clear Filter</button>
                    </div>
                </div>
            </div>


            {/* Filter Title Section */}
            <div className='flex px-4 justify-start w-full'>
                <span className='text-2xl  tracking-wide' style={{ fontWeight: 500, fontFamily: 'Open Sans' }}>Filter</span>
            </div>


            {/* Filter Section */}
            <div className='flex items-end justify-between w-full mb-3 px-4'>

                <div className='flex'>

                    {/* Selected Date Filter */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Date</p>
                        <input
                            className='text-xs bg-white border border-gray-300 rounded-lg w-28 p-2 outline-none text-center hover:border-orange-300 '
                            type="date" name="" id="" onChange={(e) => {
                            setSelectedDate(e.target.value)
                        }}/>
                    </div>

                    {/* Company Side */}
                    <div className='relative mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Company</p>
                        <button
                            className='text-xs bg-white border border-gray-300  rounded-lg  p-2 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '
                            onClick={() => {
                                setIsCompanyDropDown(!isCompanyDropDown)
                            }}>
                            {company.companyId === '' ? 'Company' : company.company_name}
                        </button>
                        {
                            isCompanyDropDown && <DropDownComponent
                                data={filtered_companies}
                                text_name={'company_name'}
                                input_name={'Company...'}
                                listenFunc={listenCompany}
                                filterChange={filterChange}
                            />
                        }
                    </div>

                    {/* Ordered Side */}
                    <div className='relative mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Ordered</p>
                        <button
                            className='text-xs bg-white border border-gray-300 rounded-lg p-2 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '
                            onClick={() => {
                                setIsUserDropDown(!isUserDropDown)
                            }}>
                            {ordered.orderedId === '' ? 'Orderer' : ordered.ordered_name}
                        </button>
                        {
                            isUserDropDown && <DropDownComponent
                                data={filter_users}
                                text_name={'username'}
                                input_name={'Orderer...'}
                                listenFunc={listenUser}
                                filterChange={filterChange}
                            />
                        }
                    </div>

                    {/* Doc Number Side */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Document</p>
                        <input value={documentnum}
                               className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                               type="text" placeholder='Document' onChange={(e) => {
                            setDocumentNum(e.target.value);
                        }}/>
                    </div>

                    {/* Material name */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Material Name</p>
                        <input value={material_name}
                               className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-64 p-2 outline-none text-center  hover:border-orange-300 '
                               type="text" placeholder='Material Name' onChange={(e) => {
                            setMaterialName(e.target.value);
                        }}/>
                    </div>

                    {/* Material name */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Order Num</p>
                        <input value={po}
                               className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                               type="text" placeholder='Order Num' onChange={(e) => {
                            setPO(e.target.value);
                        }}/>
                    </div>

                </div>

                <div className=''>
                    <p className='text-xs text-gray-400 pl-1'>Search</p>
                    <button
                        className='text-sm bg-green-500  border border-gray-300 rounded-lg p-2 w-24 text-ellipsis overflow-hidden text-nowrap outline-none text-white hover:bg-white hover:text-green-500 duration-200'
                        onClick={searchFunc}>
                        Search
                    </button>
                </div>

            </div>


            {/* Table Section */}
            <table className='w-full'>
                <TableHeaderComponent />
                <TableBodyComponent />
            </table>
            {
                !filtered_warehouse_data.length && <ZeroFilteredComponent resetFunc={resetFunc} />
            }

            {/* Row Selected Section */}
            {
                selected_items.length >= 1 ? <OrderSelectedComponent
                    showMessaggeBoxMessageHandle={showMessaggeBoxMessageHandle}
                /> : <div></div>
            }



        </div>
    )
}

export default WarehousePage