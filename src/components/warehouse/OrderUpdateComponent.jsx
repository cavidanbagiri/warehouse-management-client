
import { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setOrderSelectionUpdateToggleFalse } from '../../store/warehouse-store';
import DropDownComponent from '../common/DropdownComponent';
import { filterOrdered, filterCompany } from '../../store/common-store';
import WarehouseService from '../../services/warehouse-service';

function OrderUpdateComponent() {

    const dispatch = useDispatch();
    const po_data = useSelector((state) => state.warehouseSlice.po_data);
    const selected_items = useSelector((state) => state.warehouseSlice.selected_items);
    const filtered_companies = useSelector((state) => state.commonSlice.filtered_companies);
    const filter_users = useSelector((state) => state.commonSlice.filter_users);


    const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
    const [isUserDropDown, setIsUserDropDown] = useState(false);
    const [documentnum, setDocumentNum] = useState('');
    const [material_type, setMaterialType] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [qty, setQty] = useState(0);
    const [unit, setUnit] = useState('');
    const [po, setPO] = useState('');
    
    const [company, setCompany] = useState({
        companyId: 0,
        company_name: ''
    });
    const [ordered, setOrdered] = useState({
        orderedId: 0,
        ordered_name: '',
    });


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
    const postFunc = () => {
        console.log('_>',selected_items[0]);
        const updated_data = {
            id: selected_items[0],
            companyId: company.companyId,
            orderedId: ordered.orderedId,
            document: documentnum,
            material_name: material_name,
            qty: qty,
            unit: unit,
            type: material_type,
            po: po,
        }
        console.log('post function can work and result un below : ', updated_data);
        dispatch(WarehouseService.updatePO(updated_data));
    }

    useEffect(()=>{
        if(po_data?.CompanyModel?.company_id){
            setCompany((each) => ({
                ...each,
                companyId: po_data?.CompanyModel?.company_id,
                company_name: po_data?.CompanyModel?.company_name
            }));
            setDocumentNum(po_data.document);
            setMaterialName(po_data.material_name);
            setMaterialType(po_data.type);
            setQty(po_data.qty);
            setPO(po_data.po);
            setUnit(po_data.unit);
        }
        if(po_data?.UserModel?.user_id){
            setOrdered((each) => ({
                ...each,
                orderedId: po_data?.UserModel?.user_id,
                ordered_name: po_data?.UserModel?.firstName.charAt(0).toUpperCase()+po_data?.UserModel?.firstName.slice(1) + ' ' + po_data?.UserModel?.lastName.charAt(0).toUpperCase()+po_data?.UserModel?.lastName.slice(1)
            }))
        }
    },[po_data])

    return (
        <div className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>
            <div className='w-1/2' ></div>
            <div className='flex flex-col bg-white w-1/2' >
                {/* Close and Title Component Section */}
                <div className='flex justify-between p-5 text-end'>
                    <span style={{ fontWeight: 600, fontFamily: 'Open Sans' }} className='text-3xl'>
                        Order Update Section
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
                        {/* {
                            material_type
                        } */}
                    {/* Company Section */}
                    <div className='flex'>
                        <span className='w-1/3'>Company Name </span>
                        <div className='relative w-full'>
                            <button className='text-xs bg-white border border-gray-300  rounded-lg  p-2 w-full text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {
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
                    </div>

                    {/* Ordered Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Ordered Name </span>
                        <div className='relative w-full'>
                            <button className='text-xs bg-white border border-gray-300  rounded-lg  p-2 w-full text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {
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
                    </div>
                    
                    {/* Doc Number Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Document Number </span>
                        <div className='relative w-full'>
                        <input value={documentnum} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-full p-2 outline-none text-center' type="text" placeholder='Document' onChange={(e) => {
                            setDocumentNum(e.target.value);
                        }} />
                        </div>
                    </div>

                    {/* Material Name Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Material Name </span>
                        <div className='relative w-full'>
                        <input value={material_name} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-full  p-2 outline-none text-center ' type="text" placeholder='Material Name' onChange={(e) => {
                            setMaterialName(e.target.value);
                        }} />
                        </div>
                    </div>

                    {/* Material Qty Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Quantity </span>
                        <div className='relative w-full'>
                            <input value={qty} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-full  p-2 outline-none text-center ' type="text" placeholder='Material Name' onChange={(e) => {
                                setQty(e.target.value);
                            }} />
                        </div>
                    </div>

                    {/* Material Unit Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Unit </span>
                        <div className='relative w-full'>
                            <input value={unit} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-full  p-2 outline-none text-center ' type="text" placeholder='Material Name' onChange={(e) => {
                                setUnit(e.target.value);
                            }} />
                        </div>
                    </div>

                    {/* Material Name Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Order Num </span>
                        <div className='relative w-full'>
                        <input value={po} className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-full  p-2 outline-none text-center ' type="text" placeholder='Order Num' onChange={(e) => {
                            setPO(e.target.value);
                        }} />
                        </div>
                    </div>

                    {/* Matterial Type Side */}
                    <div className='flex mt-5'>
                        <span className='w-1/3'>Material Type </span>
                        <div className='relative w-full'>
                        <select onChange={(event)=>{
                            setMaterialType(event.target.value);
                        }}
                         className='w-full border p-2 outline-none rounded-lg text-xs'
                        value={material_type}>
                            <option value="Project">Project</option>
                            <option value="Consumable">Consumable</option>
                            <option value="Fixture">Fixture</option>
                            <option value="Hand Tools">Hand Tools</option>
                            <option value="Safety">Safety</option>
                        </select>
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