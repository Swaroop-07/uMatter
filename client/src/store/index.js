import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authStore.js'
export default configureStore({
  reducer: {
    auth: authReducer
  },
})