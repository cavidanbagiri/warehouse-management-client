

import { createSlice } from "@reduxjs/toolkit";
import StockService from "../services/stock-service.js";

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
        serial_number: true,
        material_id: true,
        unit: true,
        price: false,
        currency: false,
        ordered: true,
        po: false,
        certificate: true,
        passport: true
    },
    selected_items: [],

    order_update_toggle: false,
    order_update_message_box: false,
    order_update_error_message: '',

    order_return_toggle: false,
    order_return_message_box: false,
    order_return_error_message: '',


    po_data: {},

}

export const stockSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers:{
        setStockColumnFilter: (state, action) => {
            state.stock_column_filter[action.payload.key] = action.payload.value;
        },

        selectRow: (state, action) => {
            state.selected_items.push(action.payload);
        },
        unselectRow: (state, action) => {
            state.selected_items = state.selected_items.filter((item)=>item!==action.payload);
        },
        clearSelected: (state) => {
            state.selected_items = [];
        },

        // Order Update Functions
        setOrderSelectionUpdateToggleTrue: (state) => {
            state.order_update_toggle = true;
        },
        setOrderSelectionUpdateToggleFalse: (state) => {
            state.order_update_toggle = false;
        },
        setOrderUpdateMessageBoxFalse: (state) => {
            state.order_update_message_box = false;
        },
        setOrderUpdateMessageBoxTrue: (state) => {
            state.order_update_message_box = true;
        },
        setOrderUpdateErrorMessage: (state, action) => {
            state.order_update_error_message = action.payload.message;
        },

        // Order Return To Warehouse Functions
        setOrderSelectionReturnToggleTrue: (state) => {
            state.order_return_toggle = true;
        },
        setOrderSelectionReturnToggleFalse: (state) => {
            state.order_return_toggle = false;
        },
        setOrderReturnMessageBoxFalse: (state) => {
            state.order_return_message_box = false;
        },
        setOrderReturnMessageBoxTrue: (state) => {
            state.order_return_message_box = true;
        },
        setOrderReturnErrorMessage: (state, action) => {
            state.order_return_error_message = action.payload.message;
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
        builder.addCase(StockService.getById.fulfilled, (state, action)=>{
            if(action.payload!==null){

                state.po_data = action.payload;
                // console.log('second coming data : ', state.po_data);
            }
        })
        builder.addCase(StockService.updateStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_update_message_box = true;
                state.order_update_error_message = 'Successfully Update';
            }
        })
        builder.addCase(StockService.returnToWarehouse.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_return_message_box = true;
                state.order_return_error_message = 'Successfully Returned';
            }
            else{
                state.order_return_message_box = true;
                state.order_return_error_message = 'Returned Amount Is Bigger than stock';
            }
        })

    }
})

// eslint-disable-next-line no-empty-pattern
export const {
    setStockColumnFilter,
    selectRow, unselectRow, clearSelected,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse, setOrderUpdateMessageBoxTrue,setOrderUpdateMessageBoxFalse, setOrderUpdateErrorMessage,
    setOrderSelectionReturnToggleTrue, setOrderSelectionReturnToggleFalse, setOrderReturnMessageBoxTrue,setOrderReturnMessageBoxFalse, setOrderReturnErrorMessage,
} = stockSlice.actions;


export default stockSlice.reducer;