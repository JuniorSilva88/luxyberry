/* ================================
   (1) STATE & PRICING
   ================================ */
let cart = [];

const boxPrices = {
  small: 35,
  medium: 59,
  large: 95,
  xl: 145,
  party: 260,
  miniChampagne: 40,
  scarletHeart: 42,
  rubyHeart: 48,
  luminousHeart: 55,
  grandHeart: 65,
  whiteElegance: 70,
  sweetTreasure: 70,
  goldenHeart: 50,
  snowyTreasure: 45,
  frostyDelight: 40
};

/* ================================
   (2) CALCULATE ESTIMATE
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
   (3) CART ACTIONS
   ================================ */
function addBoxToCart() {
  const sizeEl = document.getElementById("boxSize");
  const chocolateEl = document.getElementById("chocolate");
  const notesEl = document.getElementById("notes");
  const deliveryDateEl = document.getElementById("deliveryDate");
  const regionEl = document.getElementById("region");
  const quantityEl = document.getElementById("quantity");

  const order = {
    size: sizeEl ? sizeEl.value : "",
    chocolate: chocolateEl ? chocolateEl.value : "",
    toppings: [...document.querySelectorAll(".topping")]
      .map(t => t.value)
      .filter(Boolean),
    notes: notesEl ? notesEl.value : "",
    deliveryDate: deliveryDateEl ? deliveryDateEl.value : "",
    region: regionEl ? regionEl.options[regionEl.selectedIndex].text : "",
    quantity: quantityEl ? Number(quantityEl.value) : 1,
    total: calculateEstimate()
  };

  cart.push(order);
  updateCartUI();

  const cartEl = document.getElementById("cart");
  if (cartEl) cartEl.classList.remove("hidden");

  showToast("Box added to cart");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  showToast("Item removed from cart");
}

/* ================================
   (4) CART UI
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
      ${cart.map((item, i) => {
        grandTotal += item.total;
        return `
          <li>
            <span>${item.size.toUpperCase()} box × ${item.quantity}</span>
            <strong>A$ ${item.total.toFixed(2)}</strong>
            <button onclick="removeFromCart(${i})">×</button>
          </li>`;
      }).join("")}
    </ul>
    <div class="cart-total">
      <strong>Total:</strong> A$ ${grandTotal.toFixed(2)}
    </div>
    <button class="btn" onclick="checkout()">Checkout</button>
  `;
}

/* ================================
   (5) CHECKOUT
   ================================ */
async function checkout() {
  try {
    const order = cart[cart.length - 1];
    if (!order) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const response = await fetch("https://luxyberry.onrender.com/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });

    if (!response.ok) throw new Error("Falha ao iniciar pagamento");

    const data = await response.json();
    if (!data.url) throw new Error("URL de pagamento não recebida");

    window.location.href = data.url;
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Erro ao conectar com o pagamento. Tente novamente.");
  }
}

/* ================================
   (6) TOAST — PREMIUM FEEDBACK
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
   (7) LISTENERS
   ================================ */
["boxSize", "quantity", "region"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", calculateEstimate);
});
calculateEstimate();

/* ================================
   (8) MOBILE MENU
   ================================ */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

/* ================================
   (9) SWIPER CAROUSEL — PRODUCTS
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper('.product-carousel', {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 2,
      slideShadows: false,
    },
    pagination: { el: '.swiper-pagination', clickable: true }
  });
});
