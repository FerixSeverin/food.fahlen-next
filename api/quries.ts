import axios from 'axios';
import { AccountRead, MeasureRead, RecipeGroup, RecipeRead, RecipeReadWithRecipeGroups } from './models';

export const getAllAccounts = async (): Promise<AccountRead[]> => {
  const response = await axios.get('http://localhost:5000/api/account');
  if(response.status != 200) {
    throw new Error('Failed to fetch accounts');
  }
  return response.data().clone().json();
};

export const getAllRecipes = async (): Promise<RecipeRead[]> => {
  const response = await axios.get('http://localhost:5000/api/recipe');
  if(response.status != 200) {
    throw new Error('Failed to fetch recipes');
  }
  return response.data().clone().json();
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

export const getRecipeEditById = async (id: number): Promise<RecipeReadWithRecipeGroups> => {
  const response = await axios.get(`http://localhost:5000/api/recipe/all/${id}`);
  if(response.status != 200) {
    throw new Error('Failed to fetch recipe');
  }
  return response.data().clone().json();
};
