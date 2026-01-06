// Pricing model (example values in AUD)
const basePrices = { small: 35, medium: 59, large: 95, xl: 145, party: 260 };
const chocAdj = { milk: 0, dark: 5, white: 7, assortment: 10 };
const regionFee = { logan: 0, brisbane: 10, gc: 15, other: 20 };

const cart = [];

function computePrice() {
  const size = document.getElementById('size').value;
  const choc = document.getElementById('choc').value;
  const tops = document.getElementById('toppings').value
    .split(',').map(s => s.trim()).filter(Boolean);
  const qty = Math.max(1, parseInt(document.getElementById('qty').value || '1', 10));
  const region = document.getElementById('region').value;

  const toppingAdj = Math.max(0, (tops.length > 3 ? 3 : tops.length)) * 3; // A$3 cada, até 3
  const pricePer = (basePrices[size] || 0) + (chocAdj[choc] || 0) + toppingAdj;
  const delivery = regionFee[region] || 0;
  const total = pricePer * qty + delivery;

  document.getElementById('price').textContent = `Estimativa: A$ ${total.toFixed(2)}`;
  return { pricePer, delivery, total, tops, size, choc, qty, region };
}

// Update estimate live
['size','choc','toppings','qty','region'].forEach(id => {
  document.getElementById(id).addEventListener('input', computePrice);
});
computePrice();

function addToCart() {
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;
  const est = computePrice();

  if (!date) {
    alert('Por favor, selecione a data de entrega (mínimo 1 semana).');
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
      <div><strong>Caixa ${item.size.toUpperCase()}</strong> x${item.qty} — A$ ${(item.total).toFixed(2)}</div>
      <div class="muted">Chocolate: ${item.choc}, Toppings: ${item.tops.join(', ') || '—'}</div>
      <div class="muted">Entrega: ${item.deliveryRegion} (A$ ${item.deliveryFee.toFixed(2)}) | Data: ${item.date}</div>
      <div class="muted">Notas: ${item.notes || '—'}</div>
      <div class="flex" style="margin-top:6px;">
        <button class="btn alt" onclick="removeItem(${i})">Remover</button>
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
  if (!cart.length) { alert('Seu carrinho está vazio.'); return; }
  document.getElementById('checkoutBox').style.display = 'block';
}
function processPayment() {
  const sum = cart.reduce((a,c) => a + c.total, 0);
  const name = document.getElementById('ccName').value.trim();
  const num = document.getElementById('ccNum').value.trim();
  const exp = document.getElementById('ccExp').value.trim();
  const cvc = document.getElementById('ccCvc').value.trim();
  if (!name || !num || !exp || !cvc) {
    document.getElementById('payStatus').textContent = 'Preencha os dados do cartão.';
    return;
  }
  // Simulate success
  document.getElementById('payStatus').textContent = 'Pagamento aprovado! 🎉';
  // Generate tracking code
  window.trackingCode = 'LX' + Math.floor(100000 + Math