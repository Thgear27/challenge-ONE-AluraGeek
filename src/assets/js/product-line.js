import * as AOS from "aos";

document.addEventListener("DOMContentLoaded", function () {
  let media = matchMedia("(min-width: 700px)");

  media.addEventListener("change", (event) => {
    console.log("objecGAt");
    if (event.matches) {
      fixGridHeightAll();
      AOS.refresh();
    } else {
      autoHeightGrid();
    }
  });

});

export function applyfixGrid() {
  let media = matchMedia("(min-width: 700px)");
  if (media.matches) {
    fixGridHeightAll();
    AOS.refresh();
  } else {
    autoHeightGrid();
  }
}

// This function sets the height of the .product-line elements to auto
function autoHeightGrid() {
  let product_line = document.querySelectorAll(".product-line");

  product_line.forEach((item) => {
    item.style.height = "auto";
  });
}

// This function sets the height of the .product-line elements to the height of one of the elements
function fixGridHeightAll() {
  let product_line_list = document.querySelectorAll(".product-line");

  product_line_list.forEach((item, index) => {
    let product_card_list = item.querySelectorAll(".product-card");
    let productline_top_list = document.querySelectorAll(".product-line__top");

    fixGridHeight(productline_top_list[index], product_card_list[0], item);
  });
}

function fixGridHeight(productline_top, product_card, product_line) {
  let gap = parseInt(getComputedStyle(product_line).rowGap);
  let product_height = parseInt(getComputedStyle(product_card).height);
  let procucttop_height = parseInt(getComputedStyle(productline_top).height);

  product_line.style.height = `${gap + product_height  + procucttop_height}px`;
}
