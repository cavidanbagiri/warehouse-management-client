
import React, { useEffect } from 'react'


import { useSelector, useDispatch } from 'react-redux';

import CommonService from '../services/common.services';

import PageTitleComponent from '../components/dashboard/PageTitleComponent';
import MenuSideComponent from '../components/dashboard/MenuSideComponent';
import StockAnalyzComponent from '../components/dashboard/StockAnalyzComponent';
import MaterialTypeComponent from '../components/dashboard/MaterialTypeComponent';
import TypeInformComponent from '../components/dashboard/TypeInformComponent';
import GroupChartComponent from '../components/dashboard/GroupChartComponent';
import GroupListComponent from '../components/dashboard/GroupListComponent';

const DashboardPage = () => {

  const user = useSelector(state => state.userSlice.user);

  return (
    <div style={{ fontFamily: "IBM Plex Sans", fontSize: '24px' }} className='flex flex-col  bg-gray-100 ' >

      <PageTitleComponent user={user} />

      {/* <span className='ml-8 mt-5 text-5xl font-bold'>Dashboard</span> */}

      <MenuSideComponent />


      <div className='grid grid-cols-11 gap-1 mt-5'>

        <StockAnalyzComponent />

        <MaterialTypeComponent />

        <TypeInformComponent />

        <GroupChartComponent/>

        <GroupListComponent/>

      </div>

    </div>
  )
}

export default DashboardPage