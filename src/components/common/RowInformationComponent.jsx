
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { rowInformToggleFalse } from '../../store/common-store';

import TableStockHeader from './TableStockHeader';
import TableStockBody from './TableStockBody';

import TableAreaHeader from './TableAreaHeader';
import TableAreaBody from './TableAreaBody';

import TableServiceUnusableHeader from './TableServiceUnusableHeader';
import TableServiceUnusableBody from './TableServiceUnusableBody';

import SpinnerComponent from '../common/SpinnerComponent';

import {rowInformToggleTrue} from '../../store/common-store';

import under_construction from '../../assets/under_construction.png'

function RowInformationComponent() {

  const dispatch = useDispatch();
  const row_inform = useSelector((state) => state.commonSlice.row_inform);

  return (

    <div className='flex flex-row justify-end z-20 fixed top-0 right-0 w-full overflow-auto h-full bg-white'>

      {
        row_inform.pending ? 
        <div className='flex items-center justify-center w-full h-full'>
          <SpinnerComponent />
        </div>
          :
          <div className='flex flex-col bg-white w-full'>
            {/* Title and Close Component Section */}
            <div className='flex justify-between items-center font-medium p-5 text-end border-b'>
              <span className='text-2xl'>
                Row Information Section
              </span>
              <span
                onClick={() => {
                  dispatch(rowInformToggleFalse());
                }}
                className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
                <IoMdClose className='text-2xl' />
              </span>
            </div>

            {/* Warehouse Information Section */}
            <div className='flex flex-col p-4 '>

              <span className='text-center mb-4 text-3xl font-bold'>
                Warehouse information
              </span>

              {/* Project Information */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl'>Project</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.ProjectModel?.project_name}</span>
              </div>

              {/* Ordered By */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Ordered By</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.UserModel?.firstName.charAt(0).toUpperCase() + row_inform.data.UserModel?.firstName.slice(1).toLowerCase()} {row_inform.data.UserModel?.lastName.charAt(0).toUpperCase() + row_inform.data.UserModel?.lastName.slice(1).toLowerCase()}</span>
              </div>

              {/* Material Name */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Material name</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.material_name}</span>
              </div>

              {/* Material Type */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Material Type</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.type}</span>
              </div>

              {/* Material Amount */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Quantity</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.qty} {row_inform.data.unit}</span>
              </div>

              {/* Leftover Amount */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Leftover</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.leftover} {row_inform.data.unit}</span>
              </div>

              {/* PO */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Order num</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.po} </span>
              </div>

              {/* Document */}
              <div className='flex'>
                <div className='w-44 '>
                  <span className='text-xl' >Document num</span>
                </div>
                <span className='text-xl pl-10 text-gray-500' >{row_inform.data.document} </span>
              </div>

            </div>

            {/* Stock information */}
            <div className='flex flex-col p-4 '>

              {/* Title */}
              <span className='text-center mb-4 text-3xl font-bold'>
                Stock information
              </span>

              {/* Table Section */}

              <table className=''>
                <TableStockHeader />
                <tbody className='text-base text-center' style={{ fontFamily: 'Roboto' }}>
                  {
                    row_inform.data?.StockModels?.map((item, index) =>
                      <TableStockBody item={item} index={index + 1} key={index} />
                    )
                  }
                </tbody>
              </table>

            </div>

            {/* Area Section */}

            <div className='flex flex-col p-4 '>
              <span className='text-center mb-4 text-3xl font-bold'>
                Area information
              </span>

              {/* Table Section */}

              <table className=''>
                <TableAreaHeader />
                <tbody className='text-base text-center' style={{ fontFamily: 'Roboto' }}>
                  {
                    row_inform.data?.StockModels?.map((item, index) =>
                      item.AreaModels.map((area_item, index) =>
                        <TableAreaBody item={area_item} index={index + 1} key={index} />
                      )
                    )
                  }
                </tbody>
              </table>
            </div>


            {/* Service Section */}

            <div className='flex flex-col p-4 '>
              <span className='text-center mb-4 text-3xl font-bold'>
                Service information
              </span>

              {/* Table Section */}

              <table className=''>
                <TableServiceUnusableHeader />
                <tbody className='text-base text-center' style={{ fontFamily: 'Roboto' }}>
                  {
                    row_inform.data?.StockModels?.map((item, index) =>
                      item.ServiceMaterialModels.map((area_item, index) =>
                        <TableServiceUnusableBody item={area_item} index={index + 1} key={index} />
                      )
                    )
                  }
                </tbody>
              </table>
            </div>


            {/* Unusable Section */}

            <div className='flex flex-col p-4 '>
              <span className='text-center mb-4 text-3xl font-bold'>
                Unusable Materials information
              </span>

              {/* Table Section */}

              <table className=''>
                <TableServiceUnusableHeader />
                <tbody className='text-base text-center' style={{ fontFamily: 'Roboto' }}>
                  {
                    row_inform.data?.StockModels?.map((item, index) =>
                      item.UnusableMaterialModels.map((area_item, index) =>
                        <TableServiceUnusableBody item={area_item} index={index + 1} key={index} />
                      )
                    )
                  }
                </tbody>
              </table>
            </div>


          </div>
      }

    </div>

  )
}

export default RowInformationComponent