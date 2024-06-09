import {
  RouterProvider,
} from "react-router-dom";
import router from './router/index.jsx';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonService from "./services/common.services.js";
import UserService from "./services/user-service.js";



function App() {

  const is_auth = useSelector((state)=>state.userSlice.is_auth);
  const dispatch = useDispatch();
    

  useEffect(()=>{
    if(is_auth === false){
      dispatch(UserService.refreshTokens());
    }
    if(is_auth){
      dispatch(CommonService.fetchCompanies());
      dispatch(CommonService.fetchProjects());
      dispatch(CommonService.fetchUsers());
      dispatch(CommonService.getTypeCount());
    }
  });

  // useEffect(()=>{
  //   // dispatch(CommonService.getTypeCount());
  // }, [type_count])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
