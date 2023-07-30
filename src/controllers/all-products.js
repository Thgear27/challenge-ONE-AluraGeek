
import * as productService from "../services/product-service.js";

import pencilIcon from "../assets/img/pencil-icon.svg";
import trashIcon from "../assets/img/trash-icon.svg";

function getProdutCardHTML(name, price, imgURL, id) {
  let productCardHTML = `
    <div class="product-card--grid-item product-card">
      <div class="product-card__img-container">
        <a href="/">
          <img class="product-card__img" src="${imgURL}" alt="product image" />
        </a>
        <div class="product-card__icons-container">
          <a href="#">
            <img class="product-card__trash-icon" src="${trashIcon}" alt="trash icon" />
          </a>
          <a href="#">
            <img class="product-card__pencil-icon" src="${pencilIcon}" alt="pencil icon" />
          </a>
        </div>
      </div>
      <p class="product-card__title">${name}</p>
      <p class="product-card__price">$ ${price}</p>
      <p class="product-card__id"># ${id}</p>
    </div>
  `;
  return productCardHTML;
}

async function renderGalleryGrid() {
  let gallery = document.querySelector("[data-gallery-grid]");
  let categoryName = "";

  await productService
    .getAllProducts()
    .then((response) => {
      return Array.from(response);
    })
    .then((products) => {
      const galleryInnerHTML = products.reduce((acumulator, item) => {
        return acumulator + getProdutCardHTML(item.name, item.price, item.imgURL, item.id);
      }, "");
      console.log(galleryInnerHTML);
      gallery.innerHTML = galleryInnerHTML;
    });
}

renderGalleryGrid();
