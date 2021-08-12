import axios, { AxiosRequestConfig } from 'axios';
import { AuthFailResponse, AuthSuccessResponse } from './models';

export const postAccountQuery = async <Type>(req: Type, api: string): Promise<AuthSuccessResponse | AuthFailResponse> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    data: req,
    url: `https://food.fahlen.dev/api/identity/${api}`,
    withCredentials: true
  };
  const res = await axios(config);
  if(res.status != 200) {
    throw new Error(`Failed to ${api}`);
  }
  return res.data;
};
