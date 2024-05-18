
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    table: [],
    table_check: [{}],
    table_size: 1,
    show_error: false,
}

export const createTableSlice = createSlice({

    name: 'createTableSlice',
    initialState,
    reducers: {
        // This function for iterate table size time component and send new component data to main table
        addTableCheck: (state) => {
            state.table_check.push({});
        },
        addRow: (state, actions) => {
            if(state.table.length === 0){
                state.table.push(actions.payload.row);
            }
            else{
                let cond = true;
                for(let i of state.table){
                    if(i.ss === actions.payload.row.ss){
                        cond = false;
                        break;
                    }
                }
                if(cond){
                    state.table_size+=1;
                    state.table.push(actions.payload.row);
                }
            }

        },
        delRow: (state) => {
            if(state.table_check.length>1){
                state.table_check.pop();
                state.table.pop();
            }
            else{
               state.show_error = true;
            }
        },
        updateRow: (state, actions) => {
            let updated_row = state.table.find((row) => row.ss === actions.payload.ss);
            updated_row[actions.payload.name] = actions.payload.value;
            //updateRow[actions.payload.second_name] = actions.payload.second_val;
            // console.log('-> ', actions.payload);
            if(actions.payload.second_name){
                console.log('if work');
                updated_row[actions.payload.second_name] = actions.payload.second_val;
            }
            else{
                console.log('else work');
            }
            console.log('update row is work');
        },
        setShowFalse: (state) => {
            state.show_error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postFuncStore.fulfilled, (state, action) => {

        })
    }
});

export const postFuncStore = createAsyncThunk(
    'creatematerial/',
    async(table_data) => {
        for(let i of table_data){
            console.log('i is : ', i);
        }
    }
) 

export const {addTableCheck, addRow, delRow, updateRow, setShowFalse}  = createTableSlice.actions;

export default createTableSlice.reducer;