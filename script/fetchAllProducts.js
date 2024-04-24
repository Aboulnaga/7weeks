export default async function fetchAllProducts() {
  try {
    const fake = await fetch("https://fakestoreapi.com/products");
    const fakeProducts = await fake.json();
    // console.log(fakeProducts);
    const res = await fetch("/script/staticDb.json");
    const staticData = await res.json();
    const allProducts = [...fakeProducts, ...staticData.staticDb];
    // console.log(allProducts);
    return { allProducts, fakeProducts, staticData: staticData.staticDb };
  } catch (err) {
    throw new Error(err);
  }
}
