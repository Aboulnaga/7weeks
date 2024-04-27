// import
import fetchAllProducts from "./fetchAllProducts.js";
import {
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleChangeQuantityInput,
  handleRemoveProduct,
  calculateTotalPrice,
} from "./cartBtnsFunctions.js";
// selectors
const cartMenu = document.querySelector(".cart-menu");
const cartMenuContainer = document.querySelector(".cart-menu .container");
const cartMenuProducts = document.querySelector(
  ".cart-menu .container .products"
);
const headerCartBtns = document.querySelectorAll("#header-cart");

// events

// open cart menu slider
headerCartBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    cartMenu.classList.add("active-cart-menu");
    cartMenuContainer.classList.add("active-cart-menu-container");
    handleCartMenu();
  });
});

// close cart menu slider
cartMenu.addEventListener("click", e => {
  if (e.target.classList.contains("cart-menu")) {
    cartMenu.classList.remove("active-cart-menu");
    cartMenuContainer.classList.remove("active-cart-menu-container");
  }
});

cartMenuContainer.addEventListener("click", e => {
  e.stopPropagation();
});

export default async function handleCartMenu() {
  const allProducts = (await fetchAllProducts()).allProducts;
  const cartData = getCartMenuProducts();
  if (!cartData) return console.log("no products found");
  const details = getProductsDetails(cartData, allProducts);
  calculateTotalPrice(details);
  renderCartProductsInHtml(details);
  //   console.log(details);
}

function getCartMenuProducts() {
  const products = JSON.parse(localStorage.getItem("products"));
  // console.log(products);
  if (!products || products.length === 0) {
    // console.log("no products found");
    cartMenuProducts.textContent = "No products found";
    calculateTotalPrice(products);
    return false;
  }
  if (products.length > 0) {
    return products;
  } else {
    false;
  }
}

function getProductsDetails(cartData, allProducts) {
  const details = cartData.map(product => {
    const productDetails = allProducts.find(data => data.id === product.id);
    const productDetailsWithQuantity = {
      ...productDetails,
      quantity: product.quantity,
    };
    // console.log(productData);
    return productDetailsWithQuantity;
  });
  return details;
}

function renderCartProductsInHtml(details) {
  //   console.log(details);
  cartMenuProducts.innerHTML = "";
  details.map(item => {
    const total = item.price * item.quantity;
    const formatTotal = total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const formatPrice = item.price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // decrase quantity btn
    const decBtn = document.createElement("button");
    decBtn.classList.add("dec-btn");
    decBtn.textContent = "-";
    decBtn.onclick = () => handleDecreaseQuantity(item);

    // increase quantity btn
    const incBtn = document.createElement("button");
    incBtn.classList.add("inc-btn");
    incBtn.textContent = "+";
    incBtn.onclick = () => handleIncreaseQuantity(item);

    // quantity input
    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quan-input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = item.quantity;
    quantityInput.onchange = e => handleChangeQuantityInput(item, e);

    // remove btn
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    removeBtn.onclick = () => handleRemoveProduct(item);

    // console.log(item);
    productDiv.innerHTML = `
    <div class="img">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="info">
      <div class="main">
       <a href="/pages/product.html?ID=${item.id}&Product=${item.title
      .split(" ")
      .join("-")
      .toLowerCase()}"> <p>${item.title}</p></a>
        <p>${formatPrice}</p>
        <div class="manage">
          
          <div class="decrease">
            <!-- decrease quantity btn -->
         
          </div>
            <div class="quantity">
              <!-- quantity input -->
            </div>
            <div class="increase">
            <!-- increase quantity btn -->
          </div>
         
        </div>
        <!-- manage -->
      </div>
      <!-- main -->
      <div class="sub">
        <div class="total">
        <p>${formatTotal}</p>
        </div>
        <div class="remove">
        <!-- remove btn -->
      </div>
      </div>
    </div>
    <!-- info -->
    `;

    cartMenuProducts.prepend(productDiv);
    const decrease = document.querySelector(".decrease");
    decrease.appendChild(decBtn);

    const increase = document.querySelector(".increase");
    increase.appendChild(incBtn);

    const quantity = document.querySelector(".quantity");
    quantity.appendChild(quantityInput);

    const remove = document.querySelector(".remove");
    remove.appendChild(removeBtn);

    // console.log(decrease);
  });
}

/**
 
function renderCartProductsInHtml(details) {
  //   console.log(details);
  cartMenuProducts.innerHTML = "";
  details.map(item => {
    const total = item.price * item.quantity;
    const formatTotal = total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // decrase quantity btn
    const decBtn = document.createElement("button");
    decBtn.classList.add("dec-btn");
    decBtn.textContent = "-";
    decBtn.onclick = () => handleDecreaseQuantity(item);

    // increase quantity btn
    const incBtn = document.createElement("button");
    incBtn.classList.add("inc-btn");
    incBtn.textContent = "+";
    incBtn.onclick = () => handleIncreaseQuantity(item);

    // quantity input
    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quan-input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = item.quantity;
    quantityInput.onchange = e => handleChangeQuantityInput(item, e);

    // remove btn
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    removeBtn.onclick = () => handleRemoveProduct(item);

    // console.log(item);
    productDiv.innerHTML = `
    <div class="img">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="info">
      <div class="main">
       <a href="/pages/product.html?ID=${item.id}&Product=${item.title
      .split(" ")
      .join("-")
      .toLowerCase()}"> <p>${item.title}</p></a>
        <p>${item.price}</p>
        <div class="manage">
          
          <div class="decrease">
            <!-- decrease quantity btn -->
         
          </div>
            <div class="quantity">
              <!-- quantity input -->
            </div>
            <div class="increase">
            <!-- increase quantity btn -->
          </div>
         
        </div>
        <!-- manage -->
      </div>
      <!-- main -->
      <div class="sub">
        <div class="total">
        <p>${formatTotal}</p>
        </div>
        <div class="remove">
        <!-- remove btn -->
      </div>
      </div>
    </div>
    <!-- info -->
    `;

    cartMenuProducts.prepend(productDiv);
    const decrease = document.querySelector(".decrease");
    decrease.appendChild(decBtn);

    const increase = document.querySelector(".increase");
    increase.appendChild(incBtn);

    const quantity = document.querySelector(".quantity");
    quantity.appendChild(quantityInput);

    const remove = document.querySelector(".remove");
    remove.appendChild(removeBtn);

    // console.log(decrease);
  });
}

 
 */
