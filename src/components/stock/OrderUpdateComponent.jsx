
import { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {
    setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxTrue,
    setOrderUpdateErrorMessage,
} from '../../store/stock-store.jsx';
// import DropDownComponent from '../common/DropdownComponent';
// import { filterOrdered, filterCompany } from '../../store/common-store';
import WarehouseService from '../../services/warehouse-service';
import StockService from "../../services/stock-service.js";

function OrderUpdateComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.stockSlice.po_data);
    const selected_items = useSelector((state) => state.stockSlice.selected_items);
    //const order_update_message_box = useSelector((state) => state.warehouseSlice.order_update_message_box);
    //const filtered_companies = useSelector((state) => state.commonSlice.filtered_companies);
    //const filter_users = useSelector((state) => state.commonSlice.filter_users);


    // const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    // const [isUserDropDown, setIsUserDropDown] = useState(false);
    // const [documentnum, setDocumentNum] = useState('');
    // const [material_type, setMaterialType] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [stock, setStock] = useState(0);
    const [unit, setUnit] = useState('');
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');
    // const [po, setPO] = useState('');
    // const [price, setPrice] = useState(0);

    // const [company, setCompany] = useState({
    //     companyId: 0,
    //     company_name: ''
    // });
    // const [ordered, setOrdered] = useState({
    //     orderedId: 0,
    //     ordered_name: '',
    // });


    // const listenCompany = (val, second_val) => {
    //     setCompany((each) => ({
    //         ...each,
    //         companyId: val,
    //         company_name: second_val
    //     }));
    //     setIsCompanyDropDown(!isCompanyDropDown)
    // }
    // const listenUser = (val, second_val) => {
    //     setOrdered((each) => ({
    //         ...each,
    //         orderedId: val,
    //         ordered_name: second_val
    //     }))
    //     setIsUserDropDown(!isUserDropDown);
    // }
    // const filterChange = (event, comp) => {
    //     if (comp === 'username') {
    //         dispatch(filterOrdered(event.target.value));
    //     }
    //     else if (comp === 'company_name') {
    //         dispatch(filterCompany(event.target.value));
    //     }
    // }
    const postFunc = () => {
        let updated_data = {
            id: po_data.id,
            material_name: material_name,
            stock: stock,
            serial_number: serial_number,
            material_id: material_id,
        };
        console.log('sending data is : ',updated_data);
        // let cond = true;
        // if (po_data.leftover <= 0) {
        //     cond = false;
        //     dispatch(setOrderUpdateMessageBoxTrue());
        //     dispatch(setOrderUpdateErrorMessage({ message: 'Leftover is 0, Cant change quantity' }));
        // }
        // if (material_name.toString().trim().length === 0) {
        //     dispatch(setOrderUpdateMessageBoxTrue());
        //     dispatch(setOrderUpdateErrorMessage({ message: 'Material name cant be empty' }))
        //     cond = false;
        // }
        // else if (qty <= 0) {
        //     dispatch(setOrderUpdateMessageBoxTrue());
        //     dispatch(setOrderUpdateErrorMessage({ message: 'Quantity Cant be less than zero' }))
        //     cond = false;
        // }
        // const updated_data = {
        //     id: selected_items[0],
        //     companyId: company.companyId,
        //     orderedId: ordered.orderedId,
        //     document: documentnum,
        //     material_name: material_name,
        //     qty: qty,
        //     unit: unit,
        //     price: price,
        //     type: material_type,
        //     po: po,
        // }
        // if (cond) {
            dispatch(StockService.updateStock(updated_data))
            dispatch(setOrderUpdateErrorMessage({ message: 'Data Successfully Updated' }))
        // }

    }

    useEffect(() => {
        if (po_data?.WarehouseModel?.warehouse_id) {
            console.log('this is wor')
            // setCompany((each) => ({
            //     ...each,
            //     companyId: po_data?.CompanyModel?.company_id,
            //     company_name: po_data?.CompanyModel?.company_name
            // }));
            // setDocumentNum(po_data.document);
            setMaterialName(po_data.WarehouseModel.material_name);
            //setMaterialType(po_data.type);
            setStock(po_data.stock);
            //setPO(po_data.po);
            setUnit(po_data.WarehouseModel.unit);
            //setPrice(po_data.price);
            setSerialNumber(po_data.serial_number);
            setMaterialId(po_data.material_id);
        }
        else{
            console.log('else work')
        }
        // if (po_data?.UserModel?.user_id) {
        //     setOrdered((each) => ({
        //         ...each,
        //         orderedId: po_data?.UserModel?.user_id,
        //         ordered_name: po_data?.UserModel?.firstName.charAt(0).toUpperCase() + po_data?.UserModel?.firstName.slice(1) + ' ' + po_data?.UserModel?.lastName.charAt(0).toUpperCase() + po_data?.UserModel?.lastName.slice(1)
        //     }))
        // }
    },[po_data]);

    return (



        <div className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>
            <div className='w-1/2' ></div>
            <div className='flex flex-col bg-white w-1/2' >
                {/* Close and Title Component Section */}
                <div className='flex justify-between p-5 text-end'>
                    <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                        Order Update Section Stock
                    </span>
                    <span
                        onClick={() => {
                            dispatch(setOrderSelectionUpdateToggleFalse());
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
                            {stock}
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
                            <input value={serial_number} type="text" className={'border p-2 rounded-lg'} onChange={(e) => {
                                setSerialNumber(e.target.value);
                            }} />
                        </div>
                    </div>

                    {/* Material ID Side */}
                    <div className='flex items-center justify-between mt-3'>
                        <span className='w-1/3'>Material ID </span>
                        <div className='relative w-full'>
                            <input value={material_id} type="text" className={'border p-2 rounded-lg'}
                                   onChange={(e) => {
                                       setMaterialId(e.target.value);
                                   }}/>
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