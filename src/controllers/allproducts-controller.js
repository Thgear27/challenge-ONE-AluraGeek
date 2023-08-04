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
          <button data-remove-button="${id}" style="background: none; border: none; cursor: pointer;" href="#">
            <img class="product-card__trash-icon" src="${trashIcon}" alt="trash icon" />
          </button>
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

  await productService
    .getAllProducts()
    .then((response) => {
      return Array.from(response);
    })
    .then((products) => {
      const galleryInnerHTML = products.reduce((acumulator, item) => {
        return acumulator + getProdutCardHTML(item.name, item.price, item.imgURL, item.id);
      }, "");
      gallery.innerHTML = galleryInnerHTML;
    })
    .catch((error) => {
      alert(error);
    });
}

renderGalleryGrid().then(() => {
  let allRemoveButtons = document.querySelectorAll("[data-remove-button]");
  allRemoveButtons.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(item.getAttribute("data-remove-button"));
      productService.removeProduct(item.getAttribute("data-remove-button")).then(() => {
        window.location.reload();
      });
    });
  });
});
