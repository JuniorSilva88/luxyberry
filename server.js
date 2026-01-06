const express = require('express');
const stripe = require('stripe')('sk_test_...'); // Substitua pela sua secret key do Stripe
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve os arquivos estáticos (HTML, CSS, JS)

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency = 'aud', items } = req.body;

    // Exemplo de itens baseados no carrinho
    const lineItems = items ? items.map(item => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe usa centavos
      },
      quantity: item.quantity,
    })) : [{
      price_data: {
        currency,
        product_data: {
          name: 'Caixa Luxyberry',
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'afterpay_clearpay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8000/success.html',
      cancel_url: 'http://localhost:8000/index.html',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8000, () => {
  console.log('Servidor rodando em http://localhost:8000');
});