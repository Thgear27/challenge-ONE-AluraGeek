import * as global from "../build-variables.js";

export async function getUsers() {
  const response = await fetch(`${global.API_URL}/users`);
  return await response.json();
}

export async function isUserLogged() {
  const usuario = localStorage.getItem("usuario");
  if (usuario == undefined) return false;

  const password = await fetch(`${global.API_URL}/users?email=${usuario.email}`).then((response) => {
    return response.json().password;
  });

  if (password != usuario.password) return false;

  return true;
}

