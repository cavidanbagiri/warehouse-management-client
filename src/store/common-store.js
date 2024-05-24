
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommonService from "../services/common.services";

const initialState = {
    companies: [],
    projects: [],
    users: [],
}

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers:{
        filterCompany (state, action) {
            const filtered_object = state.companies.filter(function(elem){
                return elem.company_name.includes(action.payload);
            })
            console.log('filter : ', filtered_object);
        },
        filterOrdered (state, action) {
            console.log('ordered action : ', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CommonService.fetchCompanies.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.companies = action.payload;
            }
            console.log('companies : ', state.companies);
        }),
        builder.addCase(CommonService.fetchProjects.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.projects = action.payload;
            }
        }),
        builder.addCase(CommonService.fetchUsers.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.users = action.payload;
            }
        })
    }
})

export const { filterCompany, filterOrdered} = commonSlice.actions;


export default commonSlice.reducer;