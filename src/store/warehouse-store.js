
import { createSlice } from "@reduxjs/toolkit";

import WarehouseService from "../services/warehouse-service";
import {unstable_ClassNameGenerator} from "@mui/material";

const initialState = {
    warehouse_data: [],
    filtered_warehouse_data: [],
    selected_items: [],
    po_data: {},
    order_information_toggle: false,
    order_update_toggle: false,
    order_update_message_box: false,
    order_update_error_message: '',
}

export const warehouseSlice = createSlice({
    name: 'warehouseSlice',
    initialState,
    reducers:{
        selectRow: (state, action) => {
            state.selected_items.push(action.payload);
        },
        unselectRow: (state, action) => {
            state.selected_items = state.selected_items.filter((item)=>item!==action.payload);
        },
        setOrderSelectionInformationToggleTrue: (state, action) => {
            state.order_information_toggle = true;
        },
        setOrderSelectionInformationToggleFalse: (state, action) => {
            state.order_information_toggle = false;
        },
        setOrderSelectionUpdateToggleTrue: (state, action) => {
            state.order_update_toggle = true;
        },
        setOrderSelectionUpdateToggleFalse: (state, action) => {
            state.order_update_toggle = false;
        },
        setOrderUpdateMessageBoxFalse: (state, action) => {
          state.order_update_message_box = false;
        },
        setOrderUpdateMessageBoxTrue: (state, action) => {
            state.order_update_message_box = true;
        },
        setorderUpdateErrorMessage: (state, action) => {
            console.log(action.payload);
            state.order_update_error_message = action.payload.message;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(WarehouseService.fetchWarehouseData.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.warehouse_data = action.payload;
                state.filtered_warehouse_data = action.payload;
            }
        }),
        builder.addCase(WarehouseService.filterWarehouseData.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.filtered_warehouse_data = action.payload;
            }
        }),
        builder.addCase(WarehouseService.getPOById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        }),
            builder.addCase(WarehouseService.updatePO.pending, (state, action)=>{
                state.order_update_message_box = true;
            })
            builder.addCase(WarehouseService.updatePO.fulfilled, (state, action)=>{
            if(action.payload!==null){
                console.log(action.payload);
            }
        })
    }
})


export const { selectRow, unselectRow, 
    setOrderSelectionInformationToggleTrue, setOrderSelectionInformationToggleFalse,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxFalse, setOrderUpdateMessageBoxTrue, setorderUpdateErrorMessage
} = warehouseSlice.actions;


export default warehouseSlice.reducer;