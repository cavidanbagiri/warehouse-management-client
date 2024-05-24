import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


class AdminService {

    static createCompany = createAsyncThunk(
        '/createcompany',
        async(company_data) => {
            let data = {};
            await $api.post('/admin/createcompany', company_data)
            .then((response)=>{
                data = response.data
            })
            .catch((err)=>{
                console.log('Cant Create New Company');
            })
            return data;
        }
    )

    static createOrdered = createAsyncThunk(
        '/createordered',
        async(ordered_data) => {
            let data = {};
            await $api.post('/admin/createordered', ordered_data)
            .then((response)=>{
                data = response.data
            })
            .catch((err)=>{
                console.log('Cant Create New Ordered');
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
                data = response.data
            })
            .catch((err)=>{
                console.log('Cant Create New Group');
            })
            return data;
        }
    )

    static fetchGroups = createAsyncThunk(
        '/groups',
        async()=>{
            console.log('work for one times');
            let data = null;
            await $api.get('/admin/groups')
            .then((response)=>{
                data = response.data;
            })
            .catch((err)=>{
                console.log('fetch groups error : ', err);
            })
            return data;
        }
    )

}

export default AdminService;