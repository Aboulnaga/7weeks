// import
import fetchAllProducts from "./fetchAllProducts.js";
// selectors
const cartMenu = document.querySelector(".cart-menu");
const cartMenuContainer = document.querySelector(".cart-menu .container");
const cartMenuProducts = document.querySelector(
  ".cart-menu .container .products"
);
const headerCartBtns = document.querySelectorAll("#header-cart");

// events

headerCartBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    cartMenu.classList.add("active-cart-menu");
    cartMenuContainer.classList.add("active-cart-menu-container");
    handleCartMenu();
  });
});

cartMenu.addEventListener("click", e => {
  if (e.target.classList.contains("cart-menu")) {
    cartMenu.classList.remove("active-cart-menu");
    cartMenuContainer.classList.remove("active-cart-menu-container");
  }
});

cartMenuContainer.addEventListener("click", e => {
  e.stopPropagation();
});

async function handleCartMenu() {
  const allProducts = (await fetchAllProducts()).allProducts;
  const cartData = getCartMenuProducts();
  if (!cartData) return console.log("no products found");
  const details = getProductsDetails(cartData, allProducts);
  renderCartProductsInHtml(details);
  //   console.log(details);
}

function getCartMenuProducts() {
  const products = JSON.parse(localStorage.getItem("products"));
  if (!products) return false;
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

    // console.log(item);
    cartMenuProducts.innerHTML += `
    <div class="product">
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
            <button>-</button>
          </div>
            <div class="quantity">
            <form>
              <input value="${item.quantity}" type="number" min="1" max="100" />
            </form>
            </div>
            <div class="increase">
            <button>+</button>
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
        <button><i class="fa-solid fa-trash"></i></button>
      </div>
      </div>
    </div>
    <!-- info -->
  </div>

    `;
  });
}

{
  /* <div class="img">
<img src="${item.image}" alt="product-img" />
</div>
<div class="info">
<span>${item.category}</span>
<h5>${item.title}</h5>
<div class="star">
  <i class="fas fa-star icon"></i>
  <i class="fas fa-star icon"></i>
  <i class="fas fa-star icon"></i>
  <i class="fas fa-star icon"></i>
  <i class="fas fa-star icon"></i>
</div>
<h4>$${item.price}</h4>
</div>
<div class="quantity">
<span>${item.quantity}</span>
</div>
<div class="total">
<span>$${item.price * item.quantity}</span>
</div> */
}
