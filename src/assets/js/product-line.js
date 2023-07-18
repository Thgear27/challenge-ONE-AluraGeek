const PRODUCT_CARD_AMOUNT_BY_PRODUCT_LINE = 6;

document.addEventListener("DOMContentLoaded", function () {
  let media = matchMedia("(min-width: 700px)");

  if (media.matches) fixGridHeightAll();
  else autoHeightGrid();

  media.addEventListener("change", (event) => {
    if (event.matches) fixGridHeightAll();
    else autoHeightGrid();
  });
});

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
    let product_card_list = document.querySelectorAll(".product-card");
    let productline_top_list = document.querySelectorAll(".product-line__top");

    // That 6 is important, it represents the amount of product cards in the home-page list
    // That 6 is directly related to the amount of product cards in the html
    fixGridHeight(
      productline_top_list[index],
      product_card_list[index * PRODUCT_CARD_AMOUNT_BY_PRODUCT_LINE],
      item
    );
  });
}

function fixGridHeight(productline_top, product_card, product_line) {
  let gap = parseInt(getComputedStyle(product_line).rowGap);
  let product_height = parseInt(getComputedStyle(product_card).height);
  let procucttop_height = parseInt(getComputedStyle(productline_top).height);

  product_line.style.height = `${gap + product_height + procucttop_height}px`;
}