import * as loginService from "../services/login-service.js";

async function loginUser(email, password) {
  await loginService
    .getUsers()
    .then((response) => {
      return Array.from(response).filter((item) => item.email == email)[0];
    })
    .then((user) => {
      if (user == undefined) throw "No se ha encontrado el usuario";
      if (user.password != password) throw "Contraseña incorrecta";
      const username = user.name;

      localStorage.setItem("usuario", JSON.stringify({ email, username }));
      window.location.href = "/allproducts/";
    })
    .catch((error) => {
      alert(error);
    });
}

document.querySelector("[data-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("[data-form-email]").value;
  const password = document.querySelector("[data-form-password]").value;
  loginUser(email, password);
});
