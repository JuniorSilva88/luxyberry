// ================= PRICING MODEL =================
// English comments (Português: Modelo de preços em AUD)
const basePrices = { small: 35, medium: 59, large: 95, xl: 145, party: 260 };
const chocAdj = { milk: 0, dark: 5, white: 7, assortment: 10 };
const regionFee = { logan: 0, brisbane: 10, gc: 15, other: 20 };

const cart = [];

// ================= PRICE CALCULATION =================
function computePrice() {
  const size = document.getElementById('size').value;
  const choc = document.getElementById('choc').value;
  const tops = document.getElementById('toppings').value
    .split(',').map(s => s.trim()).filter(Boolean);
  const qty = Math.max(1, parseInt(document.getElementById('qty').value || '1', 10));
  const region = document.getElementById('region').value;

  // A$3 per topping, up to 3 (Português: R$3 por topping, máximo 3)
  const toppingAdj = Math.min(tops.length, 3) * 3;
  const pricePer = (basePrices[size] || 0) + (chocAdj[choc] || 0) + toppingAdj;
  const delivery = regionFee[region] || 0;
  const total = pricePer * qty + delivery;

  document.getElementById('price').textContent = `Estimate: A$ ${total.toFixed(2)}`;
  return { pricePer, delivery, total, tops, size, choc, qty, region };
}

// Update estimate live (Português: Atualiza estimativa em tempo real)
['size','choc','toppings','qty','region'].forEach(id => {
  document.getElementById(id).addEventListener('input', computePrice);
});
computePrice();

// ================= CART FUNCTIONS =================
function addToCart() {
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;
  const est = computePrice();

  if (!date) {
    alert('Please select a delivery date (minimum 1 week).');
    return;
  }

  const item = {
    size: est.size, choc: est.choc, tops: est.tops, qty: est.qty, date, notes,
    deliveryRegion: est.region, deliveryFee: est.delivery, pricePer: est.pricePer, total: est.total
  };
  cart.push(item);
  renderCart();
  openCart();
}

function openCart() {
  document.getElementById('cart').style.display = 'block';
  renderCart();
}
function clearCart() {
  cart.length = 0;
  renderCart();
}
function renderCart() {
  const el = document.getElementById('cartItems');
  el.innerHTML = '';
  let sum = 0;
  cart.forEach((item, i) => {
    sum += item.total;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div><strong>Box ${item.size.toUpperCase()}</strong> x${item.qty} — A$ ${(item.total).toFixed(2)}</div>
      <div class="muted">Chocolate: ${item.choc}, Toppings: ${item.tops.join(', ') || '—'}</div>
      <div class="muted">Delivery: ${item.deliveryRegion} (A$ ${item.deliveryFee.toFixed(2)}) | Date: ${item.date}</div>
      <div class="muted">Notes: ${item.notes || '—'}</div>
      <div class="flex" style="margin-top:6px;">
        <button class="btn alt" onclick="removeItem(${i})">Remove</button>
      </div>
    `;
    el.appendChild(div);
  });
  document.getElementById('cartTotal').textContent = `Total: A$ ${sum.toFixed(2)}`;
  document.getElementById('payAmt').textContent = sum.toFixed(2);
}
function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}
function checkout() {
  if (!cart.length) { alert('Your cart is empty.'); return; }
  document.getElementById('checkoutBox').style.display = 'block';
}
function processPayment() {
  const sum = cart.reduce((a,c) => a + c.total, 0);
  const name = document.getElementById('ccName').value.trim();
  const num = document.getElementById('ccNum').value.trim();
  const exp = document.getElementById('ccExp').value.trim();
  const cvc = document.getElementById('ccCvc').value.trim();
  if (!name || !num || !exp || !cvc) {
    document.getElementById('payStatus').textContent = 'Fill in card details.';
    return;
  }
  // Simulate success (Português: Simulação de pagamento aprovado)
  document.getElementById('payStatus').textContent = 'Payment approved! 🎉';
  window.trackingCode = 'LX' + Math.floor(100000 + Math.random()*899999);
  setTimeout(() => {
    alert(`Order confirmed! Tracking code: ${window.trackingCode}`);
    simulateRoute(true);
  }, 500);
}

// ================= CONTACT FORM =================
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  document.getElementById('cStatus').textContent = 'Message sent. We will contact you!';
  console.log({ name, email, msg });
}

// ================= DELIVERY TRACKING SIMULATION =================
let routeTimer;
function simulateRoute(auto=false) {
  const map = document.getElementById('map');
  const eta = document.getElementById('eta');
  clearInterval(routeTimer);
  const steps = [
    'Kitchen — preparation started',
    'Packaging complete',
    'Out for delivery (Logan City)',
    'On the way — Springwood',
    'On the way — Shailer Park',
    'Arriving at destination',
    'Delivered'
  ];
  let i = 0;
  map.textContent = `Status: ${steps[i]}`;
  eta.textContent = 'ETA: 45–60 min';
  routeTimer = setInterval(() => {
    i++;
    map.textContent = i < steps.length ? `Status: ${steps[i]}` : `Status: Delivered — code ${window.trackingCode || '—'}`;
    if (i >= steps.length) { clearInterval(routeTimer); eta.textContent = 'ETA: delivered'; }
  }, auto ? 1800 : 900);
}
