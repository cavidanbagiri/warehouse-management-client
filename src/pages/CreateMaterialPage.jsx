
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addTableCheck, delRow, setShowMessageFalse } from '../store/create_table-store';
import CreateTableService from '../services/create_table-service';
import { setShowErrorTrue, setShowErrorFalse } from '../store/message_box-store';

import CreateTableNavbarHeaderComponent from '../components/creatematerial/TableHeaderComponent'
import TableBodyComponent from '../components/creatematerial/TableBodyComponent'
import ErrorMessage from '../layouts/ErrorMessage';

import LoadingButton from '@mui/lab/LoadingButton';
import AdminModal from '../layouts/AdminModal';

function CreateMaterialPage() {

  const table = useSelector((state) => state.createTableSlice.table);
  const show_message_box = useSelector((state) => state.messageBoxSlice.toggle_message);
  const show_load = useSelector((state) => state.createTableSlice.show_load);
  const show_message = useSelector((state) => state.createTableSlice.show_message);
  const [add_company, setAddCompany] = useState(false);
  const [add_ordered, setAddOrdered] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  function addCompany () {
    setAddCompany(true);
  }
  function addOrdered () {
    setAddOrdered(true);
  }

  function closeModal () {
    if(add_company === true){setAddCompany(false)}
    if(add_ordered === true){setAddOrdered(false)}
  }

  // Add New Row To Table
  function addRows() {
    dispatch(addTableCheck());
  }

  // Add New Row To Table
  function addGroup() {
    console.log('you cant create any new group');
  }

  // Delete Row From Table
  function delRows() {
    if (table.length > 1) {
      dispatch(delRow());
    }
    else {
      setMessage('Minimum must be one row');
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }

  // Post Created Material List
  function postFunc() {
    let cond = true;
    for (let i of table) {
      if (i.company === "") {
        setMessage(`In ${i.ss} row, company name must be selected`);
        cond = false;
        break;
      }
      else if (i.material_name === "") {
        setMessage(`In ${i.ss} row, Material name must be selected`);
        cond = false;
        break;
      }
      else if (i.qty <= 0) {
        setMessage(`In ${i.ss} row, Quantity is not valid`);
        cond = false;
        break;
      }
    }
    if (cond) {
      dispatch(CreateTableService.receiveWarehouse(table));
    }
    else {
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      dispatch(setShowMessageFalse());
    },2000)
  },[show_message])

  return (

    <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex flex-col '>

      {
        show_message_box && <ErrorMessage message={message} />
      }

      {
        show_message && <ErrorMessage message={'Material Received In Warehouse'} />
      }

      {
        add_company && <AdminModal title={'Add Company'}  closeModal={closeModal} show_component={'company'} />
      }

{
        add_ordered && <AdminModal title={'Add Ordered'}  closeModal={closeModal} show_component={'ordered'} />
      }


      <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex flex-col justify-between'>

        <div className='flex flex-row justify-between items-center bg-gray-100 rounded-lg px-4 mt-4 mb-3'>
          <span style={{ fontWeight: 500 }} className='py-4 px-2 rounded-lg text-3xl text-start '>Add Material To Warehouse</span>
          <div className='text-xs' style={{ fontWeight: 500 }}>
            <button onClick={addRows} className='py-2 px-4 border rounded-md border-gray-300 bg-orange-400 text-white mx-1 hover:shadow-md duration-200' >Go To Warehouse </button>
          </div>
        </div>

        <div className='flex flex-row justify-between items-center px-4'>
          <span style={{ fontWeight: 500 }} className='py-2 px-1 rounded-lg text-2xl text-start my-2'>Work With Tables</span>
          <div className='text-xs' style={{ fontWeight: 500 }}>
            <button onClick={addCompany} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white hover:border-none duration-200' >Add Company</button>
            <button onClick={addOrdered} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white hover:border-none  duration-200' >Add Ordered</button>
            <button onClick={addGroup} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white hover:border-none  duration-200' >Add Group</button>
            <button onClick={addRows} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white hover:border-none  duration-200' >Add Row</button>
            <button onClick={delRows} className='py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white hover:border-none  duration-200' >Delete Row</button>
            <button onClick={postFunc} className='py-2 px-5 border rounded-md border-gray-400 bg-white text-green-500 mx-2 hover:bg-green-500 hover:text-white duration-200' >Insert From Excel </button>
          </div>
        </div>

        {/* Table Information */}
        <div className='flex flex-row justify-between items-center mt-2 mb-5 px-5'>

          <div className='flex justify-start'>
            <div className='text-lg' >
              <p className='text-gray-400 text-md'>
                Total Row Size:
              </p>
              <span className='font-bold text-2xl'>
                {table.length}
              </span>
            </div>
            <div className='text-lg pl-40' >
              <p className='text-gray-400 text-md'>
                Total Received Price:
              </p>
              <span className='font-bold text-2xl'>
                {table.length}.00
              </span>
            </div>
          </div>

          <div>
            {
              !show_load ?
                <button onClick={postFunc} className='py-2 px-5 border rounded-md border-green-500 bg-green-500 text-white mx-2 hover:bg-white hover:text-green-500 duration-200' >Receive To Warehouse</button>
                :
                <LoadingButton loading variant="outlined" className='text-black'>
                   Please Submit
                </LoadingButton>
            }
          </div>

        </div>

      </div>

      <table>
        <CreateTableNavbarHeaderComponent />
        <TableBodyComponent />
      </table>

    </div>
  )
}

export default CreateMaterialPage