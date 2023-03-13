import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authAction'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: Cookies.get('token') ? jwt_decode(Cookies.get('token')) : null,
  userToken: Cookies.get('token') ? Cookies.get('token') : null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem('userToken') // delete token from storage
      // localStorage.removeItem('name')
      // localStorage.removeItem('email')
      // localStorage.removeItem('role')
      // localStorage.removeItem('id_user')
      Cookies.remove('token')
      Cookies.remove('name')
      Cookies.remove('email')
      Cookies.remove('id_user')
      Cookies.remove('role')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer