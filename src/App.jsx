import {
  RouterProvider,
} from "react-router-dom";
import router from './router/index.jsx';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommonService from "./services/common.services.js";
import UserService from "./services/user-service.js";
import {setUserStatus} from "./store/user-store.js";



function App() {

  const dispatch = useDispatch();

  const is_auth = useSelector((state)=>state.userSlice.is_auth);
  const user = useSelector((state)=>state.userSlice.user);

  useEffect(()=>{
    if(is_auth === false){
      dispatch(UserService.refreshTokens());
    }
    if(is_auth){
      dispatch(setUserStatus());
      dispatch(CommonService.fetchCompanies());
      dispatch(CommonService.fetchProjects());
      dispatch(CommonService.fetchOrdereds());
      dispatch(CommonService.getTypeCount(user.projectId));
      dispatch(CommonService.fetchGroups());
    }
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
