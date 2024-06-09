
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $api from '../http';
import UserService from "../services/user-service.js";
axios.defaults.withCredentials = true;
const initialState = {
    user: {
        email: 'unknown'
    },
    is_admin: false,
    is_auth: false,
    is_login_error: false,
    user_status: 0
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserStatus: (state) => {
            console.log(localStorage.getItem('status_code'));
            state.user_status = localStorage.getItem('status_code');
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(UserService.userLogin.fulfilled, (state, action) => {
            if(action.payload!==null){
                state.user = action.payload.user;
                state.is_auth = true;
                state.is_admin = action.payload.user.is_admin
                localStorage.setItem('token', action.payload.access);
                localStorage.setItem('status_code', action.payload.user.status_code)
                state.user_status = action.payload.user.status_code;
                state.is_login_error = false;
            }
            else{
                console.log('else work')
                state.is_login_error = true;
            }
        })
        builder.addCase(UserService.refreshTokens.fulfilled, (state, action) => {
            if(action.payload != null){
                localStorage.setItem('token', action.payload.access);
                state.user = action.payload.user;
                state.is_auth = true;
            }
        })
        builder.addCase(UserService.userLogout.fulfilled, (state, action) => {
            //if(action.payload != null){
                localStorage.clear();
                state.user = {
                    email: 'unknown'
                }
                state.is_auth = false;
                console.log('user 1 ',state.user);
                console.log('user 2 ',state.is_auth);
            //}
        })
    }

});

// export const userLogin = createAsyncThunk(
//     'users/login',
//     async (user_data) => {
//         let data = {};
//         await axios.post('http://localhost:3001/api/user/login', user_data)
//             .then((response) => {
//                 data = response.data;
//             }).catch((err) => {
//                 console.log('Error happen : ', err);
//             })
//         return data;
//     }
// );

export const fetchUsers = createAsyncThunk(
    'user/users',
    async () => {
        await $api.get('/user/users')
            .then((response) => {
                console.log('fetch users data is : ', response);
            }).catch((err) => {
                console.log('fetch Error happen : ', err);
            })
    }
)
// export const refreshTokens = createAsyncThunk(
//     'user/refresh',
//     async () => {
//         let data = null;
//         await axios.get('http://localhost:3001/api/user/refresh')
//             .then((response) => {
//                 data = response.data;
//             }).catch((err) => {
//                 console.log(' Refresh Error happen : ', err);
//                 data = null;
//             })
//             return data;
//     }
// )

export const { setUserStatus } = userSlice.actions

export default userSlice.reducer;