import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthSuccessResponse } from '../../api/models';

export const refreshAuthentication = createAsyncThunk(
  '/authentication/refresh', 
  async () => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'http://localhost:5000/api/identity/refresh',
    withCredentials: true
  };
  try {
    const res = await axios(config);
    return (res.data as AuthSuccessResponse);
  } catch (error) {
    throw console.error('Failed to refresh');
  }
});

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    jwt: '',
    isAuthenticated: false,
    email: '',
  },
  reducers: {
    login(state, {payload}) {
      state.isAuthenticated = true;
      state.jwt = payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.jwt = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAuthentication.fulfilled, (state, action) => {
      return ({
        ...state,
        jwt: action.payload.token!,
        isAuthenticated: true,
      });
    });
    builder.addCase(refreshAuthentication.pending, (state) => {
      state.jwt = '';
    });
    builder.addCase(refreshAuthentication.rejected, (state) => {
      state.jwt = '';
      state.isAuthenticated = false;
    });
  }
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
