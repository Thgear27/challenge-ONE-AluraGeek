import * as global from "../build-variables.js";

export async function getAllCategories() {
  const response = await fetch(`${global.API_URL}/categories`);
  return await response.json() ;
}