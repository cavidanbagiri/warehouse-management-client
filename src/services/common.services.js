
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
            });
            return data;
        }
    )

    static getRowInform = createAsyncThunk(
        'rowinform/module/id',
        async(coming_data) => {
            let data = {};
            await $api.get(`/rowinform/${coming_data.module}/${coming_data.id}`)
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )

    static getTopCompanies = createAsyncThunk(
        'fetchtopcompanies/',
        async() => {
            let data = {};
            await $api.get('/topcompanies')
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )


    static getStockAnalyz = createAsyncThunk(
        '/stockanalyz/',
        async(projectId) => {
            let data = {};
            await $api.get(`/stockanalyz/${projectId}`)
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )

    static getGroupChartAnalyz = createAsyncThunk(
        'groupchartanalyz/',
        async(projectId) => {
            let data = {};
            await $api.get(`/groupchartanalyz/${projectId}`)
            .then((response) => {
                data.status = response.status;
                data.data = response.data;
            }).catch((err) => {
                data.status = err.response.status;
                data.data = err.response.data;
            });
            return data;
        }
    )

}

export default CommonService;