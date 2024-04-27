import fetchAllProducts from "./fetchAllProducts.js";
import setProductsInHtml from "./setProductsInHtml.js";
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
      <button class="decrease">-</button>
      <input type="number" value="1" min="1" max="100" />
      <button class="increase">+</button>
    </div>
    <button class="add-to-cart">Add to cart</button>
  </div>
</div>
  `;
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
