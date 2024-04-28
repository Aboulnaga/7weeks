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
  const featuredProductsParentDiv = document.querySelector(
    "#featured-products .products"
  );
  const featuredProductCards = document.querySelectorAll(
    "#featured-products .products .product"
  );

  const intersection = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // console.log(entry.target);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry.target,
            start: "top bottom",
            end: "bottom center",
            scrub: 1,
            // markers: true,
            onLeave: function (self) {
              self.disable();
              self.animation.progress(1);
            },
          },
        });
        tl.fromTo(
          featuredProductCards,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 3, stagger: 2.25 }
        );

        intersection.unobserve(entry.target);
      }
    });
  });

  intersection.observe(featuredProductsParentDiv);
}
function animateNewcollectionCards(data) {
  const newCollectionProductsParentDiv = document.querySelector(
    "#new-collection-products .products"
  );
  const newCollectionProductCards = document.querySelectorAll(
    "#new-collection-products .products .product"
  );

  const intersection = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // console.log(entry.target);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry.target,
            start: "top bottom",
            end: "bottom center",
            scrub: 1,
            // markers: true,
            onLeave: function (self) {
              self.disable();
              self.animation.progress(1);
            },
          },
        });
        tl.fromTo(
          newCollectionProductCards,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 3, stagger: 2.25 }
        );

        intersection.unobserve(entry.target);
      }
    });
  });

  intersection.observe(newCollectionProductsParentDiv);
}
