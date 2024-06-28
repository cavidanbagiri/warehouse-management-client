
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
        leftover: true,
        unit: true,
        price: false,
        currency: false,
        ordered: true,
        po: true,
        certificate: true,
        passport: true
    },
    order_information_toggle: false,

    order_update_toggle: false,
    order_update_message_box: false,
    order_update_error_message: '',

    addstock_toggle: false,
    addstock_message_box: false,
    addstock_error_message: '',
    addstock_pending: false,

    fetch_selected_items: null,

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
        setOrderUpdateErrorMessage: (state, action) => {
            state.order_update_error_message = action.payload.message;
        },


        addStockToggleTrue: (state) => {
            state.addstock_toggle = true;
        },
        addStockToggleFalse: (state) => {
            state.addstock_toggle = false;
        },
        setAddStockMessageBoxTrue: (state) => {
            state.addstock_message_box = true;
        },
        setAddStockMessageBoxFalse: (state) => {
            state.addstock_message_box = false;
        },
        setAddStockMessageBoxMessage: (state, action) => {
            state.addstock_error_message = action.payload;
        },

        setWarehouseColumnFilter: (state, action) => {
            state.warehouse_column_filter[action.payload.key] = action.payload.value;
        },

        updatefetchSelectedItems: (state, action) => {
            const item = state.fetch_selected_items.find((item)=>item.id === action.payload.id);
            item['entered_amount'] = action.payload.entered_amount;
            item['serial_number'] = action.payload.serial_number;
            item['material_id'] = action.payload.material_id;
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
        builder.addCase(WarehouseService.fetchSelectedItemsById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.fetch_selected_items = action.payload;
            }
        })
        builder.addCase(WarehouseService.receiveToStock.pending, (state)=>{
            state.addstock_pending = true;
        })
        builder.addCase(WarehouseService.receiveToStock.fulfilled, (state, action)=>{
            if(action.payload === 200){
                state.addstock_message_box = true;
                state.addstock_toggle = false;
                state.addstock_pending = false;
                state.addstock_error_message = 'Successfully Add To Stock';
            }
            else{
                state.addstock_message_box = true;
                state.addstock_pending = false;
                state.addstock_error_message = 'Entering amount greater than leftover.';
            }
        })
    }
})


export const { selectRow, unselectRow, 
    setOrderSelectionInformationToggleTrue, setOrderSelectionInformationToggleFalse,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxFalse, setOrderUpdateMessageBoxTrue,
    setOrderUpdateErrorMessage,setWarehouseColumnFilter,
    addStockToggleTrue, addStockToggleFalse, setAddStockMessageBoxFalse,
    setAddStockMessageBoxMessage, setAddStockMessageBoxTrue,
    clearSelected, updatefetchSelectedItems
} = warehouseSlice.actions;


export default warehouseSlice.reducer;