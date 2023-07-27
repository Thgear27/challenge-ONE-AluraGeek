const validityMessages = {
  patternMismatch: "Formato inválido",
  typeMismatch: "Campo inválido",
  valueMissing: "Debe completar el campo",
};

function validate(input) {
  // console.log(input.validity);
  let errorMessage = "Campo Requerido";

  Object.keys(validityMessages).forEach((item) => {
    if (input.validity[item]) {
      errorMessage = validityMessages[item];
      console.log(errorMessage);
    }
  });

  if (!input.validity.valid) {
    input.classList.add("input-invalid");
    document.querySelector(`[data-forinput="${input.id}"]`).classList.remove("hide");
    document.querySelector(`[data-forinput="${input.id}"]`).innerHTML = errorMessage;
  } else {
    input.classList.remove("input-invalid");
    document.querySelector(`[data-forinput="${input.id}"]`).classList.add("hide");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let allInputs = document.querySelectorAll(".input-container input");
  allInputs.forEach((item) => {
    item.addEventListener("blur", () => {
      validate(item);
    });
  });
});
