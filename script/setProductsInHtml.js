import addToCart from "./addToCart.js";
import threwToast from "./threwToast.js";
// addToCart(1);

export default function setProductsInHtml({ data, status, parentDiv }) {
  const filterProducts = data.filter(item => {
    if (status === "All") {
      return item;
    } else {
      return item.status === status;
    }
  });
  filterProducts.map((product, i) => {
    const rateStars = `<i class="fas fa-star icon"></i>`.repeat(
      product.rating.rate
    );
    const formattedPrice = product.price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const poductBrand = product.brand || "";
    const productUrl = product.title.split(" ").join("-").toLowerCase();
    const productDiv = document.createElement("div");
    productDiv.classList.add(`product`);
    productDiv.classList.add(`product-${i + 1}`);

    // console.log(rateStars);
    productDiv.innerHTML = `
    <div class="img">
    <a href="/pages/product.html?ID=${product.id}&Product=${productUrl}">
     <img src="${product.image}" alt="product-img" /> </a>
    </div>
    <div class="info">
      <p class="brand">${poductBrand}</p>
      <a href="/pages/product.html?ID=${product.id}&Product=${productUrl}">
   <p class="title">${product.title}</p> </a>
      <div class="rate">
      <span class="stars">${rateStars}</span> - <span class="count">(${product.rating.count})</span>
      </div>
      <div class="buy">
        <div class="price">${formattedPrice}</div>
        <div class="add-to-cart">
        </div>
      </div>
    </div>
  
  `;

    const addToCartDiv = productDiv.querySelector(".add-to-cart");
    const addToCarBtn = document.createElement("button");
    addToCarBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;

    addToCarBtn.addEventListener("click", () => {
      addToCart(product);
      threwToast({
        product,
        title: "Added",
        msg: `${product.title} has been added to cart`,
      });
    });
    addToCartDiv.appendChild(addToCarBtn);

    parentDiv.appendChild(productDiv);

    // add to cart
  });
  return true;
}

{
  /* <div class="add-to-cart"><button onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping"></i></button></div> */
}

// function addToCart(id) {
//   console.log(id);
// }

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

// export default function setProductsInHtml({ data, status, parentDiv }) {
//   const filterProducts = data.filter(item => item.status === status);
//   filterProducts.map(product => {
//     const rateStars = `<i class="fas fa-star icon"></i>`.repeat(
//       product.rating.rate
//     );
//     const formattedPrice = product.price.toLocaleString("en-US", {
//       style: "currency",
//       currency: "USD",
//     });
//     const productUrl = product.title.split(" ").join("-").toLowerCase();
//     // console.log(rateStars);
//     parentDiv.innerHTML += `
//   <div class="product">
//     <div class="img">
//     <a href="/pages/product.html?ID=${product.id}&Product=${productUrl}">
//      <img src="${product.image}" alt="product-img" /> </a>
//     </div>
//     <div class="info">
//       <p class="brand">${product.brand}</p>
//       <a href="/pages/product.html?ID=${product.id}&Product=${productUrl}">
//    <p class="title">${product.title}</p> </a>
//       <div class="rate">
//       <span class="stars">${rateStars}</span> - <span class="count">(${product.rating.count})</span>
//       </div>
//       <div class="buy">
//         <div class="price">${formattedPrice}</div>
//         <div class="add-to-cart"><button><i class="fa-solid fa-cart-shopping"></i></button></div>
//       </div>
//     </div>
//   </div>

//   `;
//   });
// }
