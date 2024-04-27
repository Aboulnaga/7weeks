import fetchAllProducts from "./fetchAllProducts.js";
import setProductsInHtml from "./setProductsInHtml.js";
const featuredProducts = document.querySelector("#featured-products .products");
const newProducts = document.querySelector(
  "#new-collection-products .products"
);

// window.addEventListener("load", async () => {
//   const video = await document.querySelector("#hero video");

//   console.log("video loaded");
//   video.play();
//   console.log(video);
// });

const getData = async () => {
  const fetchData = await fetchAllProducts();
  const data = fetchData.allProducts;
  // console.log(data);
  setProductsInHtml({
    data: data,
    status: "featured",
    parentDiv: featuredProducts,
  });
  setProductsInHtml({
    data: data,
    status: "new",
    parentDiv: newProducts,
  });
  animateFeaturedProductCards(data);
  animateNewcollectionCards(data);

  // const addToCartBtns = [...document.querySelectorAll(".add-to-cart")];
  // addItemToCart(addToCartBtns);
};
getData();

function addItemToCart(addToCartBtns) {
  addToCartBtns.map(btn => {
    btn.addEventListener("click", e => {
      const product = e.target.closest(".product");

      console.log(product);
      console.log(btn);
    });
  });
}

function animateFeaturedProductCards(data) {
  new gsap.registerPlugin(ScrollTrigger);

  const featuredProductParent = document.querySelector(
    "#featured-products .products"
  );
  const featuredProduct = document.querySelectorAll(
    "#featured-products .product"
  );

  // featured product timeline
  let featuredTl = gsap.timeline({
    scrollTrigger: {
      trigger: featuredProductParent,
      // markers: true,
      start: "top bottom",
      end: "bottom center",
      scrub: 2,
      onLeave: function (self) {
        self.disable();
        self.animation.progress(1);
      },
    },
  });
  featuredTl.fromTo(
    featuredProduct,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, duration: 7, stagger: 3 }
  );
}
function animateNewcollectionCards(data) {
  new gsap.registerPlugin(ScrollTrigger);
  const newProductParent = document.querySelector(
    "#new-collection-products .products"
  );
  const newProduct = document.querySelectorAll(
    "#new-collection-products .product"
  );

  // new collection product timeline
  let newCollectionTl = gsap.timeline({
    scrollTrigger: {
      trigger: newProductParent,
      markers: true,
      start: "top bottom",
      end: "bottom center",
      scrub: 3,
      onLeave: function (self) {
        self.disable();
        self.animation.progress(1);
      },
    },
  });
  newCollectionTl.fromTo(
    newProduct,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, duration: 7, stagger: 3 }
  );
}
