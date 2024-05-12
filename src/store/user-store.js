
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $api from '../http';
axios.defaults.withCredentials = true;
const initialState = {
    user: {
        email: 'unknown'
    },
    is_admin: false,
    is_auth: false
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.is_auth = true;
            state.is_admin = action.payload.user.is_admin
            localStorage.setItem('token', action.payload.access);
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            
        })
        builder.addCase(refreshTokens.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.access);
            state.user = action.payload.user;
            state.is_auth = true;
            
        })
    }

});

export const userLogin = createAsyncThunk(
    'users/login',
    async (user_data) => {
        let data = {};
        await axios.post('http://localhost:3001/api/user/login', user_data)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('Error happen : ', err);
            })
        return data;
    }
);

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
export const refreshTokens = createAsyncThunk(
    'user/refresh',
    async () => {
        let data = null;
        await axios.get('http://localhost:3001/api/user/refresh')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log(' Refresh Error happen : ', err);
                return null;
            })
            return data;
    }
)

export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer