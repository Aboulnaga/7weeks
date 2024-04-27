import threwToast from "./threwToast.js";
import handleCartMenu from "./productsCartMenu.js";
export function handleDecreaseQuantity(product) {
  const newQuantity = product.quantity - 1;
  if (newQuantity < 1) {
    threwToast({
      title: "Error",
      msg: "Quantity can't be less than 1",
      product,
    });
    return;
  }

  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
  const index = localStorageProducts.findIndex(item => item.id === product.id);
  localStorageProducts[index].quantity = newQuantity;
  localStorage.setItem("products", JSON.stringify(localStorageProducts));

  threwToast({
    title: "Quantity Updated",
    msg: "Quantity decreased successfully",
    product,
  });

  //regenerate cart menu with new quantity
  handleCartMenu();
}
export function handleIncreaseQuantity(product) {
  const newQuantity = product.quantity + 1;

  if (newQuantity > 100) {
    threwToast({
      title: "Error",
      msg: "Quantity can't be more than 100",
      product,
    });
    return;
  }

  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
  const index = localStorageProducts.findIndex(item => item.id === product.id);
  localStorageProducts[index].quantity = newQuantity;
  localStorage.setItem("products", JSON.stringify(localStorageProducts));

  threwToast({
    title: "Quantity Updated",
    msg: "Quantity increased successfully",
    product,
  });

  //regenerate cart menu with new quantity
  handleCartMenu();
}

export function handleChangeQuantityInput(product, e) {
  const newQuantity = parseInt(e.target.value);
  if (newQuantity < 1 || newQuantity > 100) {
    threwToast({
      title: "Error",
      msg: "Quantity must be between 1 and 100",
      product,
    });
    e.target.value = product.quantity;
    return;
  }

  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
  const index = localStorageProducts.findIndex(item => item.id === product.id);
  localStorageProducts[index].quantity = newQuantity;
  localStorage.setItem("products", JSON.stringify(localStorageProducts));
  threwToast({
    title: "Quantity Updated",
    msg: "Quantity changed successfully",
    product,
  });

  //regenerate cart menu with new quantity
  handleCartMenu();
}

export function handleRemoveProduct(product) {
  const localStorageProducts = JSON.parse(localStorage.getItem("products"));
  const index = localStorageProducts.findIndex(item => item.id === product.id);
  localStorageProducts.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(localStorageProducts));
  threwToast({
    title: "Product Removed",
    msg: "Product removed successfully",
    product,
  });
  //regenerate cart menu with new quantity
  handleCartMenu();
}

export function calculateTotalPrice(products) {
  const totalDiv = document.querySelector(".total .total-price");
  let totalPrice = 0;
  products.forEach(product => {
    totalPrice += product.price * product.quantity;
  });

  const formatPrice = totalPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  totalDiv.textContent = `${formatPrice}`;
}
