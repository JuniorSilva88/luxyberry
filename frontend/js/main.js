console.log("MAIN.JS VERSION: 2026-01-24-01");

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
  const postcodeEl = document.getElementById("postcode");
  const referenceEl = document.getElementById("referencePoint");
  const phoneEl = document.getElementById("contactPhone");


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
    postcode: postcodeEl?.value || "",
    referencePoint: referenceEl?.value || "",
    contactPhone: phoneEl?.value || "",
    quantity: qty,
    pricePer,
    deliveryFee,
    regionLabel,
    total
  };

  cart.push(order);
  updateCartUI();

  openCart();
  showToast("Box added to cart");
}


/* ================================
   (4) CART UI
   ================================ */
function updateCartUI() {
  const cartBox = document.querySelector(".cart-body");
  if (!cartBox) return;

  if (cart.length === 0) {
    cartBox.innerHTML = "<p>Your cart is empty</p>";

    document.getElementById("cartSubtotal").textContent = "A$ 0.00";
    document.getElementById("cartDelivery").textContent = "A$ 0.00";
    document.getElementById("cartTotal").textContent = "A$ 0.00";
    return;
  }

  let subtotal = 0;
  let deliveryTotal = 0;

  cartBox.innerHTML = `
    <h4>Your Order</h4>
    <ul class="cart-list">
      ${cart.map((item, i) => {
    const itemSubtotal = item.pricePer * item.quantity;
    subtotal += itemSubtotal;
    deliveryTotal += Number(item.deliveryFee || 0);

    return `
          <li>
            <span>${sizeLabels[item.size] || item.size} × ${item.quantity}</span>
            <strong>A$ ${(itemSubtotal + item.deliveryFee).toFixed(2)}</strong>
            <button onclick="removeFromCart(${i})">×</button>
          </li>
        `;
  }).join("")}
    </ul>
  `;

  const grandTotal = subtotal + deliveryTotal;

  document.getElementById("cartSubtotal").textContent = `A$ ${subtotal.toFixed(2)}`;
  document.getElementById("cartDelivery").textContent = `A$ ${deliveryTotal.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `A$ ${grandTotal.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  if (cart.length === 0) {
    document.getElementById("cart")?.classList.add("hidden");
  }
}


/* ================================
   (5) CHECKOUT  ✅ 
   ================================ */
async function checkout() {
  if (!cart || cart.length === 0) {
    alert("Your cart is currently empty.");
    return;
  }

  const items = cart.map((item) => {
    const descriptionParts = [];

    if (item.chocolate) descriptionParts.push(`Chocolate: ${item.chocolate}`);
    if (item.toppings?.length) descriptionParts.push(`Toppings: ${item.toppings.join(", ")}`);
    if (item.regionLabel) {
      descriptionParts.push(
        `Delivery: ${item.regionLabel} (A$ ${Number(item.deliveryFee || 0).toFixed(2)})`
      );
    }
    if (item.deliveryDate) descriptionParts.push(`Date: ${item.deliveryDate}`);
    if (item.notes) descriptionParts.push(`Notes: ${item.notes}`);
    if (item.postcode) descriptionParts.push(`Postcode: ${item.postcode}`);
    if (item.referencePoint) descriptionParts.push(`Reference: ${item.referencePoint}`);
    if (item.contactPhone) descriptionParts.push(`Phone: ${item.contactPhone}`);

    return {
      name: sizeLabels[item.size] || item.size,
      description: descriptionParts.join(" | "),
      unit_amount: Math.round(Number(item.pricePer || 0) * 100), // cents
      quantity: Number(item.quantity || 1),
    };
  });

  try {
    const host = window.location.hostname;

    const isLocal = host === "localhost" || host === "127.0.0.1";
    const isRender = host.endsWith(".onrender.com");

    // Local: backend local
    // Render: mesma origem -> URL relativa (evita CORS)
    // Netlify/Outros: chama backend do Render
    const API_BASE = isLocal
      ? "http://localhost:10000"
      : isRender
        ? ""
        : "https://luxyberry1.onrender.com";

    const response = await fetch(`${API_BASE}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Checkout failed:", response.status, errText);
      alert("Unable to start payment. Please try again.");
      return;
    }

    const data = await response.json();

    if (!data?.url) {
      console.error("Payment URL missing in response:", data);
      alert("Payment link was not received.");
      return;
    }

    window.location.assign(data.url);
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
   (8) WHATSAPP LINK
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLink = document.getElementById("whatsapp-link");
  if (!whatsappLink) return;

  const phone = "61400289803"; // E.164, somente números
  const message = "Hello LuxyBerry, I would like to place an order";

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

  whatsappLink.href = url;
});

/* ================================
   (9) CART DRAWER CONTROLS
   ================================ */
function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;

  drawer.classList.add("open");
  overlay.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;

  drawer.classList.remove("open");
  overlay.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}


/* ================================
   (10) MOBILE MENU
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
   (11) SWIPER CAROUSEL — PRODUCTS (COVERFLOW PREMIUM)
   ================================ */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".product-carousel");
  if (!carousel || typeof Swiper === "undefined") return;

  new Swiper(carousel, {
    // UX
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 18,

    // Performance: reduz trabalho de layout e eventos
    watchSlidesProgress: true,
    watchOverflow: true,
    updateOnWindowResize: true,

    // Mantém suavidade em touch
    touchStartPreventDefault: false,
    resistanceRatio: 0.85,

    // Importante para coverflow mais leve
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: -18,
      depth: 220,
      modifier: 1.8,
      slideShadows: false
    },

    // Autoplay mais "leve" e sem travar
    autoplay: {
      delay: 3200,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    // Paginação
    pagination: {
      el: ".product-carousel .swiper-pagination",
      clickable: true
    },

    // Breakpoints (mantendo premium, mas reduzindo custo no mobile)
    breakpoints: {
      0: {
        spaceBetween: 12,
        coverflowEffect: { rotate: 0, stretch: -10, depth: 140, modifier: 1.5, slideShadows: false }
      },
      640: {
        spaceBetween: 16,
        coverflowEffect: { rotate: 0, stretch: -14, depth: 180, modifier: 1.65, slideShadows: false }
      },
      980: {
        spaceBetween: 18,
        coverflowEffect: { rotate: 0, stretch: -18, depth: 220, modifier: 1.8, slideShadows: false }
      }
    },

    // Melhorias práticas
    preloadImages: false,       // deixa o browser lidar (junto com loading="lazy")
    lazy: false,                // você já está usando loading="lazy" no HTML
  });
  /* =========================================
   (12) LIGHTBOX (Modal gallery) — mantém layout do carrossel
   ========================================= */

  let lbSwiper = null;

  function openLightbox(startIndex = 0) {
    const lb = document.getElementById("lightbox");
    const lbWrapper = document.getElementById("lbWrapper");
    if (!lb || !lbWrapper) return;

    // Pega as imagens do carrossel principal
    const slides = document.querySelectorAll(".product-carousel .swiper-slide img");
    if (!slides.length) return;

    // Monta slides do modal
    lbWrapper.innerHTML = "";
    slides.forEach((img) => {
      const s = document.createElement("div");
      s.className = "swiper-slide";

      const clone = document.createElement("img");
      clone.src = img.getAttribute("src");
      clone.alt = img.getAttribute("alt") || "Product";
      clone.loading = "eager";

      s.appendChild(clone);
      lbWrapper.appendChild(s);
    });

    // Abre modal
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";

    // Recria swiper do modal
    if (lbSwiper) {
      try { lbSwiper.destroy(true, true); } catch (_) { }
      lbSwiper = null;
    }

    lbSwiper = new Swiper(".lb-swiper", {
      initialSlide: startIndex,
      loop: false,
      slidesPerView: 1,
      spaceBetween: 16,
      grabCursor: true,
      keyboard: { enabled: true },
      pagination: { el: ".lb-pagination", clickable: true },
      navigation: { nextEl: ".lb-next", prevEl: ".lb-prev" }
    });
  }

  function closeLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;

    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";

    if (lbSwiper) {
      try { lbSwiper.destroy(true, true); } catch (_) { }
      lbSwiper = null;
    }
  }

  // Clique em imagem do carrossel abre lightbox
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".product-carousel .swiper-slide img");
    if (!img) return;

    const all = [...document.querySelectorAll(".product-carousel .swiper-slide img")];
    const idx = all.indexOf(img);
    openLightbox(Math.max(0, idx));
  });

  // Fechar modal: backdrop ou botão X
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-lb-close]")) closeLightbox();
  });

  // ESC fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

});