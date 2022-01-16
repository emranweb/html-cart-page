const ProductData = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 120,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 2,
    name: "Sample Product 2",
    price: 160,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 3,
    name: "Sample Product 3",
    price: 140,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 4,
    name: "Sample Product 4",
    price: 120,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 5,
    name: "Sample Product 5",
    price: 180,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
  {
    id: 6,
    name: "Sample Product 6",
    price: 110,
    img: "http://via.placeholder.com/600x400",
    stock: 5,
    qnt: 1,
  },
];

localStorage.setItem("products", JSON.stringify(ProductData));

const productCart = [];

// store data in localstorage

// create a single product

const productImage = document.querySelectorAll(".product-image");
const productName = document.querySelectorAll(".product-name");
const productPrice = document.querySelectorAll(".product-price");
const addToCartBtn = document.querySelectorAll(".add-to-cart");
const productPage = document.querySelector(".product-wrapper");
const cartPage = document.querySelector(".cart-wrapper");
const listGroup = document.querySelector(".list-group");
const showPrice = document.querySelector(".show-price");

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
  if (productPage) {
    allProduct.forEach((singleProduct, index) => {
      createProduct(singleProduct, index);
    });
  }
  if (cartPage) {
    const allCartProduct = JSON.parse(localStorage.getItem("cart"));
    allCartProduct.forEach((item) => {
      createCartProduct(item);
    });
    showUpdatePrice();
  }
}

function showUpdatePrice() {
  let price = 0;
  const allCartProductPrice = JSON.parse(localStorage.getItem("cart"));
  price = allCartProductPrice.reduce(
    (current, acc) => current + acc.price * acc.qnt,
    0
  );
  showPrice.textContent = price;
}

function createCartProduct(single) {
  const markup = `
  <li
  class="list-group-item d-flex justify-content-between align-items-center"
>
  <span>
    <img
      style="width: 50px; height: 50px"
function createCartProduct(single) {
  src=${single.img}
      alt=""
    />
  </span>
  <span class="cart-product-name">${single.name}</span>
  <span data-id=${single.id}>
    <button class="btn btn-outline-secondary" data-id=${single.id} type="button" onclick="increment()">+</button>

    <button class="btn btn-outline-secondary"  type="button">
      ${single.qnt}
    </button>
    <button class="btn btn-outline-secondary" onclick="drecrement()" data-id=${single.id} type="button">-</button>
  </span>
  <span>$${single.price}</span>
  <button class="btn btn-outline-danger" data-id=${single.id} onclick="deleteCart()">x</button>
</li>
  `;
  if (listGroup) {
    listGroup.insertAdjacentHTML("afterbegin", markup);
  }
}

window.addEventListener("load", productShow);

// product add to cart

Array.from(addToCartBtn).forEach((eachBtn) => {
  eachBtn.addEventListener("click", productAddToCart);
});

const cartIcon = document.querySelector(".cart-icon");

function productAddToCart() {
  const currentProductId = Number(this.dataset.id);
  const product = ProductData.filter((item) => item.id === currentProductId)[0];
  if (productCart.length === 0) {
    productCart.push(product);
  } else {
    const exist = productCart.filter((item) => item.id === currentProductId);
    if (exist.length === 0) {
      productCart.push(product);
    } else {
      const x = exist[0].id;
      console.log(x);
      productCart.map((item, index) => {
        if (item.id == x) {
          productCart[index].qnt < productCart[index].stock
            ? productCart[index].qnt++
            : "";
        }
      });
    }
  }
  cartIcon.textContent = productCart.length;
  localStorage.setItem("cart", JSON.stringify(productCart));
}

cartIcon.textContent = JSON.parse(localStorage.getItem("cart")).length;

//increment and decrement

function increment() {
  const id = Number(event.target.getAttribute("data-id"));
  const items = JSON.parse(localStorage.getItem("cart"));

  items.forEach((item, index) => {
    if (item.id === id) {
      items[index].qnt < items[index].stock ? items[index].qnt++ : item;
    }
  });

  localStorage.setItem("cart", JSON.stringify(items));
  listGroup.innerHTML = "";
  const allCartProduct = JSON.parse(localStorage.getItem("cart"));
  allCartProduct.forEach((item) => {
    createCartProduct(item);
    showUpdatePrice();
  });
}

function drecrement() {
  const id = Number(event.target.getAttribute("data-id"));
  const items = JSON.parse(localStorage.getItem("cart"));

  items.forEach((item, index) => {
    if (item.id === id) {
      items[index].qnt > 1 ? items[index].qnt-- : item;
    }
  });

  localStorage.setItem("cart", JSON.stringify(items));
  listGroup.innerHTML = "";
  const allCartProduct = JSON.parse(localStorage.getItem("cart"));
  allCartProduct.forEach((item) => {
    createCartProduct(item);
    showUpdatePrice();
  });
}

function deleteCart() {
  const id = Number(event.target.getAttribute("data-id"));
  const allCartProduct = JSON.parse(localStorage.getItem("cart"));
  const items = allCartProduct.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(items));
  listGroup.innerHTML = "";
  const allCartProductAfterUpdate = JSON.parse(localStorage.getItem("cart"));
  allCartProductAfterUpdate.forEach((item) => {
    createCartProduct(item);
    showUpdatePrice();
  });
}
