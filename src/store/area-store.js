

import { createSlice } from '@reduxjs/toolkit';
import AreaService from '../services/area-service';
const initialState = {

    area_data: [],
    filtered_area_data: [],
    area_pending: false,

    area_column_filter: {
        card_number: true,
        username: true,
        material_name: true,
        qty: true,
        unit: true,
        type: true,
        group_name: true,
        serial_number: true,
        material_id: true,
        deliver_date: true,
        provideType: true,
        po: true,
    },

}

export const areaSlice = createSlice({
    name: 'areaSlice',
    initialState,
    reducers: {
        setAreaColumnFilter: (state, action) => { state.area_column_filter[action.payload.key] = action.payload.value; },
    },
    extraReducers: (builder) => {

        // Fetch Areas Data
        builder.addCase(AreaService.fetchAreas.pending, (state) => { state.area_pending = true })
        builder.addCase(AreaService.fetchAreas.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.area_pending = false
                state.area_data = action.payload.data
                state.filtered_area_data = action.payload.data
            }
            else {
                state.area_pending = false
                console.log('area is empty');
            }
        })

        // Filter Area Data
        builder.addCase(AreaService.filterAreaData.pending, (state) => { state.area_pending = true })
        builder.addCase(AreaService.filterAreaData.fulfilled, (state, action) => {
            state.area_pending = false
            state.filtered_area_data = action.payload
        })

    }
})



export const { setAreaColumnFilter } = areaSlice.actions

export default areaSlice.reducer

