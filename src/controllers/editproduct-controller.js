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

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (id == undefined) {
  window.location.href = "/";
}

let idContainer = document.querySelector("[data-id]");
idContainer.innerHTML = `<strong>id:</strong> ${id}`;

productService.getProductById(id).then((response) => {
  let productToEdit = response;
  setTimeout(() => {
    document.getElementById("productname").value = productToEdit.name;
    document.getElementById("imgURL").value = productToEdit.imgURL;
    document.getElementById("category").value = productToEdit.category;
    document.getElementById("productprice").value = productToEdit.price;
    document.getElementById("description").value = productToEdit.description;
  }, 10);
});

const addProductForm = document.querySelector("[data-editproduct-form]");
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("productname").value;
  const imgURL = document.getElementById("imgURL").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("productprice").value;
  const description = document.getElementById("description").value;

  productService
    .updateProduct(name, imgURL, price, category, description, id)
    .then((response) => {
      console.log(response);
      window.location.href = "/allproducts/";
    })
    .catch((error) => {
      console.log(error);
    });
});
