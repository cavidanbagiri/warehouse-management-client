import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class WarehouseService {

    static fetchWarehouseData = createAsyncThunk(
        '/warehouse/',
        async() => {
            let data = {};
            await $api.get('/warehouse/')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch warehouse data Error happen : ', err);
            });
            return data;
        }
    );

    static getPOById = createAsyncThunk(
        '/warehouse/po/:id',
        async(id) => {
            let data = {};
            await $api.get(`/warehouse/po/${id}`).
            then((response)=>{
                data = response.data;
            })
            .catch((err)=>{
                console.log('Get Row Id Error : ', err);
            })
            return data;
        }
    )

    static updatePO = createAsyncThunk(
        '/warehouse/update/:id',
        async(updated_data) => {
            let data = {};
            console.log('updated data is : ', updated_data);
            await $api.post(`/warehouse/update/${updated_data.id}`, updated_data).
            then((response)=>{
                data = response.data;
                console.log('update respond data is : ', data);
            })
            .catch((err)=>{
                console.log('Get Row Id Error : ', err);
            })
            return data;
        }
    )

    static filterWarehouseData = createAsyncThunk(
        '/warehouse/filter',
        async(filter_query) => {
            let data = {};
            let query = '?';
            for(let [key, value] of Object.entries(filter_query)){
                if(value!==''){
                    query+=`${key}=${value}&`;
                }
            }
            await $api.get(`/warehouse/filter/${query}`)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch warehouse data Error happen : ', err);
            });
            return data;
        }
    )

}

export default WarehouseService;