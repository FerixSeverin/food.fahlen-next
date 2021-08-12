import axios, { AxiosRequestConfig } from 'axios';

export const getQuerySimple = async <TRes>(jwt: string, api: string): Promise<TRes> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://food.fahlen.dev:5001/api/${api}`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw console.error('Request Failed');
  }
};

export const getQueryID = async <TRes>(jwt: string, api: string, id: number): Promise<TRes> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `https://food.fahlen.dev:5001/api/${api}/${id}`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw console.error('Request Failed');
  }
};

export const postQuery = async <TReq, TRes>(jwt: string, api: string, req: TReq): Promise<TRes> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    data: req,
    url: `https://food.fahlen.dev:5001/api/${api}`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw new Error('Failed to post');
  }
};

export const deleteQueryID = async <TRes>(jwt: string, api: string, id: number): Promise<TRes> => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `https://food.fahlen.dev:5001/api/${api}/${id}`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw new Error('Failed to delete');
  }
};
