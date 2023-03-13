import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'

const backendURL = 'http://localhost:8080/'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}login`,
        { email, password },
        config
      )
      console.log(data)
      // store user's token in local storage
      // localStorage.setItem('userToken', data.token)
      // localStorage.setItem('id_user', data.data.id_user)
      // localStorage.setItem('role', data.data.role)
      // localStorage.setItem('name', data.data.name)
      // localStorage.setItem('email', data.data.email)
      const decoded = jwt_decode(data.token)
      console.log(decoded)
      await Cookies.set('token', data.token)
      await Cookies.set('name', decoded.name)
      await Cookies.set('email', decoded.email)
      await Cookies.set('id_user', decoded.id_user)
      await Cookies.set('role', decoded.role)
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendURL}users`,
        { name, email, password, role },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)