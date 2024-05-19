
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class CreateTableService {

    static receiveWarehouse = createAsyncThunk(
        'receivewarehouse/',
        async(table_data)=>{
            let data = {};
            await $api.post('/warehouse/receivewarehouse', table_data)
            .then((response) => {
                data.status = response.status    
            }).catch((err) => {
                console.log('fetch companies Error happen : ', err);
            });
            return data;
        }
    )

}

export default CreateTableService;