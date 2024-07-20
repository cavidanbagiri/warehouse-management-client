
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $api from '../http';
import UserService from "../services/user-service.js";
axios.defaults.withCredentials = true;
const initialState = {
    user: {
        email: 'unknown',
        projectId: 0
    },
    is_admin: false,
    is_auth: false,
    is_login_error: false,
    user_status: 0,
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
            if (action.payload !== null) {
                state.user = action.payload.user;
                state.is_auth = true;
                state.is_admin = action.payload.user.is_admin
                state.user.projectId = action.payload.user.projectId
                localStorage.setItem('token', action.payload.access);
                localStorage.setItem('status_code', action.payload.user.status_code)
                localStorage.setItem('projectId', action.payload.user.projectId);
                state.user_status = action.payload.user.status_code;
                state.is_login_error = false;
            }
            else {
                console.log('else work')
                state.is_login_error = true;
            }
        })
        builder.addCase(UserService.refreshTokens.fulfilled, (state, action) => {
            if (action.payload != null) {
                console.log('object : ', action.payload);
                localStorage.setItem('token', action.payload.access);
                state.user = action.payload.user;
                state.user.projectId = action.payload.user.projectId
                state.is_auth = true;
            }
        })
        builder.addCase(UserService.userLogout.fulfilled, (state, action) => {
            localStorage.clear();
            state.user = {
                email: 'unknown'
            }
            state.is_auth = false;
            state.projectId = 0;

        })
    }

});

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


export const { setUserStatus } = userSlice.actions

export default userSlice.reducer;