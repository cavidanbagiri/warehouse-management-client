
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommonService from "../services/common.services";
import AdminService from "../services/admin-service";

const initialState = {
    companies: [],
    projects: [],
    ordereds: [],
    type_count: [],
    groups: [],


    row_inform: {
        toggle: false,
        pending: false,
        data: {},
    },

    filtered_groups: [],

    material_code:{
        material_codes: [],
    },
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers:{

        filterGroup (state, action) {
            let dummy = state.groups.filter((el)=>{
                return el.group_name.includes(action.payload);
            })
            state.filtered_groups = dummy;
        },

        rowInformToggleTrue: (state) => {state.row_inform.toggle = true; },
        rowInformToggleFalse: (state) => {state.row_inform.toggle = false; },

    },
    extraReducers: (builder) => {
        
        builder.addCase(CommonService.fetchCompanies.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.companies = action.payload;
            }
        }),

        builder.addCase(CommonService.filterCompanies.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.companies = action.payload;
            }
        }),

        builder.addCase(CommonService.fetchProjects.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.projects = action.payload;
            }
        }),

        // Ordered
        builder.addCase(CommonService.fetchOrdereds.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.ordereds = action.payload;
            }
        }),
        builder.addCase(CommonService.filterOrdereds.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.ordereds = action.payload;
            }
        }),

        builder.addCase(CommonService.getTypeCount.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.type_count = action.payload;
            }
        })
        builder.addCase(CommonService.fetchGroups.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.groups = action.payload;
                state.filtered_groups = action.payload;
            }
        })
        builder.addCase(AdminService.fetchMaterialCodes.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.material_code.material_codes = action.payload.data;
            }
        })
        builder.addCase(AdminService.filterMaterialCodes.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.material_code.material_codes = action.payload.data;
            }
        })

        // Row Information

        builder.addCase(CommonService.getRowInform.pending, (state, action) => {
            state.row_inform.pending = true;
        })
        builder.addCase(CommonService.getRowInform.fulfilled, (state, action) => {
            state.row_inform.pending = false;
            if(action.payload.status === 200){
                state.row_inform.data = action.payload.data;
            }
        })

    }
})

export const { filterGroup, rowInformToggleFalse, rowInformToggleTrue } = commonSlice.actions;


export default commonSlice.reducer;