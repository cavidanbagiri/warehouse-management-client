
import React, {useEffect, useState} from 'react'
import TableHeaderComponent from "../components/stock/TableHeaderComponent.jsx";
import TableBodyComponent from "../components/stock/TableBodyComponent.jsx";
import {IoFilterOutline} from "react-icons/io5";
import TableColumnFilterComponent from "../components/stock/TableColumnFilterComponent.jsx";
import {useDispatch} from "react-redux";
import StockService from "../services/stock-service.js";
import FilterComponent from "../components/stock/FilterComponent.jsx";
// import {filterCompany, filterOrdered} from "../store/common-store.js";

const StockPage = () => {

    const dispatch = useDispatch();

    const [show_table_column_component, setShowTableColumnCompoenent] = useState(false);


    useEffect(() => {
        dispatch(StockService.getcStocks());
    }, [dispatch]);

    return (
    <div className='flex flex-col items-center'>

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


    </div>
  )
}

export default StockPage