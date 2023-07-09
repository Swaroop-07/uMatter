import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isAuthenticated : false,
    activeStep : 0,
    currentUser:[],
    blog:[]
  },
  reducers: {
    getUser: (state, {payload}) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    logOut : (state) => {
      state.user = "";
      state.isAuthenticated = false
    },
    getActiveState :(state, {payload}) => {
      state.activeStep = payload; 
    },
    getBlog :(state, {payload}) => {
      state.blog = payload; 
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUser, logOut, getActiveState, getBlog } = authSlice.actions

export default authSlice.reducer