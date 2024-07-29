
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

class AreaService {

    static fetchAreas = createAsyncThunk(
        'area/fetchareas/',
        async (projectId) => {
            let data = {};
            await $api.get(`/area/fetchareas/${projectId}`)
                .then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                })
                .catch((err) => {
                    console.log('fetch areas Error happen : ', err);
                });
            return data;
        }
    )

    static filterAreaData = createAsyncThunk(
        '/area/filter',
        async (filter_query) => {
            let data = {};
            let query = '?';
            for (let [key, value] of Object.entries(filter_query)) {
                if (value !== '') {
                    query += `${key}=${value}&`;
                }
            }
            await $api.get(`/area/filter/${query}`)
                .then((response) => {
                    data = response.data;
                }).catch((err) => {
                    console.log('fetch warehouse data Error happen : ', err);
                });
            return data;
        }
    )

    static getById = createAsyncThunk(
        '/area/:id',
        async (id) => {
            let data = {};
            await $api.get(`/area/${id}`).
                then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                })
                console.log('getById data : ',data);
            return data;
        }
    )

    static updateArea = createAsyncThunk(
        '/area/update',
        async (updated_data) => {
            let data = {};
            await $api.post(`/area/update`, updated_data).
                then((response) => {
                    console.log('coming response : ', response);
                    data.status = response.status;
                })
                .catch((err) => {
                    data.status = 404;
                })
            return data;
        }
    )

    static returnToStock = createAsyncThunk(
        '/area/return',
        async (return_data) => {
            let data = {};
            await $api.post(`/area/return`, return_data).
                then((response) => {
                    data.status = response.status;
                    data.data = response.data;
                })
                .catch((err) => {
                    data.status = err.response.status;
                    data.data = err.response.data;
                })
            console.log('return data is : ', data);
            return data;
        }
    )

}

export default AreaService