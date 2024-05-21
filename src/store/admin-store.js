
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AdminService from "../services/admin-service";

const initialState = {
    create_company_message: false,
    create_company_cond: false,
    create_ordered_message: false,
    create_ordered_cond: false,
    groups: [],
}

export const adminSlice = createSlice({

    name: 'adminSlice',
    initialState,
    reducers:{
        setCreateCompanyMessageFalse(state){
            state.create_company_message = false;
        },
        setCreateCompanyCondFalse(state){
            state.create_company_cond = false;
        },
        setCreateOrderedMessageFalse(state){
            state.create_ordered_message = false;
        },
        setCreateOrderedCondFalse(state){
            state.create_ordered_cond = false;
        }

    },
    extraReducers:(builder) => {
        builder.addCase(AdminService.createCompany.pending, (state, action)=>{
            state.create_company_cond = true;
        })
        builder.addCase(AdminService.createCompany.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.create_company_message = true;
                state.create_company_cond = false;
            }
        })
        builder.addCase(AdminService.createOrdered.pending, (state, action)=>{
            state.create_ordered_cond = true;
        })
        builder.addCase(AdminService.createOrdered.fulfilled, (state, action)=>{
            if(action.payload!==null){
                state.create_ordered_message = true;
                state.create_ordered_cond = false;
            }
        })
        builder.addCase(AdminService.fetchGroups.fulfilled, (state, action) => {
            console.log('action payload is : ', action.payload);
            if(action.payload!==null){
                state.groups = action.payload;
            }
        })
    }

})

export const { setCreateCompanyMessageFalse, setCreateCompanyCondFalse, setCreateOrderedMessageFalse, setCreateOrderedCondFalse } = adminSlice.actions;

export default adminSlice.reducer;