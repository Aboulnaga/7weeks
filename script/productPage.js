import fetchAllProducts from "./fetchAllProducts.js";
import setProductsInHtml from "./setProductsInHtml.js";
import threwToast from "./threwToast.js";
const link = new URL(window.location);
const id = link.searchParams.get("ID");
// console.log(id);
const productDiv = document.querySelector(".hero .product");
const relatedProductsDiv = document.querySelector(
  "#related-products .products"
);
const recommendedProductsDiv = document.querySelector(
  "#recommended-products .products"
);

async function getData() {
  const data = (await fetchAllProducts()).allProducts;
  const product = data.find(product => product.id == id);

  //   console.log(product);
  //   setMetaData(product);
  renderProductInHtml(product);
  const randomRelated = randomRelatedProducts({ product, data });
  const randomRecommended = randomRecommendedProducts({ product, data });
  renderOtherProducts(randomRelated, relatedProductsDiv);
  renderOtherProducts(randomRecommended, recommendedProductsDiv);
}

getData();

function setMetaData(product) {
  console.log(product.description);
  document.title = `7weeks - ${product.title}`;
  document
    .querySelector("meta[name='description']")
    .setAttribute("content", product.description);

  document
    .querySelector("meta[property='og:title']")
    .setAttribute("content", product.title);

  document
    .querySelector("meta[property='og:description']")
    .setAttribute("content", product.description);

  document
    .querySelector("meta[property='og:image']")
    .setAttribute("content", product.image);

  document
    .querySelector("meta[property='og:url']")
    .setAttribute("content", window.location.href);

  document
    .querySelector("meta[property='og:type']")
    .setAttribute("content", "website");

  document
    .querySelector("meta[property='og:site_name']")
    .setAttribute("content", "7weeks");

  document
    .querySelector("meta[name='twitter:title']")
    .setAttribute("content", product.title);

  document
    .querySelector("meta[name='twitter:description']")
    .setAttribute("content", product.description);

  document
    .querySelector("meta[name='twitter:image']")
    .setAttribute("content", product.image);

  document
    .querySelector("meta[name='twitter:url']")
    .setAttribute("content", window.location.href);

  document
    .querySelector("meta[name='twitter:card']")
    .setAttribute("content", "summary_large_image");

  document
    .querySelector("meta[name='twitter:site']")
    .setAttribute("content", "@7weeks");

  document
    .querySelector("meta[name='twitter:creator']")
    .setAttribute("content", "@7weeks");

  document
    .querySelector("meta[name='twitter:image:alt']")
    .setAttribute("content", product.title);
}

function renderProductInHtml(product) {
  const {
    id,
    title,
    category,
    rating: { rate, count },
    price,
    description,
    image,
  } = product;

  const rateStars = `<i class="fas fa-star icon"></i>`.repeat(rate);
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const poductBrand = product.brand || "";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.classList.add("decrease");
  decreaseBtn.textContent = "-";
  decreaseBtn.onclick = () => handleDecreaseQuantity(product);

  const increaseBtn = document.createElement("button");
  increaseBtn.classList.add("increase");
  increaseBtn.textContent = "+";
  increaseBtn.onclick = () => handleIncreaseQuantity(product);

  const quantityInput = document.createElement("input");
  quantityInput.classList.add("quan-input");
  quantityInput.type = "number";
  quantityInput.min = 1;
  quantityInput.max = 100;
  quantityInput.value = 1;
  quantityInput.onchange = e => handleChangeQuantityInput(product, e);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.onclick = e => handleAddToCart(product, e);

  productDiv.innerHTML = `
  <div class="img">
  <img src=${image} alt=${title} />
</div>

<div class="info">
  <div class="main">
    <h2>${title}</h2>
    <p>${category}</p>
    <h3>${formattedPrice}</h3>
    <p>${rateStars} - <span>(${count})</span></p>
    <p>${description}</p>
  </div>

  <div class="sub">
    <div class="quantity">
     <!-- decrase quantity btn -->
     <!-- quantity input -->
     <!-- increase quantity btn -->
    </div>
    <!-- <button class="add-to-cart">Add to cart</button> -->
  </div>
</div>
  `;

  const quantity = document.querySelector(".quantity");
  quantity.appendChild(decreaseBtn);
  quantity.appendChild(quantityInput);
  quantity.appendChild(increaseBtn);

  const subDiv = document.querySelector(".sub");
  subDiv.appendChild(addToCartBtn);
  // console.log(quantity);
}

function randomRelatedProducts({ data, product }) {
  const productCategory = product.category;
  const relatedProducts = data.filter(
    dataProduct =>
      dataProduct.category === productCategory && dataProduct.id !== product.id
  );

  //   console.log(relatedProducts.length);
  let randomRelatedProducts = [];

  for (let i = 0; i < 4; i++) {
    const randomProduct = Math.floor(Math.random() * relatedProducts.length);
    if (relatedProducts[randomProduct].id !== product.id) {
      if (!randomRelatedProducts.includes(relatedProducts[randomProduct])) {
        randomRelatedProducts.push(relatedProducts[randomProduct]);
      }
    }
  }

  return randomRelatedProducts;
}

function randomRecommendedProducts({ data, product }) {
  const productCategory = product.category;
  const recommendedProducts = data.filter(
    dataProduct =>
      dataProduct.category !== productCategory && dataProduct.id !== product.id
  );

  let randomRecommendedProducts = [];

  for (let i = 0; i < 4; i++) {
    const randomProduct = Math.floor(
      Math.random() * recommendedProducts.length
    );
    if (recommendedProducts[randomProduct].id !== product.id) {
      if (
        !randomRecommendedProducts.includes(recommendedProducts[randomProduct])
      ) {
        randomRecommendedProducts.push(recommendedProducts[randomProduct]);
      }
    }
  }
  //   console.log(randomRecommendedProducts);
  return randomRecommendedProducts;
}

function renderOtherProducts(data, div) {
  setProductsInHtml({
    data: data,
    status: "All",
    parentDiv: div,
  });
}

function handleDecreaseQuantity(product) {
  // console.log(product);
  const quantityInput = document.querySelector(".quan-input");
  const { value } = quantityInput;
  const newValue = parseInt(value) - 1;

  // console.log(newValue);
  if (newValue < 1) {
    threwToast({
      title: "Error",
      msg: "Quantity can't be less than 1",
      product,
    });
    return (quantityInput.value = 1);
  }
  quantityInput.value = `${newValue}`;
}

function handleIncreaseQuantity(product) {
  const quantityInput = document.querySelector(".quan-input");
  const { value } = quantityInput;
  const newValue = parseInt(value) + 1;

  if (newValue > 100) {
    threwToast({
      title: "Error",
      msg: "Max quantity reached",
      product,
    });
    return (quantityInput.value = 100);
  }
  quantityInput.value = `${newValue}`;
}

function handleChangeQuantityInput(product, e) {
  const newQuantity = parseInt(e.target.value);
  if (newQuantity < 1 || newQuantity > 100) {
    threwToast({
      title: "Error",
      msg: "Quantity must be between 1 and 100",
      product,
    });
    e.target.value = 1;
    return;
  }
  e.target.value = newQuantity;
}

function handleAddToCart(product, e) {
  const parentDiv = e.target.parentElement;
  const input = parentDiv.querySelector(".quan-input");
  const inputValue = parseInt(input.value);
  const updatedProduct = { ...product, quantity: parseInt(inputValue) };
  console.log(updatedProduct);

  const isProductsArrayInLocalStorage =
    checkIsProductsArrayInLocalStorage(updatedProduct);
  if (!isProductsArrayInLocalStorage) return;
  const isProductInLocalStorage = checkIsProductInLocalStorage(updatedProduct);
  if (!isProductInLocalStorage)
    return addNewProductToLocalStorage(updatedProduct);
  const updateProduct = doUpdateProduct(updatedProduct);
  console.log(isProductInLocalStorage);
  addToCart(updatedProduct);
}

function checkIsProductsArrayInLocalStorage(product) {
  const products = JSON.parse(localStorage.getItem("products"));
  if (!products) {
    console.log("not in local");
    localStorage.setItem(
      "products",
      JSON.stringify([
        {
          id: product.id,
          quantity: product.quantity,
        },
      ])
    );

    threwToast({
      title: "added",
      msg: "new product added to cart successfully",
      product,
    });
    return false;
  }
  return true;
}

function checkIsProductInLocalStorage(product) {
  const products = JSON.parse(localStorage.getItem("products"));
  const index = products.findIndex(item => item.id === product.id);
  if (index !== -1) {
    return true;
  }
  return false;
}

function addNewProductToLocalStorage(product) {
  let products = JSON.parse(localStorage.getItem("products"));
  const newProduct = {
    id: product.id,
    quantity: product.quantity,
  };
  products = [...products, newProduct];
  localStorage.setItem("products", JSON.stringify(products));

  threwToast({
    title: "added",
    msg: "new product added to cart successfully",
    product,
  });
}

function doUpdateProduct(product) {
  const products = JSON.parse(localStorage.getItem("products"));
  const index = products.findIndex(item => item.id === product.id);
  const oldQuantity = products[index].quantity;

  const newQuantity = oldQuantity + product.quantity;
  if (newQuantity > 100) {
    threwToast({
      title: "Error",
      msg: "this product already exists in your cart, max quantity reached!",
      product,
    });
    return;
  }

  if (newQuantity < 1) {
    threwToast({
      title: "Error",
      msg: "Quantity can't be less than 1",
      product,
    });
    return;
  }

  products[index].quantity = newQuantity;
  localStorage.setItem("products", JSON.stringify(products));

  threwToast({
    title: "Quantity Updated",
    msg: "this product already exists in your cart, quantity updated successfully",
    product,
  });
  //regenerate cart menu with new quantity
}
