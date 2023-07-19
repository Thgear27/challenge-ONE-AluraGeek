document.addEventListener("DOMContentLoaded", function () {
  let inputList = document.querySelectorAll(".input-container__input");
  inputList.forEach((item) => {
    item.addEventListener("input", () => {
      if (item.value.trim() !== "") {
        item.setAttribute("isempty", "false");
      } else {
        item.setAttribute("isempty", "true");
      }
    });
  });
});
