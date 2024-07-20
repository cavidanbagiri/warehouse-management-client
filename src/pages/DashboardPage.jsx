
import React, { useEffect } from 'react'


import { useSelector, useDispatch } from 'react-redux';
import CommonService from '../services/common.services';

const DashboardPage = () => {

  const user = useSelector(state => state.userSlice.user);

  return (
    <div style={{ fontFamily: "Saira Condensed", fontSize: '24px' }} className=' w-screen h-screen' >
      Welcome Back {user.email} {user.projectId}
      <br />
    </div>
  )
}

export default DashboardPage