import * as productService from "../services/product-service.js";

let searchform = document.querySelector("[data-search-form]");

searchform.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = searchform.querySelector("input").value;
  window.location.href = `/products/?productname=${inputValue}`;
});
