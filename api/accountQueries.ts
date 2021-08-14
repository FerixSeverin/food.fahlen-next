import axios, { AxiosRequestConfig } from 'axios';
import { AuthFailResponse, AuthSuccessResponse } from './models';

export const postAccountQuery = async <Type>(req: Type, api: string): Promise<AuthSuccessResponse | AuthFailResponse> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    data: req,
    url: `http://api.fahlen.dev/identity/${api}`,
    withCredentials: true
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
