/* ================================
   LUXYBERRY — BUILD YOUR BOX 
   ================================ */

/* ================================
   PRICING
   ================================ */

const boxPrices = {
  small: 35,
  medium: 59,
  large: 95,
  xl: 145,
  party: 260
};

/* ================================
   STATE
   ================================ */

let cart = [];

/* ================================
   CALCULATE ESTIMATE
   ================================ */

function calculateEstimate() {
  const size = document.getElementById("boxSize").value;
  const qty = parseInt(document.getElementById("quantity").value || 1, 10);
  const regionFee = parseFloat(document.getElementById("region").value || 0);

  const base = boxPrices[size] || 0;
  const total = base * qty + regionFee;

  document.getElementById("estimate").textContent =
    `Estimate: A$ ${total.toFixed(2)}`;

  return total;
}

/* ================================
   LISTENERS
   ================================ */

["boxSize", "quantity", "region"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", calculateEstimate);
});

calculateEstimate();

/* ================================
   ADD TO CART
   ================================ */

function addBoxToCart() {
  const order = {
    size: boxSize.value,
    chocolate: chocolate.value,
    toppings: [...document.querySelectorAll(".topping")]
      .map(t => t.value)
      .filter(Boolean),
    notes: notes.value,
    deliveryDate: deliveryDate.value,
    region: region.options[region.selectedIndex].text,
    quantity: parseInt(quantity.value, 10),
    total: calculateEstimate()
  };

  cart.push(order);
  updateCartUI();
  showToast("Box added to cart");
}

/* ================================
   CART UI
   ================================ */

function updateCartUI() {
  const cartBox = document.querySelector(".cart");
  if (!cartBox) return;

  if (cart.length === 0) {
    cartBox.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  let grandTotal = 0;

  cartBox.innerHTML = `
    <h4>Your Order</h4>
    <ul class="cart-list">
      ${cart
        .map((item, i) => {
          grandTotal += item.total;
          return `
            <li>
              <span>${item.size.toUpperCase()} box × ${item.quantity}</span>
              <strong>A$ ${item.total.toFixed(2)}</strong>
              <button onclick="removeFromCart(${i})">×</button>
            </li>`;
        })
        .join("")}
    </ul>

    <div class="cart-total">
      <strong>Total:</strong> A$ ${grandTotal.toFixed(2)}
    </div>

    <button class="btn" onclick="checkout()">Checkout</button>
  `;
}

/* ================================
   REMOVE ITEM
   ================================ */

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

/* ================================
   LUXYBERRY — STRIPE CHECKOUT
   ================================ */

async function checkout() {
  if (!cart || cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const order = {
    items: cart.map(item => ({
      name: `LuxyBerry Box ${item.size.toUpperCase()}`,
      price: Number((item.total / item.quantity).toFixed(2)),
      quantity: item.quantity
    }))
  };

  try {
    const response = await fetch(
      "https://luxyberry.onrender.com/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao iniciar pagamento");
    }

    const data = await response.json();

    if (!data.url) {
      throw new Error("URL de pagamento não recebida");
    }

    window.location.href = data.url;

  } catch (err) {
    console.error("Checkout error:", err);
    alert("Erro ao conectar com o pagamento. Tente novamente.");
  }
}


/* ================================
   TOAST — PREMIUM FEEDBACK
   ================================ */

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 2600);
}
/* ================================
   MOBILE MENU
   ================================ */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

/* Fecha o menu ao clicar em um link */
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});
