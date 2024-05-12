
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../store/user-store';

export const store = configureStore({
  reducer: {
    userSlice: userSlice
  },
})
