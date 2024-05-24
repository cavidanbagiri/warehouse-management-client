
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";
import { IoCloudyNightOutline } from "react-icons/io5";


class CreateTableService {

    static receiveWarehouse = createAsyncThunk(
        'receivewarehouse/',
        async(common_data)=>{
            let data = {};
            await $api.post('/warehouse/receivewarehouse', common_data)
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