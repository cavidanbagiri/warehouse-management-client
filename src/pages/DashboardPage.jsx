
import React from 'react'
import { Link } from 'react-router-dom';


import TableRowComponent from '../components/creatematerial/table_row-component'
import { useSelector, useDispatch } from 'react-redux';

const DashboardPage = () => {

  const table = useSelector((state) => state.createTableSlice.table);

  // const table = state => state['createTableSlice'].nums;
  const nums = [1,2,3,4,5,6,123,13,124,34,32];

  const table_size = useSelector((state) => state.createTableSlice.table_size);

  return (
    <div style={{ fontFamily: "Saira Condensed", fontSize: '24px' }} className=' w-screen h-screen' >
      Welcome Back Jack
      <br />

    <ul>
      {table.map((item) => (
        <li key={item.num}>{item.num}</li>
      ))}
    </ul>

    </div>
  )
}

export default DashboardPage