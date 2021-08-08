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
  const response = await axios(config);
  if(response.status != 200) {
    throw new Error('Failed to refresh');
    
  }
  return response.data as AuthSuccessResponse;
});

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    jwt: '',
    isAuthenticated: false,
  },
  reducers: {
    login(state, {payload}) {
      state.isAuthenticated = true;
      state.jwt = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAuthentication.fulfilled, (state, payload) => {
      state.jwt = payload.payload.token!;
      state.isAuthenticated = true;
    });
    builder.addCase(refreshAuthentication.rejected, (state) => {
      state.jwt = '';
      state.isAuthenticated = false;
    });
  }
});

export const { login } = authenticationSlice.actions;

export default authenticationSlice.reducer;
