import * as productService from "../services/product-service.js";
import * as categoriesService from "../services/categories-service.js";
import * as loginService from "../services/login-service.js";

import pencilIcon from "../assets/img/pencil-icon.svg";
import trashIcon from "../assets/img/trash-icon.svg";

function getProdutCardHTML(name, price, imgURL, id) {
  let productCardHTML = `
    <div class="product-card--grid-item product-card">
      <div class="product-card__img-container">
        <a href="/">
          <img class="product-card__img" src="${imgURL}" alt="product image" />
        </a>
        <div data-icons-container class="product-card__icons-container">
          <button data-remove-button="${id}" style="background: none; border: none; cursor: pointer;" href="#">
            <img class="product-card__trash-icon" src="${trashIcon}" alt="trash icon" />
          </button>
          <a href="/editproduct/?id=${id}">
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
  let galleryTitle = document.querySelector("[data-gallery-title]");
  const urlParams = new URLSearchParams(window.location.search);
  const categoryid = urlParams.get("categoryid");
  let categoryName = "";

  await categoriesService
    .getAllCategories()
    .then((response) => {
      categoryName = Array.from(response).filter((item) => item.id == categoryid)[0].name;
      galleryTitle.innerHTML = `Todos los productos: ${categoryName}`;
    })
    .catch((error) => {
      alert(error);
    });

  await productService
    .getAllProducts()
    .then((response) => {
      return Array.from(response).filter((item) => item.category == categoryName);
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
  let allIconsContainer = document.querySelectorAll("[data-icons-container]");

  loginService.isUserLogged().then((isLogged) => {
    if (!isLogged) {
      allIconsContainer.forEach((item) => {
        item.classList.add("hide");
      });
    }
  });

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
