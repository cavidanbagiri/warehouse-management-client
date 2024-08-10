import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class WarehouseService {

    static fetchWarehouseData = createAsyncThunk(
        '/warehouse/',
        async(projectId) => {
            let data = {};
            await $api.get(`/warehouse/fetch/${projectId}`)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch warehouse data Error happen : ', err);
            });
            console.log('object data is : ', data);
            return data;
        }
    );

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
            await $api.post(`/warehouse/update/${updated_data.id}`, updated_data).
            then((response)=>{
                data.data = response.data.data;
                data.status = 201;
                data.msg = response.data.msg;
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data;
                data.msg = err.response.data;
            })
            return data;
        }
    )

    static updateCertOrPassportById = createAsyncThunk(
        '/warehouse/updatecertorpassportbyid',
        async(updated_data) => {
            let data = {};
            await $api.post(`/warehouse/updatecertorpassportbyid`, updated_data)
                .then((response) => {
                    console.log('coming response is : ', response);
                    data.data = response.data.data;
                    data.status = response.status;
                    data.msg = response.data.msg;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.data = err.response.data;
                    data.msg = err.response.data;
                })
            return data;
        }
    )

    static fetchSelectedItemsById = createAsyncThunk(
        '/warehouse/fetselecteditems',
        async(selected_ids) => {
            let data = {};
            await $api.post(`/warehouse/fetchselecteditems/`, selected_ids)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch selected ids error : ', err);
            })
            return data;
        }
    )

    static receiveToStock = createAsyncThunk(
        '/warehouse/receivetostock',
        async(selected_items) => {
            let data = {};
            await $api.post(`/warehouse/receivetostock`, selected_items)
                .then((respond)=>{
                    data.status = respond.status;
                    data.msg = respond.data.msg;
                    data.data = respond.data.data;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                });
            return data;
        }
    )

    static handleUploadClick = createAsyncThunk(
        '/warehouse/uploadcertificateorpassport',
        async(file) => {
            let data = {};
            await $api.post(`/warehouse/uploadcertificateorpassport`, file)
                .then((respond)=>{
                    data.status = respond.status;
                    data.msg = respond.data.msg;
                    data.data = respond.data.data;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.msg = err.response.data;
                    data.data = err.response.data;
                });
            return data;
        }
    )

    static fetchCertificatesOrPassports = createAsyncThunk(
        '/warehouse/fetchcertificatesorpassport',
        async(warehouseId) => {
            let data = {};
            await $api.get(`/warehouse/fetchcertificatesorpassport/${warehouseId}`)
                .then((respond)=>{
                    data.status = respond.status;
                    data.data = respond.data;
                }).catch((err)=>{
                    data.status = err.response.status;
                    data.msg = err.response.data;
                });
                console.log('coming datas are ', data);
            return data;
        }
    )

}

export default WarehouseService;