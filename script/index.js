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
  animateProductsCards(data);

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

const animateProductsCards = data => {
  const featuredProductParent = document.querySelectorAll(
    "#featured-products .products"
  );
  const featuredProduct = document.querySelectorAll(
    "#featured-products .product"
  );
  const newProductParent = document.querySelectorAll(
    "#new-collection-products .products"
  );
  const newProduct = document.querySelectorAll(
    "#new-collection-products .product"
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

  // new collection product timeline
  let newCollectionTl = gsap.timeline({
    scrollTrigger: {
      trigger: newProductParent,
      // markers: true,
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
};
