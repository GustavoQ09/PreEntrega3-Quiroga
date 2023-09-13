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

      Swal.fire({
        title: "Agregado al carrito",
        text: `Se ha agregado "${productTitle}" al carrito.`,
        icon: "success",
        confirmButtonText: "OK",
      });
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

const ripCurlWatches = [
  {
    id: 1,
    name: "Reloj Casio G-Shock - Azul",
    price: 240,
  },
  {
    id: 2,
    name: "Reloj Casio G-Shock - Blanco",
    price: 235,
  },
  {
    id: 3,
    name: "Reloj Casio G-Shock - Gris",
    price: 310,
  },
  {
    id: 4,
    name: "Reloj Casio G-Shock - Negro",
    price: 280,
  },
  {
    id: 5,
    name: "Reloj Casio G-Shock - Rojo",
    price: 280,
  },
  {
    id: 6,
    name: "Reloj Casio G-Shock - Rosa",
    price: 240,
  },
  {
    id: 7,
    name: "Rip Curl Cambridge Sil.",
    price: 155,
  },
  {
    id: 8,
    name: "Rip Curl Detroit Gunmetal",
    price: 290,
  },
  {
    id: 9,
    name: "Rip Curl Search GPS Series",
    price: 520,
  },
];

const newWatch = {
  id: 10,
  name: "Rip Curl Classic Black",
  price: 175,
};

ripCurlWatches.push(newWatch);

const expensiveWatches = ripCurlWatches.filter((watch) => watch.price > 250);

const totalPrices = ripCurlWatches.reduce(
  (total, watch) => total + watch.price,
  0
);
const averagePrice = totalPrices / ripCurlWatches.length;

alert("Bienvenido a la tienda de relojes Rip Curl.");

const userChoice = prompt(
  "¿Qué desea hacer?\n\n1. Ver todos los relojes Rip Curl\n2. Ver relojes caros\n3. Calcular el precio promedio\n\nPor favor, ingrese el número correspondiente:"
);

if (userChoice === "1") {
  let watchesList = "Lista de relojes Rip Curl:\n";
  ripCurlWatches.forEach((watch) => {
    watchesList += `ID: ${watch.id}, Nombre: ${watch.name}, Precio: $${watch.price}\n`;
  });
  alert(watchesList);
} else if (userChoice === "2") {
  let expensiveList = "Relojes caros (precio superior a $250):\n";
  expensiveWatches.forEach((watch) => {
    expensiveList += `Nombre: ${watch.name}, Precio: $${watch.price}\n`;
  });
  alert(expensiveList);
} else if (userChoice === "3") {
  alert(
    `El precio promedio de los relojes Rip Curl es: $${averagePrice.toFixed(2)}`
  );
} else {
  alert("Opción no válida. Por favor, seleccione una opción válida.");
}

const canvas = document.getElementById("precio-relojes-chart");

const preciosRelojes = ripCurlWatches.map((watch) => watch.price);

const ctx = canvas.getContext("2d");
const precioRelojesChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ripCurlWatches.map((watch) => watch.name),
    datasets: [
      {
        data: preciosRelojes,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 2)",
          "rgba(25, 206, 86, 0.6)",
          "rgba(75, 12, 190, 0.6)",
          "rgba(500, 19, 13, 0.6)",
          "rgba(75, 300, 10, 0.6)",
          "rgba(95, 50, 100, 0.6)",
          "rgba(5, 92, 192, 0.6)",
          "rgba(75, 350, 175, 0.6)",
        ],
      },
    ],
  },
  options: {
    responsive: false,
  },
});
