document
  .querySelector("[data-search-form]")
  .querySelector("input")
  .addEventListener("blur", () => {
    document.querySelector("[data-search-form]").setAttribute("active", "false");
  });

document.querySelector("[data-mobile-search-button]").addEventListener("click", () => {
  document.querySelector("[data-search-form]").setAttribute("active", "truei");
  document.querySelector("[data-search-form]").querySelector("input").focus();
});
