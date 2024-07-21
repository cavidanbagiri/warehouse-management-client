
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
        order_provide_data: [],
        order_provide_entering_data: [],
        order_provide_message_box: false,
        order_provide_error_message: '',
        order_provide_pending: false,
        order_provide_color_cond: 'bg-green-500',
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
        
        // Order Provide Section
        setOrderSelectionProvideToggleTrue: (state) => {state.order_provide.order_provide_toggle = true;},
        setOrderSelectionProvideToggleFalse: (state) => {state.order_provide.order_provide_toggle = false;},
        setOrderProvideMessageBoxFalse: (state) => {state.order_provide.order_provide_message_box = false;},
        setOrderProvideMessageBoxTrue: (state) => {state.order_provide.order_provide_message_box = true;},
        setOrderProvideErrorMessage: (state, action) => {state.order_provide.order_provide_error_message = action.payload.message;},

        updateRow: (state, actions) => {
            let updated_row = state.order_provide.order_provide_entering_data.find((row) => row.ss === actions.payload.ss);
            updated_row[actions.payload.name] = actions.payload.value;

            if (actions.payload.second_name) {
                updated_row[actions.payload.second_name] = actions.payload.second_val;
            }
        },

        addRow: (state, actions) => {
            if (state.order_provide.order_provide_entering_data.length === 0) {
                state.order_provide.order_provide_entering_data.push(actions.payload.row);
            }
            else {
                let cond = true;
                for (let i of state.order_provide.order_provide_entering_data) {
                    if (i.ss === actions.payload.row.ss) {
                        cond = false;
                        break;
                    }
                }
                if (cond) {
                    state.order_provide.order_provide_entering_data.push(actions.payload.row);
                }
            }
        },

        delRow: (state) => {
            state.order_provide.order_provide_entering_data.pop();
        },
    
    },

    extraReducers:(builder)=>{

        // Get all stocks
        builder.addCase(StockService.getcStocks.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.filter_stock_data = action.payload;
            }
        })

        // Filter stocks
        builder.addCase(StockService.filterStockData.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.filter_stock_data = action.payload;
            }
        })

        // Get Stock By Id
        builder.addCase(StockService.getById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        })

        // Get all datas for providing to area
        builder.addCase(StockService.getDataByIds.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.order_provide.order_provide_data = action.payload;
            }else{
                state.order_provide.order_provide_data = [];
            }
        })

        // Provide Stock Section
        builder.addCase(StockService.provideStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_provide.order_provide_message_box = true;
                state.order_provide.order_provide_error_message = 'Successfully Provided';
                state.order_provide.order_provide_color_cond = 'bg-green-500';
            }
            else{
                state.order_provide.order_provide_message_box = true;
                state.order_provide.order_provide_error_message = action.payload.error;
                state.order_provide.order_provide_color_cond = 'bg-red-500';
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
    setOrderSelectionProvideToggleTrue, setOrderSelectionProvideToggleFalse, setOrderProvideMessageBoxTrue,setOrderProvideMessageBoxFalse, setOrderProvideErrorMessage,
    updateRow, addRow, delRow
} = stockSlice.actions;


export default stockSlice.reducer;