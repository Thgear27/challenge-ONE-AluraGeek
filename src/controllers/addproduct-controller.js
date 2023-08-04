import * as categoriesService from "../services/categories-service.js";
import * as productService from "../services/product-service.js";

// cargar las opciones en el select de categorias
const selectCategories = document.querySelector("[data-select-categories]");

categoriesService.getAllCategories().then((response) => {
  response.forEach((category) => {
    const optionHTML = `<option class="input-container__option" value="${category.name}">${category.name}</option>`;
    selectCategories.innerHTML += optionHTML;
  });
});

const addProductForm = document.querySelector("[data-addproduct-form]");
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("productname").value;
  const imgURL = document.getElementById("imgURL").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("productprice").value;
  const description = document.getElementById("description").value;

  productService
    .addProduct(name, imgURL, price, category, description)
    .then((response) => {
      console.log(response);
      window.location.href = "/allproducts/";
    })
    .catch((error) => {
      console.log(error);
    });
});