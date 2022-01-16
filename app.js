const ProductData = [
  {
    id: 1,
    name: "Sample Product",
    price: 120,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 2,
    name: "Sample Product",
    price: 160,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 3,
    name: "Sample Product",
    price: 140,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 4,
    name: "Sample Product",
    price: 120,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 5,
    name: "Sample Product",
    price: 180,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 6,
    name: "Sample Product",
    price: 110,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
];

const productCart = [];

// store data in localstorage

localStorage.setItem("products", JSON.stringify(ProductData));

// create a single product

const productImage = document.querySelectorAll(".product-image");
const productName = document.querySelectorAll(".product-name");
const productPrice = document.querySelectorAll(".product-price");
const addToCartBtn = document.querySelectorAll(".add-to-cart");

function createProduct(productInfo, index) {
  const productImageArray = Array.from(productImage);
  const productNameArray = Array.from(productName);
  const productPriceArray = Array.from(productPrice);
  const productCartBtnArray = Array.from(addToCartBtn);
  productNameArray[index].textContent = productInfo.name;
  productPriceArray[index].textContent = productInfo.price;
  productImageArray[index].setAttribute("src", productInfo.img);
  productCartBtnArray[index].setAttribute("data-id", productInfo.id);
}

function productShow() {
  const allProduct = JSON.parse(localStorage.getItem("products"));
  allProduct.forEach((singleProduct, index) => {
    createProduct(singleProduct, index);
  });
}

window.addEventListener("load", productShow);

// product add to cart

Array.from(addToCartBtn).forEach((eachBtn) => {
  eachBtn.addEventListener("click", productAddToCart);
});

function productAddToCart() {
  const currentProductId = Number(this.dataset.id);
  const currentProductInfo = ProductData.filter(
    (item) => item.id === currentProductId
  );

  if (productCart.length < 1) {
    console.log("first Product");
    productCart.push(currentProductInfo[0]);
  }
  if (productCart.length >= 1) {
    productCart.map((item, index) => {
      console.log(item.id === currentProductId);
      if (item.id === currentProductId) {
        productCart[index].qnt < productCart[index].stock
          ? productCart[index].qnt++
          : "";
      } else {
        productCart.push(currentProductInfo[0]);
      }
    });
  }

  console.log(productCart);
}
