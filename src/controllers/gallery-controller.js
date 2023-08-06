import * as productService from "../services/product-service.js";
import * as categoriesService from "../services/categories-service.js";
import * as loginService from "../services/login-service.js";
import Swal from "sweetalert2";

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
  const productname = urlParams.get("productname");

  if (categoryid == null && productname == null) window.location.href = "/";
  let categoryName = "";

  if (categoryid !== null) {
    console.log(categoryid);
    console.log(productname);
    await categoriesService.getAllCategories().then((response) => {
      categoryName = Array.from(response).filter((item) => item.id == categoryid)[0].name;
      galleryTitle.innerHTML = `Todos los productos: ${categoryName}`;
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
  } else if (productname != null) {
    await productService
      .getAllProducts()
      .then((response) => {
        return Array.from(response).filter((item) => item.name.toLowerCase().includes(productname));
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
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No vas a poder revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2a7be5",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          productService.removeProduct(item.getAttribute("data-remove-button"));
          Swal.fire("Eliminado", "El producto ha sido eliminado correctamente.", "success").then(() => {
            window.location.reload();
          });
        }
      });
    });
  });
});
