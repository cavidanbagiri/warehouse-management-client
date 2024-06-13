
import { createSlice } from "@reduxjs/toolkit";

import WarehouseService from "../services/warehouse-service";

const initialState = {
    warehouse_data: [],
    filtered_warehouse_data: [],
    selected_items: [],
    po_data: {},
    warehouse_column_filter:{
        date: true,
        company: true,
        document: true,
        material_name: true,
        type: true,
        qty: true,
        unit: true,
        price: true,
        currency: true,
        ordered: true,
        po: true,
        certificate: true,
        passport: true
    },
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
        clearSelected: (state) => {
            state.selected_items = [];
        },
        setOrderSelectionInformationToggleTrue: (state) => {
            state.order_information_toggle = true;
        },
        setOrderSelectionInformationToggleFalse: (state) => {
            state.order_information_toggle = false;
        },
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
        setorderUpdateErrorMessage: (state, action) => {
            state.order_update_error_message = action.payload.message;
        },
        setWarehouseColumnFilter: (state, action) => {
            state.warehouse_column_filter[action.payload.key] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(WarehouseService.fetchWarehouseData.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.warehouse_data = action.payload;
                state.filtered_warehouse_data = action.payload;
            }
        })
        builder.addCase(WarehouseService.filterWarehouseData.fulfilled, (state, action)=>{
            if(action.payload!==null){
                console.log('if ');
                state.filtered_warehouse_data = action.payload;
            }
        })
        builder.addCase(WarehouseService.getPOById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        })
        builder.addCase(WarehouseService.updatePO.pending, (state)=>{
            state.order_update_message_box = true;
        })
        builder.addCase(WarehouseService.updatePO.fulfilled, (state, action)=>{
            if(action.payload!==null){
                console.log(action.payload);
            }
        })
        builder.addCase(WarehouseService.updateCertOrPassportById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                const item = state.filtered_warehouse_data.find((item)=>item.id===action.payload.id);
                item.certificate = action.payload.certificate;
                item.passport = action.payload.passport;
            }
        })
    }
})


export const { selectRow, unselectRow, 
    setOrderSelectionInformationToggleTrue, setOrderSelectionInformationToggleFalse,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxFalse, setOrderUpdateMessageBoxTrue,
    setorderUpdateErrorMessage,setWarehouseColumnFilter,
    clearSelected
} = warehouseSlice.actions;


export default warehouseSlice.reducer;