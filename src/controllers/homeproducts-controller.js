import * as productService from "../services/product-service.js";
import * as categoriesService from "../services/categories-service.js";
import * as loginService from "../services/login-service.js";
import { applyfixGrid } from "../assets/js/product-line.js";
import arrowSvg from "../assets/img/arrow.svg";

function getProdutCardHTML(name, price, imgURL) {
  let productCardHTML = `
    <a href="#" class="hover-move-up">
      <div class="product-card">
        <div class="product-card__img-container">
          <img class="product-card__img" src="${imgURL}" alt="product image" />
        </div>
        <p class="product-card__title">${name}</p>
        <p class="product-card__price">$ ${price}</p>
        <p class="product-card__link">Ver producto</p>
      </div>
    </a>
  `;

  return productCardHTML;
}

export function renderProductLines(category, categoryid) {
  const galleryInner = document.querySelector("[data-gallery-inner]");

  // Obtener todos los productos de una categoria
  let productLineListHTML = "";
  productService
    .getAllProducts()
    .then((response) => {
      let products = Array.from(response).filter((item) => item.category == category);
      if (products.length > 6) products = products.slice(0, 6);
      productLineListHTML = products.reduce((acumulator, item) => {
        return acumulator + getProdutCardHTML(item.name, item.price, item.imgURL);
      }, "");

      // console.log(productLineListHTML);

      let productLineHTML = `
      <div data-aos="fade-up" class="product-line">
        <div class="product-line__top">
          <h2 id="${category}" class="product-line__title heading-2">${category}</h2>
          <a class="product-line__link hover-move-up" href="/products/?categoryid=${categoryid}">
            <p class="product-line__link-p">Ver Todo</p>
            <img class="product-line__link-svg" src="${arrowSvg}" alt="arrow" />
          </a>
        </div>
        <div class="product-line__list">
          ${productLineListHTML}
        </div>
      </div>
    `;
      let productLine = document.createElement("div");
      productLine.innerHTML = productLineHTML;

      galleryInner.append(productLine);
      applyfixGrid();
    })
    .catch((error) => {
      alert(error);
    });
}

categoriesService
  .getAllCategories()
  .then((response) => {
    Array.from(response).forEach((item) => {
      renderProductLines(item.name, item.id);
    });
  })
  .catch((error) => {
    alert(error);
  });
