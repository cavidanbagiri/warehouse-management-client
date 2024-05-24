
import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";

class CommonService {

    static fetchCompanies = createAsyncThunk(
        'fetchcompanies/',
        async() => {
            let data = {};
            await $api.get('/companies')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch companies Error happen : ', err);
            });
            return data;
        }
    );

    static fetchProjects = createAsyncThunk(
        'fetchprojects/',
        async() => {
            let data = {};
            await $api.get('/projects')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch projects Error happen : ', err);
            });
            return data;
        }
    );

    static fetchUsers = createAsyncThunk(
        'fetchusers/',
        async() => {
            let data = {};
            await $api.get('/users')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch users Error happen : ', err);
            });
            return data;
        }
    );

    

}

export default CommonService;