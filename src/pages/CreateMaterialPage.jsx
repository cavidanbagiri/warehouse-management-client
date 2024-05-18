import React from 'react'
import CreateTableNavbarHeaderComponent from '../components/creatematerial/TableHeaderComponent'
import TableBodyComponent from '../components/creatematerial/TableBodyComponent'
import { useSelector, useDispatch } from 'react-redux';
import { addTableCheck, delRow, setShowFalse, postFuncStore } from '../store/create_table-store';
import ErrorMessage from '../layouts/ErrorMessage';
function CreateMaterialPage() {
  const table = useSelector((state) => state.createTableSlice.table);
  const table_size = useSelector((state) => state.createTableSlice.table_size);
  const show_error = useSelector((state) => state.createTableSlice.show_error);
  const dispatch = useDispatch();

  function addRows() {
    dispatch(addTableCheck());
  }
  function delRows() {
    dispatch(delRow());
    setTimeout(() => {
      dispatch(setShowFalse())
    }, 1000)
  }
  function postFunc() {
    console.log('clicked');
    dispatch(postFuncStore(table));
  }

  return (
    <div style={{ fontFamily: 'Saira Condensed' }} className='flex flex-col  p-2'>

      {
        show_error && <ErrorMessage message={'Minimum Row Size Must Be One'} />
      }
      {/* {table.length}
      <ul>
      
        {table.map((item, index) => (
          // <TableRowComponent key={index + 1} index={index + 1} />
          <div key={item.ss}>
            <span >  {item.project}</span>
            <span >  {item.document}</span>
            <span >  {item.company}</span>
            <span >  {item.material_name}</span>
            <span >  {item.qty}</span>
            <span >  {item.unit}</span>
            <span >  {item.price}</span>
            <span >  {item.currency}</span>
          </div>
        ))}
      
      </ul>  */}

      <div className='flex flex-col justify-between'>
        <span className='text-4xl text-start text-gray-400 my-2'>Add Material To Warehouse</span>
        <div className='flex justify-between my-1 items-center'>
          <div className='text-lg' >
            Total Created Row: {table.length}
          </div>
          <div>
          <button onClick={addRows} className='py-2 px-5 bg-slate-900 text-white mx-1 hover:bg-slate-500 duration-300' >Add Row</button>
          <button onClick={delRows} className='py-2 px-5 bg-slate-900 text-white mx-1 hover:bg-slate-500 duration-300' >Del Row</button>
          <button onClick={postFunc} className='py-2 px-5 bg-green-500 text-white mx-1 hover:bg-green-300 duration-300' >Post</button>
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