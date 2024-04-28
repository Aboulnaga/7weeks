// import
import threwToast from "./threwToast.js";

// selectors
const burgerButton = document.querySelector("#burger-menu");
const burgerMenu = document.querySelector("#burger");
const burgerMenuContainer = document.querySelector("#burger .container");
const itemCounter = document.querySelector("#burger .sub-nav .total span");
const searchform = document.querySelector("#burger .search form");

// events
// open burger menu
burgerButton.addEventListener("click", () => {
  //   console.log("click");
  burgerMenu.classList.add("active-burger");
  burgerMenuContainer.classList.add("active-burger-container");
  handleItemsCounter();
  handleSearch();
});

// close burger menu
burgerMenu.addEventListener("click", e => {
  if (e.target.classList.contains("active-burger")) {
    burgerMenu.classList.remove("active-burger");
    burgerMenuContainer.classList.remove("active-burger-container");
  }
});

burgerMenuContainer.addEventListener("click", e => {
  e.stopPropagation();
});

// functions
function handleItemsCounter() {
  const productsInLocalStorage = localStorage.getItem("products");
  if (productsInLocalStorage) {
    const products = JSON.parse(productsInLocalStorage);
    itemCounter.textContent = products.length;
  } else {
    itemCounter.textContent = 0;
  }
}

function handleSearch() {
  const product = {
    image: "/img/error.webp",
  };
  searchform.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
  });
}
