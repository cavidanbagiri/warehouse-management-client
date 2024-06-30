import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../http/index.js";


class StockService{

    static getcStocks = createAsyncThunk(
        '/api/stock/getStocks',
        async ()=>{
            let data = {};
            await $api.get('/stock')
                .then((response) => {
                    data = response.data;
                })
                .catch((err) => {
                    console.log('fetch stock Error happen : ', err);
                })
            return data;
        }
    )

    static filterStockData = createAsyncThunk(
        '/stock/filter',
        async(filter_query) => {
            let data = {};
            let query = '?';
            for(let [key, value] of Object.entries(filter_query)){
                if(value!==''){
                    query+=`${key}=${value}&`;
                }
            }
            await $api.get(`/stock/filter/${query}`)
                .then((response) => {
                    data = response.data;
                }).catch((err) => {
                    console.log('fetch warehouse data Error happen : ', err);
                });
            return data;
        }
    )

    static getById = createAsyncThunk(
        '/stock/:id',
        async(id) => {
            let data = {};
            await $api.get(`/stock/${id}`).
            then((response)=>{
                data = response.data;
                console.log('comming data ',data);
            })
                .catch((err)=>{
                    console.log('Get Row Id Error : ', err);
                })
            return data;
        }
    )

    static updateStock = createAsyncThunk(
        '/stock/update',
        async(updated_data) => {
            let data = {};
            await $api.post(`/stock/update`, updated_data).
            then((response)=>{
                data.status = response.status;
            })
                .catch((err)=>{
                    data.status = 404;
                })
            return data;
        }
    )

    static returnToWarehouse = createAsyncThunk(
        '/stock/return',
        async(updated_data) => {
            let data = {};
            await $api.post(`/stock/return`, updated_data).
            then((response)=>{
                data = response;
            })
                .catch((err)=>{
                    console.log('Return Id Error : ', err);
                    data = err.response;
                })
            return data;
        }
    )

}

export default StockService;