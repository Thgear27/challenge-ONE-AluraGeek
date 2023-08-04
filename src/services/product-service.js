import * as global from "../build-variables.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllProducts() {
  const response = await fetch(`${global.API_URL}/products`);
  return await response.json();
}

export async function addProduct(name, imgURL, price, category, description) {
  const id = uuidv4();
  const response = await fetch(`${global.API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imgURL,
      price,
      category,
      description,
      id,
    }),
  });

  return response.json();
}

export async function removeProduct(id) {
  const response = await fetch(`${global.API_URL}/products/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
