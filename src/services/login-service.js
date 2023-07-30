import * as global from '../build-variables.js';

export async function getUsers() {
  const response = await fetch(`${global.API_URL}/users`);
  return await response.json();
}