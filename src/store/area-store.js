

import { createSlice } from '@reduxjs/toolkit';
import AreaService from '../services/area-service';
const initialState = {

    area_data: [],
    filtered_area_data: [],
    area_pending: false,

    selected_items: [],

    po_data: {},

    order_update: {
        order_update_toggle: false,
        order_update_message_box: false,
        order_update_error_message: '',
        order_update_pending: false,
        order_update_color_cond: 'bg-green-500',
    },

    order_return: {
        order_return_toggle: false,
        order_return_message_box: false,
        order_return_error_message: '',
        order_return_pending: false,
        order_return_color_cond: 'bg-green-500',
    },

    area_column_filter: {
        card_number: true,
        username: true,
        material_code: false,
        material_description: false,
        material_name: true,
        qty: true,
        unit: true,
        type: true,
        group_name: true,
        serial_number: true,
        material_id: true,
        deliver_date: true,
        provideType: true,
        po: true,
    },

}

export const areaSlice = createSlice({
    name: 'areaSlice',
    initialState,
    reducers: {

        // Selected Row Section
        selectRow: (state, action) => {state.selected_items.push(action.payload);},
        unselectRow: (state, action) => {state.selected_items = state.selected_items.filter((item)=>item!==action.payload)},
        clearSelected: (state) => {state.selected_items = [];},

        setAreaColumnFilter: (state, action) => { state.area_column_filter[action.payload.key] = action.payload.value; },
        
        // Order Update Section
        setOrderSelectionUpdateToggleTrue: (state) => {state.order_update.order_update_toggle = true;},
        setOrderSelectionUpdateToggleFalse: (state) => {state.order_update.order_update_toggle = false;},
        setOrderUpdateMessageBoxTrue: (state) => {state.order_update.order_update_message_box = true;},
        setOrderUpdateMessageBoxFalse: (state) => {state.order_update.order_update_message_box = false;},
        setOrderUpdateErrorMessage: (state, action) => {state.order_update.order_update_error_message = action.payload.message;},

        // Order Return To Warehouse Functions
        setOrderSelectionReturnToggleTrue: (state) => {state.order_return.order_return_toggle = true;},
        setOrderSelectionReturnToggleFalse: (state) => {state.order_return.order_return_toggle = false;},
        setOrderReturnMessageBoxFalse: (state) => {state.order_return.order_return_message_box = false;},
        setOrderReturnMessageBoxTrue: (state) => {state.order_return.order_return_message_box = true;},
        setOrderReturnErrorMessage: (state, action) => {state.order_return.order_return_error_message = action.payload.message;},
        setOrderReturnColorCond: (state, action) => {state.order_return.order_return_color_cond = action.payload.color;},
        

    },
    extraReducers: (builder) => {

        // Fetch Areas Data
        builder.addCase(AreaService.fetchAreas.pending, (state) => { state.area_pending = true })
        builder.addCase(AreaService.fetchAreas.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.area_pending = false
                state.area_data = action.payload.data
                state.filtered_area_data = action.payload.data
            }
            else {
                state.area_pending = false
            }
        })

        // Filter Area Data
        builder.addCase(AreaService.filterAreaData.pending, (state) => { state.area_pending = true })
        builder.addCase(AreaService.filterAreaData.fulfilled, (state, action) => {
            state.area_pending = false
            state.filtered_area_data = action.payload
        })

        // Get Stock By Id
        builder.addCase(AreaService.getById.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.po_data = action.payload;
            }
        })


        // Update Selected Row
        builder.addCase(AreaService.updateArea.pending, (state)=>{state.order_update.order_update_pending = true;})
        builder.addCase(AreaService.updateArea.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_pending = false;
                state.order_update.order_update_color_cond = 'bg-green-500'
                state.order_update.order_update_toggle = false
                state.filtered_area_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['card_number'] = action.payload.data['card_number']
                        item['username'] = action.payload.data['username']
                    }
                })
            }
            else if(action.payload.status === 500){
                state.order_update.order_update_message_box = true;
                state.order_update.order_update_error_message = action.payload.msg;
                state.order_update.order_update_pending = false
                state.order_update.order_update_color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })


        // Return Area Section
        builder.addCase(AreaService.returnToStock.pending, (state)=>{state.order_return.order_return_pending = true})
        builder.addCase(AreaService.returnToStock.fulfilled, (state, action)=>{
            if(action.payload.status === 201){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.msg;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-green-500'
                state.order_return.order_return_toggle = false;
                state.filtered_area_data.map((item)=>{
                    if(item.id === action.payload.data.id){
                        item['qty'] = action.payload.data.qty
                    }
                })

            }
            else if(action.payload.status === 500){
                state.order_return.order_return_message_box = true;
                state.order_return.order_return_error_message = action.payload.msg;
                state.order_return.order_return_pending = false
                state.order_return.order_return_color_cond = 'bg-red-500'
            }
            else{
                console.log('Internal Server Error');
            }
        })

    }
})



export const { 
    setAreaColumnFilter,
    selectRow, unselectRow, clearSelected,
    setOrderSelectionUpdateToggleTrue, setOrderSelectionUpdateToggleFalse, setOrderUpdateMessageBoxTrue,setOrderUpdateMessageBoxFalse, setOrderUpdateErrorMessage,
    setOrderSelectionReturnToggleTrue, setOrderSelectionReturnToggleFalse, setOrderReturnMessageBoxTrue, setOrderReturnMessageBoxFalse, setOrderReturnErrorMessage,

 } = areaSlice.actions

export default areaSlice.reducer

