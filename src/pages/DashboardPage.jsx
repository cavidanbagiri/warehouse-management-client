
import React from 'react'
import { Link } from 'react-router-dom';


import TableRowComponent from '../components/creatematerial/table_row-component'
import { useSelector, useDispatch } from 'react-redux';

const DashboardPage = () => {

  // const table = useSelector((state) => state.createTableSlice.table);
  const companies = useSelector((state) => state.commonSlice.companies);

  return (
    <div style={{ fontFamily: "Saira Condensed", fontSize: '24px' }} className=' w-screen h-screen' >
      Welcome Back Jack
      <br />

    {/* <ul>
      {companies.map((item) => (
        <li key={item.id}>{item.company_name}</li>
      ))}
    </ul> */}

    {/* <ul>
      {table.map((item) => (
        <li key={item.num}>{item.num}</li>
      ))}
    </ul> */}

    </div>
  )
}

export default DashboardPage