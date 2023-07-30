import * as global from "../build-variables.js";

export async function getAllProducts() {
  const response = await fetch(`${global.API_URL}/products`);
  return await response.json() ;
}