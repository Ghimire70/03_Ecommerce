document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-button");

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <div>
    <h3>${product.name}</h3>
    <div class="price">$${product.price.toFixed(2)}</div>
    </div>
    <button data-id = "${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <div class = "cart-item-name">${item.name}</div>
          <div class = "cart-item-price">${item.price.toFixed(2)}</div>
          <button class = "remove-item" data-index = "{index}">x</button>
        `;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      cartTotalMessage.classList.add("hidden");
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  checkOutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      cart.length = 0;
      saveCart();
      alert("Checkout Sucessfully");
      renderCart();
    }
  });
  renderCart();
});
