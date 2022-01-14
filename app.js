const ProductData = [
  {
    id: 1,
    name: "Sample Product",
    price: 120,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
  },
  {
    id: 2,
    name: "Sample Product",
    price: 160,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
  },
  {
    id: 3,
    name: "Sample Product",
    price: 140,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
  },
  {
    id: 4,
    name: "Sample Product",
    price: 120,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
  },
  {
    id: 5,
    name: "Sample Product",
    price: 180,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
  },
  {
    id: 6,
    name: "Sample Product",
    price: 110,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
  },
];

// store data in localstorage

localStorage.setItem("products", JSON.stringify(ProductData));
localStorage.setItem("cart", JSON.stringify([]));

// create a single product

function createProduct(item) {
  const marktup = `<div class="card mb-4" style="width:32%">
    <img
      src=${item.img}
      class="card-img-top product-image"
      alt="product-image"
    />
    <div class="card-body">
      <h4 class="card-title product-name">${item.name}</h5>
      <h5 class="card-title my-3 product-price">Price : ${item.price}</h5>
      <button  class="btn btn-primary add-to-cart">Add To Cart</button>
    </div>
  </div>`;
  return marktup;
}

var addToCartBtn;

function productShow() {
  const productListDom = document.querySelector(".product-list");
  if (productListDom) {
    const allProduct = JSON.parse(localStorage.getItem("products"));
    allProduct.forEach((singleProduct) => {
      const product = createProduct(singleProduct);
      productListDom.insertAdjacentHTML("afterbegin", product);
    });
  }
  addToCartBtn = document.querySelector(".add-to-cart");
}

window.addEventListener("load", productShow);

// product add to cart

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", productAddToCart(e));
  console.log("hi");
}

console.log(addToCartBtn);

function productAddToCart(e) {
  console.log("hi");
}
