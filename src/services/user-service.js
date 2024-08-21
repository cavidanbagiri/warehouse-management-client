import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import $api, { API_URL } from "../http";



class UserService {

    static userLogin = createAsyncThunk(
        'users/login',
        async (user_data) => {
            let data = null;
            // await axios.post('http://localhost:3001/api/user/login', user_data)
            console.log('login is : ',API_URL + '/user/refresh');
            await axios.post($api + '/user/login', user_data)
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
            console.log('refresh is : ',API_URL + '/user/refresh');
            await axios.post($api + '/user/refresh')
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
           await axios.post($api+'/user/logout')
           .then((response) => {
               console.log('user logout ',response);
           })
       }
   )

}


export default UserService;