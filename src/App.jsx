import {
  RouterProvider,
} from "react-router-dom";
import router from './router/index.jsx';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokens } from "./store/user-store.js";



function App() {

  const is_auth = useSelector((state)=>state.userSlice.is_auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(is_auth == false){
      dispatch(refreshTokens());
    }
  })

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
