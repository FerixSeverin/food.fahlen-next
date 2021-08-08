import axios, { AxiosRequestConfig } from 'axios';
import { AccountRead, MeasureRead, RecipeCreate, RecipeGroup, RecipeRead, RecipeReadWithRecipeGroups } from './models';

export const getAllAccounts = async (): Promise<AccountRead[]> => {
  const response = await axios.get('http://localhost:5000/api/account');
  if(response.status != 200) {
    throw new Error('Failed to fetch accounts');
  }
  return response.data().clone().json();
};

export const getAllRecipes = async (jwt: string): Promise<RecipeRead[]> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: 'http://localhost:5000/api/recipe',
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw console.error('Failed to get recipes');
  }
};

export const createRecipe = async (req: RecipeCreate, jwt: string): Promise<RecipeRead> => {
  const config: AxiosRequestConfig = {
    method: 'post',
    data: req,
    url: 'http://localhost:5000/api/recipe',
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw new Error('Failed to create recipe');
  }
};

export const recipeDelete = async (req: number, jwt: string): Promise<RecipeRead> => {
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: `http://localhost:5000/api/recipe/${req}`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw new Error('Failed to delete recipe');
  }
};

export const getRecipe = async (id: number): Promise<RecipeRead> => {
  const response = await axios.get(`http://localhost:5000/api/recipe/${id}`);
  if(response.status != 200) {
    throw new Error('Failed to fetch recipe');
  }
  return response.data().clone().json();
};

export const getRecipeGroupsByAccountId = async (id: number): Promise<RecipeGroup[]> => {
  const response = await axios.get(`http://localhost:5000/api/recipegroup/recipe/${id}`);
  if(response.status != 200) {
    throw new Error('Failed to fetch recipe groups');
  }
  return response.data().clone().json();
};

export const getAllMeasures = async (): Promise<MeasureRead[]> => {
  const response = await axios.get('http://localhost:5000/api/measure');
  if(response.status != 200) {
    throw new Error('Failed to fetch measures');
  }
  return response.data().clone().json();
};

export const getRecipeEditById = async (req: number, jwt: string): Promise<RecipeReadWithRecipeGroups> => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `http://localhost:5000/api/recipe/all/${req}`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${jwt}`}
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    throw console.error('Failed to get recipe');
  }
};
