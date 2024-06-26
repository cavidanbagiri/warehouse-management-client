import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {filterCompany, filterOrdered} from "../../store/common-store.js";
import DropDownComponent from "../common/DropdownComponent.jsx";
import StockService from "../../services/stock-service.js";

function FilterComponent() {

    const dispatch = useDispatch();

    const filtered_companies = useSelector((state) => state.commonSlice.filtered_companies);
    const filter_users = useSelector((state) => state.commonSlice.filter_users);

    // Filter Section Hooks
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
    const searchFunc = () => {
        let data = {
            companyId: company.companyId,
            orderedId: ordered.orderedId,
            document: documentnum.toString(),
            material_name: material_name.toString(),
            createdAt: createdAt.toString(),
            po: po,
        };
        console.log(data);
        dispatch(StockService.filterStockData(data));
    }

    return (

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

    )
}

export default FilterComponent