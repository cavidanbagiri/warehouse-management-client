import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../http/index.js";


class StockService{

    static getcStocks = createAsyncThunk(
        '/api/stock/getcStocks',
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

}

export default StockService;