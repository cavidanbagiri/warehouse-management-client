
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../store/user-store';
import createTableSlice  from './create_table-store';
import commonSlice from './common-store';
import messageBoxSlice from './message_box-store';
import adminSlice from './admin-store';
import warehouseSlice from './warehouse-store';
import stockSlice from "./stock-store.jsx";



export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    createTableSlice: createTableSlice,
    commonSlice: commonSlice,
    messageBoxSlice,
    adminSlice,
    warehouseSlice,
    stockSlice
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
