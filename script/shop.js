// imports
import fetchAllProducts from "./fetchAllProducts.js";
import setProductsInHtml from "./setProductsInHtml.js";
import { noDataIcon } from "./svgIcons.js";

// selectors
const filterUl = document.querySelector(".filter-ul");
const productsDiv = document.querySelector(".products-section .products");
const productsContainerDiv = document.querySelector(
  ".products-section .container"
);
const searchInput = document.querySelector("#search");
// functions
async function handleData() {
  // get all products
  const allProducts = (await fetchAllProducts()).allProducts;

  // set categories in shop page
  setAppCategoriesInHtml(allProducts);

  // put active class on All category
  const categoriesLi = document.querySelectorAll(".filter-ul li");
  categoriesLi[0].classList.add("active");

  // set products in shop page for first time
  setAppProductsInHtmlForFirstTime(allProducts);

  // use search function in shop page to filter products
  useSearch(allProducts, categoriesLi);

  // use filter function in shop page to filter products
  useFilterTabs(allProducts, categoriesLi);

  const productsCards = document.querySelectorAll(".products-section .product");
  // console.log(productsCards);
  infinityScroll(productsCards);
}
handleData();

function setAppCategoriesInHtml(allProducts) {
  const categories = [
    "All",
    ...new Set(allProducts.map(item => item.category)),
  ];

  categories.forEach((category, i) => {
    const li = document.createElement("li");
    li.textContent = category;
    li.classList.add(`cat-${i + 1}`);
    filterUl.appendChild(li);
  });
}
function setAppProductsInHtmlForFirstTime(allProducts) {
  setProductsInHtml({
    data: allProducts,
    status: "All",
    parentDiv: productsDiv,
  });
}

function useSearch(allProducts, categoriesLi) {
  searchInput.addEventListener("input", e => {
    categoriesLi.forEach(li => {
      li.classList.remove("active");
    });
    productsDiv.innerHTML = "";
    const searchValue = e.target.value;
    if (searchValue) {
      console.log(searchValue);
      const searchResult = allProducts.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      if (searchResult.length === 0) {
        console.log("no result found");
        noData();
        return;
      }

      const noDataDiv = document.querySelector(".no-data");
      if (noDataDiv) noDataDiv.remove();
      productsContainerDiv.appendChild(productsDiv);
      setProductsInHtml({
        data: searchResult,
        status: "All",
        parentDiv: productsDiv,
      });
    } else {
      const noDataDiv = document.querySelector(".no-data");
      if (noDataDiv) noDataDiv.remove();
      productsContainerDiv.appendChild(productsDiv);
      categoriesLi[0].classList.add("active");
      setProductsInHtml({
        data: allProducts,
        status: "All",
        parentDiv: productsDiv,
      });
    }

    const cardsDiv = document.querySelectorAll(".products-section .product");
    infinityScroll(cardsDiv);
  });
}

function useFilterTabs(allProducts, categoriesLi) {
  categoriesLi.forEach(li => {
    li.addEventListener("click", e => {
      const noDataDiv = document.querySelector(".no-data");
      if (noDataDiv) noDataDiv.remove();
      productsDiv.innerHTML = "";
      searchInput.value = "";
      categoriesLi.forEach(li => {
        li.classList.remove("active");
      });
      e.target.classList.add("active");
      const filteredProducts = allProducts.filter(product => {
        if (e.target.textContent === "All") {
          return product;
        } else {
          return product.category === e.target.textContent;
        }
      });

      productsContainerDiv.appendChild(productsDiv);

      // console.log(filteredProducts);
      setProductsInHtml({
        data: filteredProducts,
        status: "All",
        parentDiv: productsDiv,
      });

      const cardsDiv = document.querySelectorAll(".products-section .product");
      infinityScroll(cardsDiv);
    });
  });
}

function noData() {
  productsContainerDiv.innerHTML = "";
  const noDataDiv = document.createElement("div");
  noDataDiv.classList.add("no-data");
  const noDataIconDiv = document.createElement("div");
  noDataIconDiv.classList.add("no-data-icon");
  noDataIconDiv.innerHTML = noDataIcon;
  noDataDiv.appendChild(noDataIconDiv);
  const noDataH2 = document.createElement("h2");
  noDataH2.textContent = "No Data Found";
  noDataDiv.appendChild(noDataH2);
  const noDataP = document.createElement("p");
  noDataP.textContent = "Please Try Another Keyword";
  noDataDiv.appendChild(noDataP);
  productsContainerDiv.appendChild(noDataDiv);
}

function infinityScroll(productsCards) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-card");
          observer.unobserve(entry.target);
          // console.log(entry.target);
          // console.log(productsCards);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  productsCards.forEach(productCard => {
    observer.observe(productCard);
  });
}

// events
