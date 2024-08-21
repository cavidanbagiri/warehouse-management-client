import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../http";



class UserService {

    static userLogin = createAsyncThunk(
        'users/login',
        async (user_data) => {
            let data = null;
            // await axios.post('http://localhost:3001/api/user/login', user_data)
            await axios.post(API_URL + '/user/login', user_data)
                .then((response) => {
                    data = response.data;
                }).catch((err)=>{
                    data = null;
                })
            return data;
        }
    );

    static refreshTokens = createAsyncThunk(
        'user/refresh',
        async () => {
            let data = null;
            // await axios.get('http://localhost:3001/api/user/refresh')
            await axios.get(API_URL + '/user/refresh')
                .then((response) => {
                    data = response.data;
                })
            return data;
        }
    )

   static userLogout = createAsyncThunk(
       '/users/logout',
       async ()=>{
        //    await axios.post('http://localhost:3001/api/user/logout')
           await axios.post('https://warehouse-management-server-c8n6.onrender.com/api'+'/user/logout')
           .then((response) => {
               console.log('user logout ',response);
           })
       }
   )

}


export default UserService;