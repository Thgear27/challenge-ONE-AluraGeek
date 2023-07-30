import "aos/dist/aos.css";
import * as AOS from "aos";

AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});
