
import { createSlice } from "@reduxjs/toolkit";

import StockService from "../services/stock-service.js";

const initialState = {

    po_data: {},

    filter_stock_data: [],

    selected_items: [],

    stock_column_filter:{
        date: true,
        company: false,
        document: false,
        material_name: true,
        type: true,
        qty: true,
        stock: true,
        serial_number: true,
        material_id: true,
        unit: true,
        price: false,
        currency: false,
        ordered: true,
        group: true,
        po: false,
    },

    order_information_toggle: false,

    order_provide: {
        order_provide_toggle: false,
    },

    order_update: {
        order_update_toggle: false,
        order_update_message_box: false,
        order_update_error_message: '',
        order_update_pending: false,
    },

    order_return: {
        order_return_toggle: false,
        order_return_message_box: false,
        order_return_error_message: '',
        order_return_pending: false,
        order_return_color_cond: 'bg-green-500',
    }

}

export const stockSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers:{

        // Column Filter Section
        setStockColumnFilter: (state, action) => {state.stock_column_filter[action.payload.key] = action.payload.value;},

        // Selected Row Section
        selectRow: (state, action) => {state.selected_items.push(action.payload);},
        unselectRow: (state, action) => {state.selected_items = state.selected_items.filter((item)=>item!==action.payload)},
        clearSelected: (state) => {state.selected_items = [];},

        // Row Information Section
        setOrderSelectionInformationToggleTrue: (state) => {state.order_information_toggle = true;},
        setOrderSelectionInformationToggleFalse: (state) => {state.order_information_toggle = false;},

        // Order Update Functions
        setOrderSelectionUpdateToggleTrue: (state) => {state.order_update.order_update_toggle = true;},
        setOrderSelectionUpdateToggleFalse: (state) => {state.order_update.order_update_toggle = false;},
        setOrderUpdateMessageBoxFalse: (state) => {state.order_update.order_update_message_box = false;},
        setOrderUpdateMessageBoxTrue: (state) => {state.order_update.order_update_message_box = true;},
        setOrderUpdateErrorMessage: (state, action) => {state.order_update.order_update_error_message = action.payload.message;},
        
        // Order Return To Warehouse Functions
        setOrderSelectionReturnToggleTrue: (state) => {state.order_return.order_return_toggle = true;},
        setOrderSelectionReturnToggleFalse: (state) => {state.order_return.order_return_toggle = false;},
        setOrderReturnMessageBoxFalse: (state) => {state.order_return.order_return_message_box = false;},
        setOrderReturnMessageBoxTrue: (state) => {state.order_return.order_return_message_box = true;},
        setOrderReturnErrorMessage: (state, action) => {state.order_return.order_return_error_message = action.payload.message;},
        setOrderReturnColorCond: (state, action) => {state.order_return.order_return_color_cond = action.payload.color;},
        
        setOrderSelectionProvideToggleTrue: (state) => {state.order_provide.order_provide_toggle = true;},
        setOrderSelectionProvideToggleFalse: (state) => {state.order_provide.order_provide_toggle = false;},
    
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

        // Update Stock Section
        builder.addCase(StockService.updateStock.pending, (state)=>{state.order_update.order_update_pending = true;})
        builder.addCase(StockService.updateStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = 'Successfully Update';
                state.order_update.order_update_pending = false;
            }
        })

        // Return Stock Section
        builder.addCase(StockService.returnToWarehouse.pending, (state)=>{state.order_return.order_return_pending = true})
        builder.addCase(StockService.returnToWarehouse.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = 'Successfully Returned';
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-green-500'
            }
            else if(action.payload.status === 500){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.data;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
            console.log('payload is L ',action.payload)
        })

    }
})

// eslint-disable-next-line no-empty-pattern
export const {
    setStockColumnFilter,
    selectRow, unselectRow, clearSelected,
    setOrderSelectionInformationToggleTrue, setOrderSelectionInformationToggleFalse, 
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse, setOrderUpdateMessageBoxTrue,setOrderUpdateMessageBoxFalse, setOrderUpdateErrorMessage,
    setOrderSelectionReturnToggleTrue, setOrderSelectionReturnToggleFalse, setOrderReturnMessageBoxTrue,setOrderReturnMessageBoxFalse, setOrderReturnErrorMessage, setOrderReturnColorCond,
    setOrderSelectionProvideToggleTrue, setOrderSelectionProvideToggleFalse,
} = stockSlice.actions;


export default stockSlice.reducer;