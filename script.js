$(document).ready(function () {
  $("#image-slider").carousel();
});
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const productTitle =
        button.parentElement.querySelector(".card-title").textContent;
      const productPrice = parseFloat(
        button.parentElement.querySelector(".card-text").textContent.slice(2)
      );

      const newItem = {
        id: index,
        title: productTitle,
        price: productPrice,
      };

      cartItems.push(newItem);
      updateCartCounter();

      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

      displayCartItems();
    });
  });

  function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let totalAmount = 0;

    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${item.title}</td>
      <td><span class="cart-price">$${item.price.toLocaleString(
        "es-AR"
      )}</span></td>
      <td><button class="btn btn-danger btn-sm remove-from-cart" data-id="${
        item.id
      }">Eliminar</button></td>
    `;
      cartItemsContainer.appendChild(row);

      totalAmount += item.price;
    });

    const totalAmountElement = document.getElementById("total-amount");
    totalAmountElement.textContent = `$${totalAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    const removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(button.getAttribute("data-id"));
        cartItems = cartItems.filter((item) => item.id !== itemId);
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems();
        updateCartCounter();
      });
    });
  }

  updateCartCounter();

  function updateCartCounter() {
    const cartCounter = document.getElementById("cart-counter");
    cartCounter.textContent = cartItems.length;
  }

  displayCartItems();
});
document.addEventListener("DOMContentLoaded", function () {
  const changeBgColorBtn = document.getElementById("change-bg-color-btn");
  const body = document.body;

  changeBgColorBtn.addEventListener("click", function () {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    body.style.backgroundColor = randomColor;
  });
});
