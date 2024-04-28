import fetchAllProducts from "./fetchAllProducts.js";
import setProductsInHtml from "./setProductsInHtml.js";
const featuredProducts = document.querySelector("#featured-products .products");
const newProducts = document.querySelector(
  "#new-collection-products .products"
);
gsap.registerPlugin(ScrollTrigger);
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
  amimateHeroSection();
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

function amimateHeroSection() {
  const hero = document.querySelector("#hero");
  const heroContainer = document.querySelector("#hero .container");
  let heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      // markers: true,
      start: "top top",
      // end: "bottom center",
      pin: true,
      pinSpacing: false,
      scrub: 2,
      // onLeave: function (self) {
      //   self.disable();
      //   self.animation.progress(1);
      // },
    },
  });

  heroTl.fromTo(
    heroContainer,
    { opacity: 1, scale: 1, duration: 7, y: 0 },
    { opacity: 0, scale: 0.7, duration: 7, y: "1000" }
  );
}

function animateFeaturedProductCards(data) {
  const featuredProductParent = document.querySelector(
    "#featured-products .products"
  );
  const featuredProduct = document.querySelectorAll(
    "#featured-products .product"
  );

  // featured product timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: featuredProductParent,
      markers: true,
      start: "top bottom",
      end: "bottom center",
      scrub: 1,
      // pin: true,
      // pinSpacing: true,
      onLeave: function (self) {
        self.disable();
        self.animation.progress(1);
      },
    },
  });
  tl.fromTo(
    featuredProduct,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, stagger: 2.25, duration: 3 }
  );
}

function animateNewcollectionCards(data) {
  const newProductParent = document.querySelector(
    "#new-collection-products .products"
  );
  const newProduct = document.querySelectorAll(
    "#new-collection-products .product"
  );

  // new collection product timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: newProduct,
      markers: true,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onLeave: function (self) {
        self.disable();
        self.animation.progress(1);
      },
    },
  });
  tl.fromTo(
    newProduct,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1, stagger: 2.25, duration: 3 }
  );
}

// function animateFeaturedProductCards(data) {
//   new gsap.registerPlugin(ScrollTrigger);

//   const featuredProductParent = document.querySelector(
//     "#featured-products .products"
//   );
//   const featuredProduct = document.querySelectorAll(
//     "#featured-products .product"
//   );

//   // featured product timeline
//   let featuredTl = gsap.timeline({
//     scrollTrigger: {
//       trigger: featuredProductParent,
//       markers: true,
//       start: "top bottom",
//       end: "bottom center",
//       scrub: 0.5,
//       onLeave: function (self) {
//         self.disable();
//         self.animation.progress(1);
//       },
//     },
//   });
//   featuredTl.fromTo(
//     featuredProduct,
//     { opacity: 0, scale: 0.7 },
//     { opacity: 1, scale: 1, duration: 7, stagger: 3 }
//   );
// }
