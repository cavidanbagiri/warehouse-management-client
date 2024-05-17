
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
    extraReducers: (builder) => {
        builder.addCase(CommonService.fetchCompanies.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.companies = action.payload;
            }
        }),
        builder.addCase(CommonService.fetchProjects.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.projects = action.payload;
            }
        }),
        builder.addCase(CommonService.fetchUsers.fulfilled, (state, action)=>{
            if(action.payload!==null){
                console.log('act : ', action.payload);
                state.users = action.payload;
            }
        })
    }
})


export default commonSlice.reducer;