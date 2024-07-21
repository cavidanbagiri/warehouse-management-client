import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TableHeaderComponent from '../components/area/TableHeaderComponent.jsx'
import TableBodyComponent from '../components/area/TableBodyComponent.jsx'
import TableColumnFilterComponent from '../components/area/TableColumnFilterComponent.jsx'
import PageTitleComponent from '../components/area/PageTitleComponent.jsx'
import FilterComponent from '../components/area/FilterComponent.jsx'


import AreaService from '../services/area-service'

import { IoFilterOutline } from "react-icons/io5";

function AreaPage() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userSlice.user);

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);

    useEffect(() => {
        dispatch(AreaService.fetchAreas(user.projectId));
    }, []);

    return (
        <div className='flex flex-col items-center'>

            {/* Page Title */}
            <PageTitleComponent />


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

        </div>
    )
}

export default AreaPage