
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
                    console.log('coing data is : ', data);
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

}

export default AreaService