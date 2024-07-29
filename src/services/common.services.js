
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

    static filterCompanies = createAsyncThunk(
        'filtercompanies/',
        async(values) => {
            let data = {};
            await $api.get('/filtercompanies/?company_name='+values)
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

    static fetchOrdereds = createAsyncThunk(
        'fetchusers/',
        async() => {
            let data = {};
            await $api.get('/ordereds')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch users Error happen : ', err);
            });
            return data;
        }
    );

    static filterOrdereds = createAsyncThunk(
        'filterordereds/',
        async(value) => {
            let data = {};
            await $api.get(`/filterordereds/?ordered=${value}`)
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                console.log('fetch users Error happen : ', err);
            });
            return data;
        }
    );

    static getTypeCount = createAsyncThunk(
        '/typecount',
        async(projectId) => {
            let data = {};
            await $api.get(`/warehouse/typecount/${projectId}`)
            .then((response)=>{
                data = response.data
            }).catch((err)=>{
                console.log('Error Happen Type Count : ', err);
            })
            return data;
        }
    )

    static fetchGroups = createAsyncThunk(
        'fetchgroups/',
        async() => {
            let data = {};
            await $api.get('/groups')
            .then((response) => {
                data = response.data;
            }).catch((err) => {
                data = null;
                console.log('fetch groups Error happen : ', err);
            });
            return data;
        }
    )


}

export default CommonService;