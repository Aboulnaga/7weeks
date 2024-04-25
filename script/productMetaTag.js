import fetchAllProducts from "./fetchAllProducts.js";
const link = new URL(window.location);
const id = link.searchParams.get("ID");

async function getData() {
  const data = (await fetchAllProducts()).allProducts;
  const product = data.find(product => product.id == id);
  setMetaData(product);
  console.log(product);
}
getData();
function setMetaData(product) {
  const meta = `
        <title>${product.title}</title>
        <meta name="description" content="${product.description}">
        <meta property="og:title" content="${product.title}">
        <meta property="og:description" content="${product.description}">
        <meta property="og:image" content="${product.image}">
        <meta property="og:url" content="${window.location.href}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="7weeks">
        <meta name="twitter:title" content="${product.title}">
        <meta name="twitter:description" content="${product.description}">
        <meta name="twitter:image" content="${product.image}">
        <meta name="twitter:url" content="${window.location.href}">
        <meta name="twitter:card" content="summary_large_image">
    `;

  document.querySelector("head").insertAdjacentHTML("afterbegin", meta);
}

// function setMetaData(product) {
//   console.log(product.description);
//   document.title = `7weeks - ${product.title}`;
//   document
//     .querySelector("meta[name='description']")
//     .setAttribute("content", product.description);

//   document
//     .querySelector("meta[property='og:title']")
//     .setAttribute("content", product.title);

//   document
//     .querySelector("meta[property='og:description']")
//     .setAttribute("content", product.description);

//   document
//     .querySelector("meta[property='og:image']")
//     .setAttribute("content", product.image);

//   document
//     .querySelector("meta[property='og:url']")
//     .setAttribute("content", window.location.href);

//   document
//     .querySelector("meta[property='og:type']")
//     .setAttribute("content", "website");

//   document
//     .querySelector("meta[property='og:site_name']")
//     .setAttribute("content", "7weeks");

//   document
//     .querySelector("meta[name='twitter:title']")
//     .setAttribute("content", product.title);

//   document
//     .querySelector("meta[name='twitter:description']")
//     .setAttribute("content", product.description);

//   document
//     .querySelector("meta[name='twitter:image']")
//     .setAttribute("content", product.image);

//   document
//     .querySelector("meta[name='twitter:url']")
//     .setAttribute("content", window.location.href);

//   document
//     .querySelector("meta[name='twitter:card']")
//     .setAttribute("content", "summary_large_image");

//   document
//     .querySelector("meta[name='twitter:site']")
//     .setAttribute("content", "@7weeks");

//   document
//     .querySelector("meta[name='twitter:creator']")
//     .setAttribute("content", "@7weeks");

//   document
//     .querySelector("meta[name='twitter:image:alt']")
//     .setAttribute("content", product.title);
// }
