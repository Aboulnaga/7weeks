const featuredProducts = document.querySelector("#featured-products .products");
const newProducts = document.querySelector(
  "#new-collection-products .products"
);

console.log(featuredProducts, newProducts);

// fetch const data
const fetchStaticData = async () => {
  try {
    const fake = await fetch("https://fakestoreapi.com/products");
    const fakeProducts = await fake.json();
    const res = await fetch("./script/staticDb.json");
    const data = await res.json();
    const allProducts = [...fakeProducts, ...data.staticDb];
    console.log(allProducts);
    setDataInHtml({
      data: data.staticDb,
      status: "featured",
      parentDiv: featuredProducts,
    });
    setDataInHtml({
      data: data.staticDb,
      status: "new",
      parentDiv: newProducts,
    });
  } catch (err) {
    throw new Error(err);
  }
};

fetchStaticData();

{
  /* <div class="product">
            <div class="img">
              <img src="img/products/f1.jpg" alt="product-img" />
            </div>
            <div class="info">
              <span>adidas</span>
              <h5>Cartoon Astronaut T-Shirts</h5>
              <div class="star">
                <i class="fas fa-star icon"></i>
                <i class="fas fa-star icon"></i>
                <i class="fas fa-star icon"></i>
                <i class="fas fa-star icon"></i>
                <i class="fas fa-star icon"></i>
              </div>
              <h4>$78</h4>
            </div>
          </div> */
}

function setDataInHtml({ data, status, parentDiv }) {
  const filterProducts = data.filter(item => item.status === status);
  filterProducts.map(product => {
    const rateStars = `<i class="fas fa-star icon"></i>`.repeat(
      product.rating.rate
    );
    const formattedPrice = product.price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const productUrl = product.title.split(" ").join("-").toLowerCase();
    // console.log(rateStars);
    parentDiv.innerHTML += `
<div class="product">
  <div class="img">
  <a href="/pages/product.html?ID=${product.id}&Product=${productUrl}">
   <img src="${product.image}" alt="product-img" /> </a>
  </div>
  <div class="info">
    <p class="brand">${product.brand}</p>
    <a href="/pages/product.html?ID=${product.id}&Product=${productUrl}">
 <p class="title">${product.title}</p> </a>
    <div class="rate">
    <span class="stars">${rateStars}</span> - <span class="count">(${product.rating.count})</span>
    </div>
    <div class="buy">
      <div class="price">${formattedPrice}</div>
      <div class="add-to-cart"><button><i class="fa-solid fa-cart-shopping"></i></button></div>
    </div>
  </div>
</div>

`;
  });
}
