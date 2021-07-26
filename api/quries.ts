export const getAllAccounts = async () => {
  const response = await fetch(`http://localhost:5000/api/account`)
  if(!response.ok) {
    throw new Error("Failed to fetch accounts")
  }
  return response.clone().json()
}

export const getAllRecipes = async () => {
  const response = await fetch(`http://localhost:5000/api/recipe`)
  if(!response.ok) {
    throw new Error("Failed to fetch recipes")
  }
  return response.clone().json()
}

export const getRecipe = async (id: Number) => {
  const response = await fetch(`http://localhost:5000/api/recipe/${id}`)
  if(!response.ok) {
    throw new Error("Failed to fetch recipe")
  }
  return response.clone().json()
}

export const getRecipeGroupsByAccountId = async (id: Number) => {
  const response = await fetch(`http://localhost:5000/api/recipegroup/recipe/${id}`)
  if(!response.ok) {
    throw new Error("Failed to fetch recipe groups")
  }
  return response.clone().json()
}

export const getAllMeasures = async () => {
  const response = await fetch(`http://localhost:5000/api/measure`)
  if(!response.ok) {
    throw new Error("Failed to fetch measures")
  }
  return response.clone().json()
}