(() => {
  function updateHeaderBUttons() {
    const user = localStorage.getItem("usuario");
    if (user == undefined) {
      document.querySelector("[data-login-button]").classList.remove("hide");
      document.querySelector("[data-logout]").classList.add("hide");
      return;
    }
    document.querySelector("[data-login-button]").classList.add("hide");
    document.querySelector("[data-logout]").classList.remove("hide");
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateHeaderBUttons();

    document.querySelector("[data-logout-button]").addEventListener("click", () => {
      localStorage.removeItem("usuario");
      updateHeaderBUttons();
      window.location.href = "/";
    });
  });
})();
