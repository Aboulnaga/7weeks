export default function addToCart(product) {
  const isArrayInLocal = isProductsArrayInLocalStorage(product);
  if (!isArrayInLocal) return;
  // if there is product in local storage
  // i want unique products
  const isUniqueInLocal = checkIfProductIdInLocalStorage(product);
  if (isUniqueInLocal) return addNewProductToLocalStorage(product);

  //   addNewProductToLocalStorage(product);
}

function isProductsArrayInLocalStorage(product) {
  const products = JSON.parse(localStorage.getItem("products"));
  if (!products) {
    // console.log("not in local");
    localStorage.setItem(
      "products",
      JSON.stringify([
        {
          id: product.id,
          quantity: 1,
        },
      ])
    );
    return false;
  }
  return true;
}

function checkIfProductIdInLocalStorage(product) {
  const products = JSON.parse(localStorage.getItem("products"));
  const index = products.findIndex(item => item.id === product.id);
  if (index !== -1) {
    const upatedProductQuantity = (products[index].quantity += 1);
    const newProduct = { ...products[index], quantity: upatedProductQuantity };
    products[index] = newProduct;
    localStorage.setItem("products", JSON.stringify(products));
    // console.log(upatedProductQuantity);
    return false;
  }
  return true;
}

function addNewProductToLocalStorage(product) {
  let products = JSON.parse(localStorage.getItem("products"));

  const newProduct = {
    id: product.id,
    quantity: 1,
  };
  products = [...products, newProduct];
  localStorage.setItem("products", JSON.stringify(products));
}
