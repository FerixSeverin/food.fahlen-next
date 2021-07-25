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