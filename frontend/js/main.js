console.log("MAIN.JS VERSION: 2026-01-21-01");

/* ================================
   (1) STATE & PRICING
   ================================ */
let cart = [];

const boxPrices = {
  small: 35,
  medium: 59,
  large: 95,
  extraLarge: 145,
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

const sizeLabels = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  extraLarge: "Extra Large",
  party: "Party",
  miniChampagne: "Mini Champagne",
  scarletHeart: "Scarlet Heart",
  rubyHeart: "Ruby Heart",
  luminousHeart: "Luminous Heart",
  grandHeart: "Grand Heart",
  whiteElegance: "White Elegance",
  sweetTreasure: "Sweet Treasure",
  goldenHeart: "Golden Heart",
  snowyTreasure: "Snowy Treasure",
  frostyDelight: "Frosty Delight"
};

/* ================================
   (2) CALCULATE ESTIMATE
   ================================ */
function calculateEstimate() {
  const size = document.getElementById("boxSize")?.value; 
  const qty = parseInt(document.getElementById("quantity")?.value || 1, 10);
  const regionFee = parseFloat(document.getElementById("region")?.value || 0);

  const base = boxPrices[size] || 0;
  const total = base * qty + regionFee;

  const estimateEl = document.getElementById("estimate");
  if (estimateEl) {
    estimateEl.textContent = `Estimated total: A$ ${total.toFixed(2)}`;
  }

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

  const size = sizeEl?.value || ""; // já vem "extraLarge"
  const qty = Number(quantityEl?.value || 1);
  const deliveryFee = Number(regionEl?.value || 0);
  const regionLabel = regionEl?.options?.[regionEl.selectedIndex]?.text || "";

  const pricePer = Number(boxPrices[size] || 0);
  const total = (pricePer * qty) + deliveryFee;

  const order = {
    size,
    chocolate: chocolateEl?.value || "",
    toppings: [...document.querySelectorAll(".topping")].map(t => t.value).filter(Boolean),
    notes: notesEl?.value || "",
    deliveryDate: deliveryDateEl?.value || "",
    quantity: qty,
    pricePer,
    deliveryFee,
    regionLabel,
    total
  };

  cart.push(order);
  updateCartUI();

  document.getElementById("cart")?.classList.remove("hidden");
  showToast("Box added to cart");
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
           <span>${sizeLabels[item.size] || item.size} box × ${item.quantity}</span>
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
   (5) CHECKOUT  ✅ 
   ================================ */
async function checkout() {
  if (!cart || cart.length === 0) {
    alert("Your cart is currently empty.");
    return;
  }

  // Converte o carrinho no formato que o backend /checkout espera: { items: [...] }
  const items = cart.map(item => {
    const descriptionParts = [];

    if (item.chocolate) descriptionParts.push(`Chocolate: ${item.chocolate}`);
    if (item.toppings?.length) descriptionParts.push(`Toppings: ${item.toppings.join(", ")}`);
    if (item.regionLabel) descriptionParts.push(`Delivery: ${item.regionLabel} (A$ ${Number(item.deliveryFee || 0).toFixed(2)})`);
    if (item.deliveryDate) descriptionParts.push(`Date: ${item.deliveryDate}`);
    if (item.notes) descriptionParts.push(`Notes: ${item.notes}`);

    return {
      name: sizeLabels[item.size] || item.size,
      description: descriptionParts.join(" | "),
      unit_amount: Math.round(Number(item.pricePer || 0) * 100), // centavos
      quantity: Number(item.quantity || 1)
    };
  });

  try {
    const response = await fetch("https://luxyberry.onrender.com/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Checkout failed:", errText);
      alert("Unable to start payment. Please try again.");
      return;
    }

    const data = await response.json();

    if (!data.url) {
      console.error("Invalid response:", data);
      alert("Payment link was not received.");
      return;
    }

    window.location.href = data.url;
  } catch (err) {
    console.error("Checkout error:", err);
    alert("We couldn’t connect to the payment service. Please try again.");
  }
}

/* ================================
   (6) TOAST NOTIFICATIONS
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

if (hamburger && navLinks) {
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
}

/* ================================
   (9) SWIPER CAROUSEL — PRODUCTS (COVERFLOW PREMIUM)
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".product-carousel");
  if (!carousel || typeof Swiper === "undefined") return;

  new Swiper(carousel, {
    loop: true,
    centeredSlides: true,
    grabCursor: true,

    // ESSENCIAL para o coverflow “empilhar” bem com largura do CSS (clamp)
    slidesPerView: "auto",

    // Espaço controlado (evita buracos)
    spaceBetween: 18,

    autoplay: { delay: 3200, disableOnInteraction: false },

    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: -20,   // negativo aproxima os cards (efeito premium)
      depth: 240,
      modifier: 1.9,
      slideShadows: false
    },

    pagination: {
      el: ".product-carousel .swiper-pagination",
      clickable: true
    },

    breakpoints: {
      0: {
        spaceBetween: 12,
        coverflowEffect: { rotate: 0, stretch: -12, depth: 160, modifier: 1.6, slideShadows: false }
      },
      640: {
        spaceBetween: 16,
        coverflowEffect: { rotate: 0, stretch: -16, depth: 210, modifier: 1.75, slideShadows: false }
      },
      980: {
        spaceBetween: 18,
        coverflowEffect: { rotate: 0, stretch: -20, depth: 240, modifier: 1.9, slideShadows: false }
      }
    }
  });
});