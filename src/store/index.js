
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../store/user-store';
import createTableSlice  from './create_table-store';
import commonSlice from './common-store';

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    createTableSlice: createTableSlice,
    commonSlice: commonSlice,
  },
})
