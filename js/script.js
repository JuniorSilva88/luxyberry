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
['size', 'choc', 'toppings', 'qty', 'region'].forEach(id => {
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
  const sum = cart.reduce((a, c) => a + c.total, 0);
  const name = document.getElementById('ccName').value.trim();
  const num = document.getElementById('ccNum').value.trim();
  const exp = document.getElementById('ccExp').value.trim();
  const cvc = document.getElementById('ccCvc').value.trim();
  if (!name || !num || !exp || !cvc) {
    document.getElementById('payStatus').textContent = 'Preencha os dados do cartão.';
    return;
  }

  // Integração com Stripe via backend Node.js
  const stripe = Stripe('pk_test_...'); // Substitua pela sua publishable key do Stripe

  // Preparar itens do carrinho
  const items = cart.map(item => ({
    name: `Caixa ${item.size.toUpperCase()}`,
    price: item.total,
    quantity: 1,
  }));

  fetch('/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: sum, currency: 'aud', items }),
  })
    .then(response => response.json())
    .then(session => {
      if (session.error) {
        document.getElementById('payStatus').textContent = 'Erro: ' + session.error;
      } else {
        stripe.redirectToCheckout({ sessionId: session.id });
      }
    })
    .catch(error => {
      document.getElementById('payStatus').textContent = 'Erro ao processar pagamento.';
      console.error(error);
    });
}
  window.trackingCode = 'LX' + Math.floor(100000 + Math.random() * 899999);
  setTimeout(() => {
    alert(`Pedido confirmado! Código de rastreio: ${window.trackingCode}`);
    simulateRoute(true);
  }, 500);
}

// Contact form
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  document.getElementById('cStatus').textContent = 'Mensagem enviada. Entraremos em contato!';
  console.log({ name, email, msg });
}

// Route simulation
let routeTimer;
function simulateRoute(auto = false) {
  const map = document.getElementById('map');
  const eta = document.getElementById('eta');
  clearInterval(routeTimer);
  const steps = [
    'Kitchen — preparo iniciado',
    'Embalagem completa',
    'Saiu para entrega (Logan City)',
    'A caminho — Springwood',
    'A caminho — Shailer Park',
    'Chegando ao destino',
    'Entregue'
  ];
  let i = 0;
  map.textContent = `Status: ${steps[i]}`;
  eta.textContent = 'ETA: 45–60 min';
  routeTimer = setInterval(() => {
    i++;
    map.textContent = i < steps.length ? `Status: ${steps[i]}` : `Status: Entregue — código ${window.trackingCode || '—'}`;
    if (i >= steps.length) { clearInterval(routeTimer); eta.textContent = 'ETA: entregue'; }
  }, auto ? 1800 : 900);
}

// Load Instagram feed
function loadInstagramFeed() {
  // Substitua 'SEU_ACCESS_TOKEN' pelo seu access token do Instagram Basic Display API
  // Para obter: 1. Crie um app no Facebook Developers (https://developers.facebook.com/)
  // 2. Configure Instagram Basic Display
  // 3. Obtenha o access token via OAuth
  const accessToken = 'SEU_ACCESS_TOKEN'; // IMPORTANTE: Substitua isso

  if (accessToken === 'SEU_ACCESS_TOKEN') {
    console.log('Configure o access token do Instagram para carregar o feed dinamicamente.');
    return; // Não carregar se não configurado
  }

  fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
      const igFeed = document.getElementById('igFeed');
      igFeed.innerHTML = '';
      data.data.slice(0, 4).forEach(post => {
        if (post.media_type === 'IMAGE') {
          const img = document.createElement('img');
          img.src = post.media_url;
          img.alt = 'Instagram post';
          igFeed.appendChild(img);
        }
      });
    })
    .catch(error => console.error('Erro ao carregar feed do Instagram:', error));
}

// Chamar a função ao carregar a página
loadInstagramFeed();