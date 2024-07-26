import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class AdminService {

    static createCompany = createAsyncThunk(
        '/createcompany',
        async(company_data) => {
            let data = {};
            await $api.post('/admin/createcompany', company_data)
            .then((response)=>{
                data.status = response.status
                data.data = response.data
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data;
            })
            console.log('created data is : ', data);
            return data;
        }
    )
    
    static fetchCompanies = createAsyncThunk(
        '/companies',
        async()=>{
            let data = {};
            await $api.get('/admin/companies')
            .then((response)=>{
                data.status = response.status
                data.data = response.data;
            })
            .catch((err)=>{
                console.log('fetch companies error : ', err);
            })
            console.log('companys data : ', data);
            return data;
        }
    )

    static createOrdered = createAsyncThunk(
        '/createordered',
        async(ordered_data) => {
            let data = {};
            await $api.post('/admin/createordered', ordered_data)
            .then((response)=>{
                data.status = response.status
                data.data = response.data
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data;
            })
            console.log('created data is : ', data);
            return data;
        }
    )

    static fetchOrdereds = createAsyncThunk(
        '/fetchordereds',
        async()=>{
            let data = {};
            await $api.get('/admin/fetchordereds')
            .then((response)=>{
                data.status = response.status
                data.data = response.data;
            })
            .catch((err)=>{
                console.log('fetch ordereds error : ', err);
            })
            return data;
        }
    )

    static createUser = createAsyncThunk(
        '/user/createuser',
        async(user_data) => {
            let data = {};
            await $api.post('/user/register', user_data)
            .then((response)=>{
                data.status = response.status
                data.data = response.data
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data;
            })
            return data;
        }
    )

    static fetchUsers = createAsyncThunk(
        '/users',
        async()=>{
            let data = {};
            await $api.get('/admin/users')
            .then((response)=>{
                data.status = response.status
                data.data = response.data;
            })
            .catch((err)=>{
                console.log('fetch users error : ', err);
            })
            return data;
        }
    )

    static createGroup = createAsyncThunk(
        '/creategroup',
        async(group_data) => {
            let data = {};
            await $api.post('/admin/creategroup', group_data)
            .then((response)=>{
                data.status = response.status
                data.data = response.data
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data;
            })
            return data;
        }
    )

    static fetchGroups = createAsyncThunk(
        '/groups',
        async()=>{
            let data = {};
            await $api.get('/admin/groups')
            .then((response)=>{
                data.status = response.status
                data.data = response.data;
            })
            .catch((err)=>{
                console.log('fetch groups error : ', err);
            })
            return data;
        }
    )

    static createProject = createAsyncThunk(
        '/createproject',
        async(group_data) => {
            let data = {};
            await $api.post('/admin/createproject', group_data)
            .then((response)=>{
                data.status = response.status
                data.data = response.data
            })
            .catch((err)=>{
                data.status = err.response.status;
                data.data = err.response.data;
            })
            return data;
        }
    )

    static fetchProjects = createAsyncThunk(
        '/projects',
        async()=>{
            let data = {};
            await $api.get('/admin/projects')
            .then((response)=>{
                data.status = response.status
                data.data = response.data;
            })
            .catch((err)=>{
                console.log('fetch projects error : ', err);
            })
            console.log('coming data', data.data);
            return data;
        }
    )

    static fetchUserStatus = createAsyncThunk(
        '/fetchuserstatus',
        async()=>{
            let data = null;
            await $api.get('/admin/fetchuserstatus')
            .then((response)=>{
                data = response.data;
            })
            .catch((err)=>{
                console.log('fetch projects error : ', err);
            })
            console.log('-> ',data);
            return data;
        }
    )

}

export default AdminService;