import axios, { AxiosRequestConfig } from 'axios';
import { AuthFailResponse, AuthSuccessResponse, UserLoginRequest, UserRegistrationRequest } from './models';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerQuery = async (req: UserRegistrationRequest): Promise<AuthSuccessResponse | AuthFailResponse> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    data: req,
    url: 'http://localhost:5000/api/identity/register',
    withCredentials: true
  };
  const res = await axios(config);
  if(res.status != 200) {
    throw new Error('Failed to register');
  }
  return res.data;
};

export const loginQuery = async (req: UserLoginRequest): Promise<AuthSuccessResponse | AuthFailResponse> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    data: req,
    url: 'http://localhost:5000/api/identity/login',
    withCredentials: true
  };
  const res = await axios(config);
  if(res.status != 200) {
    throw new Error('Failed to login');
  }
  return res.data;
};

// export const refreshQuery = async (): Promise<AuthSuccessResponse | AuthFailResponse> => {
//   const config: AxiosRequestConfig = {
//     method: 'post',
//     url: 'http://localhost:5000/api/identity/refresh',
//     withCredentials: true
//   };
//   const res = await axios(config);
//   if(res.status != 200) {
//     throw new Error('Failed to refresh');
//   }
//   return res.data;
// };

// export const reduxRefreshQuery: ActionCreator<
//   ThunkAction<Promise<Action>, IState, void>
// > = () => async (dispatch: Dispatch<RefreshAction | FailedAction>): Promise<Action> => {
//   const config: AxiosRequestConfig = {
//     method: 'post',
//     url: 'http://localhost:5000/api/identity/refresh',
//     withCredentials: true
//   };
//   const res = await axios(config);
//   if(res.status != 200) {
//     dispatch({
//       type: 'failed'
//     });
//   }
//   dispatch({
//     type: 'refresh'
//   });
// };

export const refreshQuery = createAsyncThunk('refresh', async () => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: 'http://localhost:5000/api/identity/refresh',
    withCredentials: true
  };
  const response = await axios(config);
  if(response.status != 200) {
    return response.data;
  }
  return response.data;
  
});
