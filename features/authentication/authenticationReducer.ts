import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthLogoutSuccessResponse, AuthSuccessResponse } from '@api/models';

export const refreshAuthentication = createAsyncThunk(
  '/authentication/refresh', 
  async () => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.fahlen.dev/identity/refresh',
      withCredentials: true
    };
    try {
      const res = await axios(config);
      return (res.data as AuthSuccessResponse);
    } catch (error) {
      throw console.error('Failed to refresh');
    }
});

export const logoutAuthentication = createAsyncThunk(
  '/authentication/logout',
  async () => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.fahlen.dev/identity/logout',
      withCredentials: true
    };
    try {
      const res = await axios(config);
      console.log(res.data);
      return (res.data as AuthLogoutSuccessResponse);
    } catch (error) {
      throw console.error('Failed to logout');
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAuthentication.fulfilled, (state, action) => {
      localStorage.setItem('refresh', 'true');
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
      localStorage.setItem('refresh', 'false');
      state.jwt = '';
      state.isAuthenticated = false;
    });

    builder.addCase(logoutAuthentication.fulfilled, (state) => {
      localStorage.setItem('refresh', 'false');
      return ({
        ...state,
        jwt: '',
        isAuthenticated: false,
      });
    });

  }
});

export const { login } = authenticationSlice.actions;

export default authenticationSlice.reducer;
