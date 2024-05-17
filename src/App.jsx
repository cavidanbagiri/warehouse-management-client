import {
  Link,
  RouterProvider,
} from "react-router-dom";
import router from './router/index.jsx';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokens } from "./store/user-store.js";
import CommonService from "./services/common.services.js";



function App() {

  const is_auth = useSelector((state)=>state.userSlice.is_auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(is_auth == false){
      dispatch(refreshTokens());
    }
    if(is_auth){
      dispatch(CommonService.fetchCompanies());
      dispatch(CommonService.fetchProjects());
      dispatch(CommonService.fetchUsers());
    }
  });


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
