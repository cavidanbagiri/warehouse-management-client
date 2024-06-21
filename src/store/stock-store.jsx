

import { createSlice } from "@reduxjs/toolkit";
import StockService from "../services/stock-service.js";
import WarehouseService from "../services/warehouse-service.js";

const initialState = {
    filter_stock_data: [],
    stock_column_filter:{
        date: true,
        company: false,
        document: false,
        material_name: true,
        type: true,
        qty: false,
        stock: true,
        serial_number: false,
        material_id: false,
        unit: true,
        price: false,
        currency: false,
        ordered: true,
        po: false,
        certificate: true,
        passport: true
    }
}

export const stockSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers:{
        setStockColumnFilter: (state, action) => {
            state.stock_column_filter[action.payload.key] = action.payload.value;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(StockService.getcStocks.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.filter_stock_data = action.payload;
            }
        })
        builder.addCase(StockService.filterStockData.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.filter_stock_data = action.payload;
            }
        })
    }
})

// eslint-disable-next-line no-empty-pattern
export const {
    setStockColumnFilter
} = stockSlice.actions;


export default stockSlice.reducer;