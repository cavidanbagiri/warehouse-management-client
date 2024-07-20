
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommonService from "../services/common.services";

const initialState = {
    // get Company names
    companies: [],
    filtered_companies: [],
    // get Projects
    projects: [],
    // get Users
    users: [],
    filter_users: [],
    // get Type COunt
    type_count: [],
    // get Groups
    groups: [],
    filtered_groups: []
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers:{
        filterCompany (state, action) {
            let dummy = state.companies.filter((el)=>{
                return el.company_name.includes(action.payload);
            })
            state.filtered_companies = dummy;
        },
        filterOrdered (state, action) {
            let dummy = state.users.filter((el)=>{
                return el.username.includes(action.payload);
            })
            state.filter_users = dummy;
        },
        filterGroup (state, action) {
            let dummy = state.groups.filter((el)=>{
                return el.group_name.includes(action.payload);
            })
            state.filtered_groups = dummy;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CommonService.fetchCompanies.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.companies = action.payload;
                state.filtered_companies = action.payload;
            }
        }),
        builder.addCase(CommonService.fetchProjects.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.projects = action.payload;
            }
        }),
        builder.addCase(CommonService.fetchUsers.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.users = action.payload;
                state.filter_users = action.payload;
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
    }
})

export const { filterCompany, filterOrdered, filterGroup } = commonSlice.actions;


export default commonSlice.reducer;