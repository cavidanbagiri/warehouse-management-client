import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import $api, { API_URL } from "../http";



class UserService {

    static userLogin = createAsyncThunk(
        'users/login',
        async (user_data) => {
            let data = null;
            await $api.post('/user/login', user_data)
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
            await $api.post('/user/refresh')
                .then((response) => {
                    data = response.data;
                })
            return data;
        }
    )

   static userLogout = createAsyncThunk(
       '/users/logout',
       async ()=>{
           await $api.post('/user/logout')
           .then((response) => {
               console.log('user logout ',response);
           })
       }
   )

}


export default UserService;