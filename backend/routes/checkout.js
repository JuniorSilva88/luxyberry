
const express = require("express");
const router = express.Router();
const stripe = require("../services/stripe");

router.post("/", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !cart.length) {
      return res.status(400).json({ error: "Cart empty" });
    }

    const line_items = cart.map(item => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: `LuxyBerry ${item.size.toUpperCase()} Box`,
          description: item.chocolate + " chocolate"
        },
        unit_amount: Math.round(item.total * 100)
      },
      quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:3000/#success",
      cancel_url: "http://localhost:3000/#build"
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error" });
  }
});

module.exports = router;
