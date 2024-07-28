
import { createSlice } from "@reduxjs/toolkit";

import WarehouseService from "../services/warehouse-service";

const initialState = {
    warehouse_data: [],
    filtered_warehouse_data: [],
    selected_items: [],
    fetch_selected_items: null,

    po_data: {},

    order_information_toggle: false,

    warehouse_column_filter:{
        date: true,
        company: true,
        document: true,
        material_code: false,
        material_description: false,
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

    order_update:{
        order_update_toggle: false,
        order_update_message_box: false,
        order_update_error_message: '',
        order_update_pending: false,
        order_update_color_cond: 'bg-green-500',
    },

    addstock :{
        addstock_toggle: false,
        addstock_message_box: false,
        addstock_error_message: '',
        addstock_pending: false,
        addstock_color_cond: 'bg-green-500',
    },

}

export const warehouseSlice = createSlice({
    name: 'warehouseSlice',
    initialState,
    reducers:{

        // Work With Selection Rows
        selectRow: (state, action) => {state.selected_items.push(action.payload);},
        unselectRow: (state, action) => {state.selected_items = state.selected_items.filter((item)=>item!==action.payload);},
        clearSelected: (state) => {state.selected_items = []},

        // Order information
        setOrderSelectionInformationToggleTrue: (state) => {state.order_information_toggle = true;},
        setOrderSelectionInformationToggleFalse: (state) => {state.order_information_toggle = false;},


        // Update Section
        setOrderSelectionUpdateToggleTrue: (state) => {state.order_update.order_update_toggle = true;},
        setOrderSelectionUpdateToggleFalse: (state) => {state.order_update.order_update_toggle = false;},
        setOrderUpdateMessageBoxFalse: (state) => {state.order_update.order_update_message_box = false;},
        setOrderUpdateMessageBoxTrue: (state) => {state.order_update.order_update_message_box = true;},
        setOrderUpdateErrorMessage: (state, action) => {state.order_update.order_update_error_message = action.payload.message;},
        setOrderUpdateColorCond: (state, action) => {state.order_update.order_update_color_cond = action.payload.color;},

        // Add Stock
        addStockToggleTrue: (state) => {state.addstock.addstock_toggle = true;},
        addStockToggleFalse: (state) => {state.addstock.addstock_toggle = false;},
        setAddStockMessageBoxTrue: (state) => {state.addstock.addstock_message_box = true;},
        setAddStockMessageBoxFalse: (state) => {state.addstock.addstock_message_box = false;},
        setAddStockMessageBoxMessage: (state, action) => {state.addstock.addstock_error_message = action.payload;},
        setAddStockColorCond: (state, action) => {state.addstock.addstock_color_cond = action.payload.color;},

        // Warehouse Filter
        setWarehouseColumnFilter: (state, action) => {state.warehouse_column_filter[action.payload.key] = action.payload.value;},


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


        // -------------------------------------------------------------- Update Data Section
        builder.addCase(WarehouseService.updatePO.pending, (state)=>{
            state.order_update.order_update_pending = true;
        })
        builder.addCase(WarehouseService.updatePO.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_update.order_update_pending = false;
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = 'Data Successfully Updated';
                state.order_update.order_update_color_cond = 'bg-green-500';
            }
            else if(action.payload.status === 500){
                state.order_update.order_update_pending = false;
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.data;
                state.order_update.order_update_color_cond = 'bg-red-500';
            }
        })
        builder.addCase(WarehouseService.updateCertOrPassportById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                const item = state.filtered_warehouse_data.find((item)=>item.id===action.payload.id);
                item.certificate = action.payload.certificate;
                item.passport = action.payload.passport;
            }
        })
        // ----------------------------------------------------------------------------------


        // -------------------------------------------------------------- Add Stock
        builder.addCase(WarehouseService.fetchSelectedItemsById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.fetch_selected_items = action.payload;
            }
        })
        builder.addCase(WarehouseService.receiveToStock.pending, (state)=>{state.addstock.addstock_pending = true;})
        builder.addCase(WarehouseService.receiveToStock.fulfilled, (state, action)=>{
            if(action.payload === 200){
                state.addstock.addstock_message_box = true;
                state.addstock.addstock_color_cond = 'bg-green-500';
                state.addstock.addstock_toggle = false;
                state.addstock.addstock_pending = false;
                state.addstock.addstock_error_message = 'Successfully Add To Stock';
            }
            else{
                state.addstock.addstock_message_box = true;
                state.addstock.addstock_pending = false;
                state.addstock.addstock_color_cond = 'bg-red-500';
                state.addstock.addstock_error_message = 'Entering amount greater than leftover.';
            }
        })

    }
})


export const {
    selectRow, unselectRow, clearSelected,
    setOrderSelectionInformationToggleTrue, setOrderSelectionInformationToggleFalse,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse,
    setOrderUpdateMessageBoxFalse, setOrderUpdateMessageBoxTrue,
    setWarehouseColumnFilter,
    setOrderUpdateErrorMessage,setOrderUpdateColorCond,
    addStockToggleTrue, addStockToggleFalse, setAddStockMessageBoxFalse,
    setAddStockMessageBoxMessage, setAddStockMessageBoxTrue, setAddStockColorCond,
    updatefetchSelectedItems
} = warehouseSlice.actions;


export default warehouseSlice.reducer;